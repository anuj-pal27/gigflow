import express from "express";
import { protect } from "../middleware/auth.js";
import { placeBidValidation } from "../validators/bidValidator.js";
import {
  placeBid,
  getGigBids,
  hireBid,
  getMyBids,
} from "../controllers/bidController.js";

const router = express.Router();

// GET /api/bids/my-bids - Get all bids placed by current user (Freelancer view)
router.get("/my-bids", protect, getMyBids);

// POST /api/bids - Submit a bid for a gig
router.post("/", protect, placeBidValidation, placeBid);

// GET /api/bids/:gigId - Get all bids for a specific gig (Owner only)
router.get("/:gigId", protect, getGigBids);

// PATCH /api/bids/:bidId/hire - Hire a freelancer (Atomic update)
router.patch("/:bidId/hire", protect, hireBid);

export default router;
