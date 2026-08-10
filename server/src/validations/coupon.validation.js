import Joi from "joi";

export const couponSchema = Joi.object({
  code: Joi.string().trim().uppercase().min(3).max(20).required().messages({
    "string.empty": "Coupon code is required",
    "string.min": "Coupon code must be at least 3 characters",
    "string.max": "Coupon code cannot exceed 20 characters",
    "any.required": "Coupon code is required",
  }),

  discountType: Joi.string().valid("percentage", "fixed").required().messages({
    "any.only": "Discount type must be either 'percentage' or 'fixed'",
    "any.required": "Discount type is required",
  }),

  discountValue: Joi.number()
    .positive()
    .required()
    .when("discountType", {
      is: "percentage",
      then: Joi.number().max(100),
    })
    .messages({
      "number.base": "Discount value must be a number",
      "number.positive": "Discount value must be greater than 0",
      "number.max": "Percentage discount cannot exceed 100",
      "any.required": "Discount value is required",
    }),

  minimumOrderAmount: Joi.number().min(0).default(0).messages({
    "number.min": "Minimum order amount cannot be negative",
  }),

  maximumDiscount: Joi.number().allow(null).min(0).messages({
    "number.min": "Minimum order amount cannot be negative",
  }),

  usageLimit: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Usage limit must be a number",
    "number.integer": "Usage limit must be an integer",
    "number.min": "Usage limit must be at least 1",
  }),

  usedCount: Joi.number().integer().min(0).default(0).messages({
    "number.integer": "Used count must be an integer",
    "number.min": "Used count cannot be negative",
  }),

  startDate: Joi.date().required().messages({
    "date.base": "Start date is invalid",
    "any.required": "Start date is required",
  }),

  expiryDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "date.greater": "Expiry date must be after the start date",
    "date.base": "Expiry date is invalid",
    "any.required": "Expiry date is required",
  }),

  isActive: Joi.boolean().default(true),
});

export const updateCouponSchema = Joi.object({
  discountType: Joi.string().valid("percentage", "fixed").messages({
    "string.base": "Discount type must be a string",
    "any.only": "Discount type must be either 'percentage' or 'fixed'",
  }),

  discountValue: Joi.number().min(0).messages({
    "number.base": "Discount value must be a number",
    "number.min": "Discount value cannot be less than 0",
  }),

  minimumOrderAmount: Joi.number().min(0).messages({
    "number.base": "Minimum order amount must be a number",
    "number.min": "Minimum order amount cannot be less than 0",
  }),

  maximumDiscount: Joi.number().allow(null).min(0).messages({
    "number.base": "Maximum discount must be a number",
    "number.min": "Maximum discount cannot be less than 0",
  }),

  usageLimit: Joi.number().integer().min(1).messages({
    "number.base": "Usage limit must be a number",
    "number.integer": "Usage limit must be an integer",
    "number.min": "Usage limit must be at least 1",
  }),

  startDate: Joi.date().messages({
    "date.base": "Start date must be a valid date",
  }),

  expiryDate: Joi.date().messages({
    "date.base": "Expiry date must be a valid date",
  }),

  isActive: Joi.boolean().messages({
    "boolean.base": "isActive must be a boolean",
  }),
})
  .min(1)
  .messages({
    "object.min": "Please provide at least one field to update",
  });
