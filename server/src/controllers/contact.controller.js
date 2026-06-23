import env from "../config/env.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import contactEmailTemplate from "../templates/contactEmailTemplate.js";

export const contactUs = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    const admin = await User.findOne({ role: "admin" }).lean();

    await sendEmail({
      to: admin?.email || env.SUPPORT_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: contactEmailTemplate({ fullName, email, subject, message }),
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
