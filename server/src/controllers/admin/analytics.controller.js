import mongoose from "mongoose";
import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const currentYear = new Date().getFullYear();

  const [monthlyRevenue, orderStatus, topProducts, customerGrowth] =
    await Promise.all([
      Order.aggregate([
        {
          $match: {
            paymentStatus: "paid",
            createdAt: {
              $gte: new Date(`${currentYear}-01-01`),
              $lte: new Date(`${currentYear}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: {
              $month: "$createdAt",
            },
            revenue: {
              $sum: "$totalAmount",
            },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),
      Order.aggregate([
        {
          $group: {
            _id: "$orderStatus",
            count: {
              $sum: 1,
            },
          },
        },
      ]),
      Order.aggregate([
        {
          $unwind: "$items",
        },
        {
          $group: {
            _id: "$items.cookieId",
            sold: {
              $sum: "$items.quantity",
            },
          },
        },
        {
          $sort: {
            sold: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $lookup: {
            from: "cookies",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $project: {
            _id: 0,
            productName: "$product.name",
            sold: 1,
          },
        },
      ]),
      User.aggregate([
        {
          $match: {
            role: "user",
          },
        },
        {
          $group: {
            _id: {
              $month: "$createdAt",
            },
            customers: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            "_id.month": 1,
          },
        },
      ]),
    ]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const salesOverview = months.map((month, idx) => {
    const item = monthlyRevenue.find((m) => m._id === idx + 1);
    return {
      month,
      revenue: item?.revenue || 0,
    };
  });

  const status = {
    pending: 0,
    confirmed: 0,
    baking: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  orderStatus.forEach((item) => {
    status[item._id] = item.count;
  });

  const customerStats = months.map((month, idx) => {
    const item = customerGrowth.find((m) => m._id === idx + 1);

    return {
      month,
      customers: item?.customers || 0,
    };
  });

  return res.status(200).json({
    success: true,
    message: "Analytics fetched successfully",
    data: {
      salesOverview,
      orderStatus: status,
      topProducts,
      customerGrowth: customerStats,
    },
  });
});
