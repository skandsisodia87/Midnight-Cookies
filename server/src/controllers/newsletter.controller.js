import crypto from "crypto";
import Newsletter from "../models/newsletter.model.js";
import User from "../models/user.model.js";
import env from "../config/env.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: existingSubscriber.isVerified
          ? "You are already subscribed."
          : "Please verify your email to complete the subscription.",
      });
    }

    const user = await User.findOne({ email }).select("_id");

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await Newsletter.create({
      email,
      isUser: !!user,
      verificationToken,
    });

    const verificationUrl = `${env.CLIENT_URL}/newsletter/verify/${verificationToken}`;
    console.log(verificationUrl);

    // TODO: Send verification email

    return res.status(201).json({
      success: true,
      message:
        "Subscription successful. Please check your email to verify your subscription.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyNewsletter = async (req, res) => {
  try {
    const { token } = req.params;

    const subscriber = await Newsletter.findOne({
      verificationToken: token,
    });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification link.",
      });
    }

    subscriber.isVerified = true;
    subscriber.verificationToken = null;

    await subscriber.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
