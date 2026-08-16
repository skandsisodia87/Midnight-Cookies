import User from "../../models/user.model.js";
import Cookies from "../../models/cookie.model.js";
import Order from "../../models/order.model.js";
import CookieVariant from "../../models/cookieVariant.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import constants from "../../constants/constants.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [
    totalProducts,
    totalCustomers,
    totalOrders,
    totalRevenue,
    deliveredOrders,
    shippedOrders,
    bakingOrders,
    confirmedOrders,
    placedOrders,
    cancelledOrders,
    lowStockProducts,
    recentOrders,
    topSellingProducts,
    usersEnrolledToday,
    todaySales,
  ] = await Promise.all([
    Cookies.countDocuments(),
    User.countDocuments({ role: constants.USER }),
    Order.countDocuments(),
    Order.aggregate([
      {
        $match: {
          paymentStatus: constants.PAID,
          orderStatus: constants.DELIVERED,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
    Order.countDocuments({ orderStatus: constants.DELIVERED }),
    Order.countDocuments({ orderStatus: constants.SHIPPED }),
    Order.countDocuments({ orderStatus: constants.SHIPPED }),
    Order.countDocuments({ orderStatus: constants.CONFIRMED }),
    Order.countDocuments({ orderStatus: constants.PLACED }),
    Order.countDocuments({ orderStatus: constants.CANCELLED }),
    CookieVariant.find({
      stock: { $lte: 5 },
    })
      .populate({
        path: "cookieId",
        select: "name",
      })
      .select("cookieId stock")
      .limit(5),
    Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name")
      .select("orderId totalAmount orderStatus paymentStatus createdAt"),
    Order.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.cookieId",
          totalSold: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
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
          name: "$product.name",
          image: "$product.images",
          totalSold: 1,
        },
      },
    ]),
    User.countDocuments({
      role: constants.USER,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
    Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          sales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
  ]);

  return res.status(200).json({
    success: true,
    message: "Dashboard data fetched successfully.",
    data: {
      totalProducts,
      totalCustomers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.totalRevenue ?? 0,
      shippedOrders,
      confirmedOrders,
      bakingOrders,
      placedOrders,
      deliveredOrders,
      cancelledOrders,
      usersEnrolledToday,
      todaySales,
      lowStockProducts,
      recentOrders,
      topSellingProducts,
      todaySales: todaySales[0]?.sales ?? 0,
    },
  });
});
