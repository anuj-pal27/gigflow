import { body } from "express-validator";

export const placeBidValidation = [
  body("gigId")
    .notEmpty()
    .withMessage("Gig ID is required")
    .isMongoId()
    .withMessage("Invalid Gig ID"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 1)
    .withMessage("Price must be at least 1"),
];

export const updateBidValidation = [
  body("message")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 1)
    .withMessage("Price must be at least 1"),
];
