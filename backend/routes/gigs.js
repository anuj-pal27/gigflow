import express from "express";
import { protect } from "../middleware/auth.js";
import { createGigValidation, updateGigValidation } from "../validators/gigValidator.js";
import {
  createGig,
  getAllGigs,
  getGig,
  getMyPostedGigs,
  updateGig,
  deleteGig,
} from "../controllers/gigController.js";

const router = express.Router();

// GET /api/gigs - Fetch all open gigs (with search query)
router.get("/", getAllGigs);

// GET /api/gigs/my-posts - Get user's posted gigs (Client view)
router.get("/my-posts", protect, getMyPostedGigs);

// GET /api/gigs/:id - Get single gig details
router.get("/:id", getGig);

// POST /api/gigs - Create a new job post
router.post("/", protect, createGigValidation, createGig);

// PUT /api/gigs/:id - Update own gig
router.put("/:id", protect, updateGigValidation, updateGig);

// DELETE /api/gigs/:id - Delete own gig
router.delete("/:id", protect, deleteGig);

export default router;
