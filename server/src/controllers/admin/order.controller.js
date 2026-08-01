import Order from "../../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
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

    const [orders, stats] = await Promise.all([
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
                    $in: ["$orderStatus", ["placed", "confirmed", "baking"]],
                  },
                  1,
                  0,
                ],
              },
            },

            delivered: {
              $sum: {
                $cond: [{ $eq: ["$orderStatus", "delivered"] }, 1, 0],
              },
            },

            shipped: {
              $sum: {
                $cond: [{ $eq: ["$orderStatus", "shipped"] }, 1, 0],
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
      orders,
      stats: stats[0] || {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        cancelledOrders: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
