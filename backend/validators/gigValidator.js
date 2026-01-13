import { body } from "express-validator";

export const createGigValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),
  body("budget")
    .notEmpty()
    .withMessage("Budget is required")
    .isNumeric()
    .withMessage("Budget must be a number")
    .custom((value) => value >= 1)
    .withMessage("Budget must be at least 1"),
];

export const updateGigValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),
  body("budget")
    .optional()
    .isNumeric()
    .withMessage("Budget must be a number")
    .custom((value) => value >= 1)
    .withMessage("Budget must be at least 1"),
];

