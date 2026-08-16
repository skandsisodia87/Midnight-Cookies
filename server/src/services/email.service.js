import nodemailer from "nodemailer";
import env from "../config/env.js";
import constants from "../constants/constants.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${constants.APPICATION_NAME} 🍪" <${env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Email error:", error.message);
    throw error;
  }
};
