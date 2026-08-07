import Coupon from "../../models/coupon.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getCoupons = asyncHandler(async (_, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Coupons fetched successfully.",
    data: coupons,
  });
});

export const getCoupon = asyncHandler(async (req, res) => {
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
});

export const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);

  return res.status(200).json({
    success: true,
    message: "Coupon created successfully.",
    data: coupon,
  });
});

export const updateCoupon = asyncHandler(async (req, res) => {
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
});

export const deleteCoupon = asyncHandler(async (req, res) => {
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
});
