import { validationResult } from "express-validator";
import Gig from "../models/Gig.js";
import Bid from "../models/Bid.js";

// @desc    Fetch all open gigs (with search query)
// @route   GET /api/gigs
// @access  Public
export const getAllGigs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      minBudget,
      maxBudget,
    } = req.query;

    const query = { status: "open" };

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Budget range filter
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [gigs, total] = await Promise.all([
      Gig.find(query)
        .populate("ownerId", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Gig.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        gigs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    console.error("Get gigs error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching gigs",
    });
  }
};

// @desc    Create a new job post
// @route   POST /api/gigs
// @access  Private
export const createGig = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, budget } = req.body;
    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Gig created successfully",
      data: { gig },
    });
  } catch (error) {
    console.error("Create gig error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating gig",
    });
  }
};

// @desc    Get single gig with bids
// @route   GET /api/gigs/:id
// @access  Public
export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("ownerId", "name email")
      .populate({
        path: "bids",
        populate: { path: "freelancerId", select: "name" },
      });

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    res.json({
      success: true,
      data: { gig },
    });
  } catch (error) {
    console.error("Get gig error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching gig",
    });
  }
};

// @desc    Get gigs posted by current user (My Posted Gigs - Client view)
// @route   GET /api/gigs/my-posts
// @access  Private
export const getMyPostedGigs = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { ownerId: req.user.id };

    if (status) {
      query.status = status;
    }

    const gigs = await Gig.find(query)
      .populate({
        path: "bids",
        populate: { path: "freelancerId", select: "name" },
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { gigs },
    });
  } catch (error) {
    console.error("Get my posted gigs error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching your gigs",
    });
  }
};

// @desc    Update a gig
// @route   PUT /api/gigs/:id
// @access  Private (Owner only)
export const updateGig = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    let gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Check ownership
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this gig",
      });
    }

    // Can't update if already assigned
    if (gig.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Cannot update gig that is already assigned",
      });
    }

    const { title, description, budget } = req.body;

    gig = await Gig.findByIdAndUpdate(
      req.params.id,
      { title, description, budget },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Gig updated successfully",
      data: { gig },
    });
  } catch (error) {
    console.error("Update gig error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating gig",
    });
  }
};

// @desc    Delete/Cancel a gig
// @route   DELETE /api/gigs/:id
// @access  Private (Owner only)
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found",
      });
    }

    // Check ownership
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this gig",
      });
    }

    // Can't delete if assigned
    if (gig.status === "assigned") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete gig that is already assigned",
      });
    }

    // Delete all associated bids
    await Bid.deleteMany({ gigId: req.params.id });

    await gig.deleteOne();

    res.json({
      success: true,
      message: "Gig deleted successfully",
    });
  } catch (error) {
    console.error("Delete gig error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting gig",
    });
  }
};
