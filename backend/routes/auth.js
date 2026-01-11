import express from "express";
import { protect } from "../middleware/auth.js";
import {
  registerValidation,
  loginValidation,
  updatePasswordValidation,
} from "../validators/authValidator.js";
import {
  register,
  login,
  logout,
  getMe,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

// Routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/password", protect, updatePasswordValidation, updatePassword);

export default router;
