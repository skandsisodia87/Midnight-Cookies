import express from "express";
import {
  refreshAccessToken,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  sendVerificationOtp,
  verifyEmailOtp,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailOtpSchema,
} from "../validations/auth.validation.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

router.post(
  "/send-verification-otp",
  validate(emailSchema),
  sendVerificationOtp,
);

router.post(
  "/verify-email-otp",
  validate(verifyEmailOtpSchema),
  verifyEmailOtp,
);

router.post("/logout", verifyJWT, logoutUser);

router.get("/me", verifyJWT, getCurrentUser);

router.post("/refresh-token", refreshAccessToken);

router.post("/forgot-password", validate(emailSchema), forgotPassword);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword,
);

export default router;
