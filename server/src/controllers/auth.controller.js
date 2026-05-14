import env from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import { welcomeEmailTemplate } from "../templates/emailTemplates.js";
import generateOtp from "../utils/generateOtp.js";
import verifyEmailTemplate from "../templates/verifyEmailTemplate.js";

export const registerUser = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
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

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -accessToken",
    );

    const cookieOptions = {
      httpOnly: true,
      secure: false, // true on production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "Login successful",
        user: loggedInUser,
        accessToken,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          accessToken: 1,
          refreshToken: 1,
        },
      },
      {
        new: true,
      },
    );

    return res.clearCookie("refreshToken").status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
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
        message: "Invalid refresh token",
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
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid refresh token",
    });
  }
};

export const sendVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
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
      subject: "Verify Your Email 🍪",
      html: verifyEmailTemplate({
        name: user.name,
        otp,
      }),
    });

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
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
      subject: "Welcome to Midnight Cookies 🍪",
      html: welcomeEmailTemplate(user.name),
    });

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
