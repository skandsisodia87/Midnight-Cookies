import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Cookie from "../models/cookie.model.js";
import Review from "../models/review.model.js";
import CookieVariant from "../models/cookieVariant.model.js";
import { generateOrderId } from "../utils/generateOrderId.js";
import { orderStatusEmailTemplate } from "../templates/orderEmailTemplate.js";
import { sendEmail } from "../services/email.service.js";
import env from "../config/env.js";

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      if (item.quantity <= 0) {
        throw new Error("Invalid quantity");
      }

      const cookie = await Cookie.findById(item.cookieId)
        .select("name images")
        .session(session);

      if (!cookie) {
        throw new Error("Cookie not found");
      }

      const updatedVariant = await CookieVariant.findOneAndUpdate(
        {
          _id: item.variantId,
          cookieId: item.cookieId,
          isAvailable: true,
          stock: {
            $gte: item.quantity,
          },
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!updatedVariant) {
        throw new Error(`${cookie.name} is unavailable or out of stock`);
      }

      const finalPrice = updatedVariant.discountPrice || updatedVariant.price;
      totalAmount += finalPrice * item.quantity;

      orderItems.push({
        cookieId: cookie._id,
        variantId: updatedVariant._id,
        sku: updatedVariant.sku,
        name: cookie.name,
        image: cookie.images?.[0] || null,
        quantity: item.quantity,
        weight: updatedVariant.weight,
        originalPrice: updatedVariant.price,
        discountPrice: updatedVariant.discountPrice,
        finalPrice: finalPrice * item.quantity,
      });
    }

    const generatedOrderId = generateOrderId();

    const createdOrders = await Order.create(
      [
        {
          userId: req.user._id,
          orderId: generatedOrderId,
          items: orderItems,
          totalAmount,
          shippingAddress,
          paymentMethod,
          notes,
        },
      ],
      {
        session,
      },
    );

    const order = createdOrders[0];

    await session.commitTransaction();

    session.endSession();

    try {
      await sendEmail({
        to: req.user.email,
        subject: "Order Placed",
        html: orderStatusEmailTemplate({
          customerName: req.user.name,
          orderId: order.orderId,
          orderStatus: order.orderStatus,
          items: order.items,
          totalAmount: order.totalAmount,
          viewOrderUrl: `${env.CLIENT_URL}/orders/${order.orderId}`,
        }),
      });
    } catch (emailError) {
      console.log("Email sending failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      { userId: req.user._id },
      "-_id -userId",
    ).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findOne({
      orderId,
      userId, // Ensure user owns the order
    }).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const cookieIds = [
      ...new Set(order.items.map((item) => item.cookieId.toString())),
    ];

    const itemReviews = await Review.find({
      userId,
      cookieId: { $in: cookieIds },
    })
      .select("cookieId rating review")
      .lean();

    return res.status(200).json({
      success: true,
      order,
      itemReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
