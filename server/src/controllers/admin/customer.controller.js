import User from "../../models/user.model.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select("name email phone createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Customers fetched successfully.",
      data: {
        customers,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
