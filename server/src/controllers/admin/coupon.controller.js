import Coupon from "../../models/coupon.model.js";

export const getCoupons = async (_, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res.status(200).json({
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

export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    return res.status(200).json({
      success: true,
      message: "Coupon created successfully.",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      description,
      discountType,
      discountValue,
      minimumOrderAmount,
      maximumDiscount,
      usageLimit,
      startDate,
      expiryDate,
      isActive,
    } = req.body;

    const coupon = await Coupon.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    if (description !== undefined) coupon.description = description;

    if (discountType !== undefined) coupon.discountType = discountType;

    if (discountValue !== undefined) coupon.discountValue = discountValue;

    if (minimumOrderAmount !== undefined)
      coupon.minimumOrderAmount = minimumOrderAmount;

    if (maximumDiscount !== undefined) coupon.maximumDiscount = maximumDiscount;

    if (usageLimit !== undefined) coupon.usageLimit = usageLimit;

    if (startDate) coupon.startDate = startDate;

    if (expiryDate) coupon.expiryDate = expiryDate;

    if (typeof isActive === "boolean") coupon.isActive = isActive;

    await coupon.save();

    return res
      .status(200)
      .json({ success: true, message: "Coupon updated successfully." });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.isActive = false;
    coupon.isDeleted = true;

    await coupon.save();

    return res.status(200).json({
      success: true,
      message: "Coupon status updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
