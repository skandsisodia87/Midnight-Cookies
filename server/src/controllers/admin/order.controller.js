import env from "../../config/env.js";
import constants from "../../constants/constants.js";
import Order from "../../models/order.model.js";
import { sendEmail } from "../../services/email.service.js";
import { orderStatusEmailTemplate } from "../../templates/orderEmailTemplate.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getOrders = asyncHandler(async (req, res) => {
  const { status, startDate } = req.body;

  const query = {};

  if (status) {
    query.orderStatus = status;
  }

  if (startDate) {
    const fromDate = new Date(startDate);
    fromDate.setHours(0, 0, 0, 0);

    query.createdAt = {
      $gte: fromDate,
    };
  }

  const [newOrders, orders, stats] = await Promise.all([
    Order.countDocuments({
      createdAt: { $gt: new Date().setHours(0, 0, 0, 0) },
    }),
    Order.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
              },
            },
          ],
          as: "customer",
        },
      },
      {
        $project: {
          orderId: 1,
          customer: {
            $first: "$customer.name",
          },
          items: {
            $size: "$items",
          },
          totalAmount: 1,
          createdAt: 1,
          orderStatus: 1,
        },
      },
    ]),

    Order.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: null,

          totalOrders: {
            $sum: 1,
          },

          pending: {
            $sum: {
              $cond: [
                {
                  $in: [
                    "$orderStatus",
                    [constants.PLACED, constants.CONFIRMED, constants.BAKING],
                  ],
                },
                1,
                0,
              ],
            },
          },

          delivered: {
            $sum: {
              $cond: [{ $eq: ["$orderStatus", constants.DELIVERED] }, 1, 0],
            },
          },

          shipped: {
            $sum: {
              $cond: [{ $eq: ["$orderStatus", constants.SHIPPED] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]),
  ]);

  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    newOrders,
    orders,
    stats: stats[0] || {
      totalOrders: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
    },
  });
});

export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).populate({
    path: "userId",
    select: {
      name: 1,
    },
  });

  if (!order) {
    return res.status(404).json({ success: false, message: "No order found" });
  }

  return res
    .status(200)
    .json({ success: true, message: "Order fetched successfully", order });
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        orderStatus: constants.CANCELLED,
      },
    },
    {
      new: true,
    },
  );

  if (!order) {
    return res.status(404).json({
      success: false,
      message: constants.ORDER_NOT_FOUND,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    order,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.query;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: constants.ORDER_NOT_FOUND,
    });
  }

  if (
    order.orderStatus === constants.DELIVERED ||
    order.orderStatus === constants.CANCELLED
  ) {
    return res.status(400).json({
      success: false,
      message: "Finalized orders cannot be updated",
    });
  }

  order.orderStatus = orderStatus;
  order.orderStatus === constants.DELIVERED &&
    (order.paymentStatus = constants.PAID);

  await order.save();

  const customer = await User.findById(order.userId);

  if (customer) {
    if (
      order.orderStatus === constants.DELIVERED ||
      order.orderStatus === constants.CANCELLED ||
      order.orderStatus === constants.CONFIRMED
    ) {
      try {
        const subjectMap = {
          // placed: "Order Placed 🍪",
          [constants.CONFIRMED]: "Order Confirmed ✅",
          [constants.DELIVERED]: "Order Delivered ❤️",
          [constants.CANCELLED]: "Order Cancelled ❌",
        };
        await sendEmail({
          to: customer.email,
          subject: subjectMap[orderStatus],
          html: orderStatusEmailTemplate({
            customerName: customer.name,
            orderId: order.orderId,
            orderStatus: order.orderStatus,
            items: order.items,
            totalAmount: order.totalAmount,
            viewOrderUrl: `${env.CLIENT_URL}/orders/${order.orderId}`,
          }),
        });
      } catch (emailError) {
        console.log(`${constants.EMAIL_SENDING_FAILED}:`, emailError.message);
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});
