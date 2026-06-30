import crypto from "crypto";
import Newsletter from "../models/newsletter.model.js";
import User from "../models/user.model.js";
import env from "../config/env.js";
import { sendEmail } from "../services/email.service.js";
import newsletterSubscribeTemplate from "../templates/newsletterSubscribeTemplate.js";
import mongoose from "mongoose";

export const subscribeNewsletter = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { email } = req.body;

    const existingSubscriber = await Newsletter.findOne({ email }).session(
      session,
    );

    if (existingSubscriber) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: existingSubscriber.isVerified
          ? "You are already subscribed."
          : "Please verify your email to complete your subscription.",
      });
    }

    const user = await User.findOne({ email })
      .select("_id isEmailVerified")
      .session(session);

    const isVerified = user?.isEmailVerified ?? false;

    const verificationToken = isVerified
      ? null
      : crypto.randomBytes(32).toString("hex");

    await Newsletter.create(
      [
        {
          email,
          isUser: !!user,
          isVerified,
          verificationToken,
        },
      ],
      { session },
    );

    if (!isVerified) {
      const verificationUrl = `${env.CLIENT_URL}/newsletter/verify/${verificationToken}`;

      await sendEmail({
        to: email,
        subject: "🍪 Confirm Your Midnight Cookies Subscription",
        html: newsletterSubscribeTemplate(verificationUrl),
      });
    }

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: isVerified
        ? "You've successfully subscribed to Midnight Cookies notifications!"
        : "Subscription successful! Please check your email to confirm your subscription.",
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
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
