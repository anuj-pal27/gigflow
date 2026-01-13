import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { getIO } from "../socket.js";

// @desc    Submit a bid for a gig (User acts as Freelancer)
// @route   POST /api/bids
// @access  Private
export const placeBid = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { gigId, message, price } = req.body;

    // Find the gig
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Check if gig is open
    if (gig.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This gig is no longer accepting bids",
      });
    }

    // Can't bid on own gig
    if (gig.ownerId.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot bid on your own gig",
      });
    }

    // Check if user already bid on this gig
    const existingBid = await Bid.findOne({
      gigId: gigId,
      freelancerId: req.user.id,
    });

    if (existingBid) {
      return res.status(400).json({
        success: false,
        message: "You have already placed a bid on this gig",
      });
    }

    // Create the bid
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price,
    });

    // Populate freelancer info
    await bid.populate("freelancerId", "name");

    res.status(201).json({
      success: true,
      message: "Bid placed successfully",
      data: { bid },
    });
  } catch (error) {
    console.error("Place bid error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while placing bid",
    });
  }
};

// @desc    Get all bids for a specific gig (Owner only)
// @route   GET /api/bids/:gigId
// @access  Private
export const getGigBids = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Only gig owner can see all bids
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view bids for this gig",
      });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { bids },
    });
  } catch (error) {
    console.error("Get gig bids error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching bids",
    });
  }
};

// @desc    Hire a freelancer (Atomic update)
// @route   PATCH /api/bids/:bidId/hire
// @access  Private (Gig owner only)
export const hireBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    const session = await mongoose.startSession();

    let hiredBid;
    let updatedGig;

    // Prefer a real transaction (requires replica set / Atlas)
    try {
      await session.withTransaction(async () => {
        const bid = await Bid.findById(bidId).session(session);
        if (!bid) {
          const err = new Error("Bid not found");
          err.statusCode = 404;
          throw err;
        }

        // 1) Atomically claim the gig by changing open -> assigned (owner only)
        updatedGig = await Gig.findOneAndUpdate(
          { _id: bid.gigId, ownerId: req.user.id, status: "open" },
          { $set: { status: "assigned" } },
          { new: true, session }
        );

        if (!updatedGig) {
          // Someone else already hired OR not owner
          const err = new Error("This gig is no longer open (already assigned)");
          err.statusCode = 409;
          throw err;
        }

        // 2) Mark the chosen bid as hired (must still be pending)
        hiredBid = await Bid.findOneAndUpdate(
          { _id: bid._id, status: "pending" },
          { $set: { status: "hired" } },
          { new: true, session }
        );

        if (!hiredBid) {
          const err = new Error("This bid is no longer pending");
          err.statusCode = 409;
          throw err;
        }

        // 3) Reject all other pending bids for the gig
        await Bid.updateMany(
          { gigId: bid.gigId, _id: { $ne: bid._id }, status: "pending" },
          { $set: { status: "rejected" } },
          { session }
        );
      });
    } catch (err) {
      // Fallback for environments without transactions (standalone mongod)
      const msg = String(err?.message || "");
      const isTxnNotSupported =
        msg.includes("Transaction numbers are only allowed") ||
        msg.includes("replica set member") ||
        msg.includes("mongos") ||
        msg.includes("withTransaction");

      if (!isTxnNotSupported) {
        const status = err.statusCode || 500;
        return res.status(status).json({
          success: false,
          message: err.message || "Server error while hiring",
        });
      }

      const bid = await Bid.findById(bidId);
      if (!bid) {
        return res.status(404).json({ success: false, message: "Bid not found" });
      }

      // 1) Claim gig (only one request can win)
      updatedGig = await Gig.findOneAndUpdate(
        { _id: bid.gigId, ownerId: req.user.id, status: "open" },
        { $set: { status: "assigned" } },
        { new: true }
      );

      if (!updatedGig) {
        return res.status(409).json({
          success: false,
          message: "This gig is no longer open (already assigned)",
        });
      }

      // 2) Hire bid if still pending
      hiredBid = await Bid.findOneAndUpdate(
        { _id: bid._id, status: "pending" },
        { $set: { status: "hired" } },
        { new: true }
      );

      if (!hiredBid) {
        // Best-effort rollback
        await Gig.findOneAndUpdate(
          { _id: updatedGig._id, status: "assigned" },
          { $set: { status: "open" } }
        );
        return res.status(409).json({
          success: false,
          message: "This bid is no longer pending",
        });
      }

      // 3) Reject others
      await Bid.updateMany(
        { gigId: bid.gigId, _id: { $ne: bid._id }, status: "pending" },
        { $set: { status: "rejected" } }
      );
    } finally {
      session.endSession();
    }

    await hiredBid.populate("freelancerId", "name email");

    // Emit realtime notification to the freelancer
    try {
      const io = getIO();
      io.to(`user:${hiredBid.freelancerId._id.toString()}`).emit("hired", {
        gigId: updatedGig._id.toString(),
        gigTitle: updatedGig.title,
        bidId: hiredBid._id.toString(),
      });
    } catch (e) {
      // If socket isn't initialized, ignore
    }

    return res.json({
      success: true,
      message: "Freelancer hired successfully",
      data: { bid: hiredBid, gig: updatedGig },
    });
  } catch (error) {
    console.error("Hire bid error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while hiring",
    });
  }
};

// @desc    Get bids placed by current user (My Bids - Freelancer view)
// @route   GET /api/bids/my-bids
// @access  Private
export const getMyBids = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { freelancerId: req.user.id };

    if (status) {
      query.status = status;
    }

    const bids = await Bid.find(query)
      .populate({
        path: "gigId",
        select: "title budget status ownerId",
        populate: { path: "ownerId", select: "name" },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { bids },
    });
  } catch (error) {
    console.error("Get my bids error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching your bids",
    });
  }
};
