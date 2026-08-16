import env from "../config/env.js";
import constants from "../constants/constants.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import contactEmailTemplate from "../templates/contactEmailTemplate.js";
import asyncHandler from "../utils/asyncHandler.js";

export const contactUs = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  const admin = await User.findOne({ role: constants.ADMIN }).lean();

  await sendEmail({
    to: admin?.email || env.SUPPORT_EMAIL,
    subject: `Contact Form: ${subject}`,
    html: contactEmailTemplate({ fullName, email, subject, message }),
  });

  return res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});
