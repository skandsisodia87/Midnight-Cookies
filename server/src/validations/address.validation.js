import Joi from "joi";

export const addressSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),

  fullAddress: Joi.string().trim().min(5).max(500).required(),
  city: Joi.string().trim().min(2).max(100).required(),
  state: Joi.string().trim().min(2).max(100).required(),

  pincode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.pattern.base": "Pincode must be 6 digits",
    }),

  isDefault: Joi.boolean().optional(),
});
