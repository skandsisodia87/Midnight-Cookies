import env from "../config/env.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

export const isValidPaymentSignature = ({ orderId, paymentId, signature }) => {
  const expectedSignature = crypto
    .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature),
  );
};

export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(201).json({
      success: true,
      order,
      key: env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};
