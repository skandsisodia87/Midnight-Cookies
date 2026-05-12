import express from "express";
import {
  refreshAccessToken,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  sendVerificationOtp,
  verifyEmailOtp,
} from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/send-verification-otp", sendVerificationOtp);

router.post("/verify-email-otp", verifyEmailOtp);

router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

router.post("/refresh-token", refreshAccessToken);

export default router;
