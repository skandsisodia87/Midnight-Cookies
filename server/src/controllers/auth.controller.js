import env from "../config/env.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import { welcomeEmailTemplate } from "../templates/welcomeEmailTemplates.js";
import generateOtp from "../utils/generateOtp.js";
import verifyEmailTemplate from "../templates/verifyEmailTemplate.js";
import bcrypt from "bcrypt";
import { forgotPasswordTemplate } from "../templates/forgotPasswordTemplate.js";
import asyncHandler from "../utils/asyncHandler.js";
import constants from "../constants/constants.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: createdUser,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: constants.USER_NOT_FOUND,
    });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const accessToken = await user.generateAccessToken();

  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -accessToken",
  );

  const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === constants.PRODUCTION,
    // sameSite: "none",  // for same domain use sameSite: "strict"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Login successful",
      user: loggedInUser,
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token missing",
    });
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    env.REFRESH_TOKEN_SECRET,
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: constants.INVALID_REFRESH_TOKEN,
    });
  }

  if (user.refreshToken !== incomingRefreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh token expired or used",
    });
  }

  const accessToken = await user.generateAccessToken();

  user.accessToken = accessToken;
  await user.save();

  return res.status(200).json({
    success: true,
    accessToken,
  });
});

export const sendVerificationOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: constants.USER_NOT_FOUND,
    });
  }

  if (user.isEmailVerified) {
    return res.status(400).json({
      success: false,
      message: "Email already verified",
    });
  }

  const otp = generateOtp();

  user.emailVerificationCode = otp;
  user.emailVerificationExpires = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    to: user.email,
    subject: "Verify Your Email",
    html: verifyEmailTemplate({
      name: user.name,
      otp,
    }),
  });

  return res.status(200).json({
    success: true,
    message: "Verification OTP sent successfully",
  });
});

export const verifyEmailOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: constants.USER_NOT_FOUND });
  }

  if (user.emailVerificationCode !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  if (user.emailVerificationExpires < new Date()) {
    return res.status(400).json({ success: false, message: "Otp expired" });
  }

  user.isEmailVerified = true;
  user.emailVerificationCode = null;
  user.emailVerificationExpires = null;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    to: user.email,
    subject: "Welcome to Midnight Cookies",
    html: welcomeEmailTemplate(user.name, env.CLIENT_URL),
  });

  return res
    .status(200)
    .json({ success: true, message: "Email verified successfully" });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a reset link has been sent.",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: forgotPasswordTemplate(user.name, resetUrl),
  });

  return res.status(200).json({
    success: true,
    message: "Password reset link sent successfully",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});
