import User from "../../models/user.model.js";
import Cookies from "../../models/cookie.model.js";
import Order from "../../models/order.model.js";
import CookieVariant from "../../models/cookieVariant.model.js";

export const getDashboard = async (req, res) => {
  try {
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
    ] = await Promise.all([
      Cookies.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.countDocuments(),
      Order.aggregate([
        {
          $match: {
            paymentStatus: "paid",
            orderStatus: "delivered",
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
      Order.countDocuments({ orderStatus: "delivered" }),
      Order.countDocuments({ orderStatus: "shipped" }),
      Order.countDocuments({ orderStatus: "baking" }),
      Order.countDocuments({ orderStatus: "confirmed" }),
      Order.countDocuments({ orderStatus: "placed" }),
      Order.countDocuments({ orderStatus: "cancelled" }),
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
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully.",
      data: {
        totalProducts,
        totalCustomers,
        totalOrders,
        totalRevenue: totalRevenue[0].totalRevenue,
        shippedOrders,
        confirmedOrders,
        bakingOrders,
        placedOrders,
        deliveredOrders,
        cancelledOrders,
        lowStockProducts,
        recentOrders,
        topSellingProducts,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
