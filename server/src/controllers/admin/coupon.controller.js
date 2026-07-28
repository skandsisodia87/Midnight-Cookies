import Coupon from "../../models/coupon.model.js";

export const getCoupons = async (_, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json({
        success: true,
        message: "Coupons fetched successfully.",
        data: coupons,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon fetched successfully.",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
