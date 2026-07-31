import Joi from "joi";

export const addressSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Full name must be a string",
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters",
    "string.max": "Full name cannot exceed 100 characters",
    "any.required": "Full name is required",
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "Phone number must be a string",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be exactly 10 digits",
      "any.required": "Phone number is required",
    }),

  address: Joi.string().trim().min(5).max(500).required().messages({
    "string.base": "Address must be a string",
    "string.empty": "Address is required",
    "string.min": "Address must be at least 5 characters",
    "string.max": "Address cannot exceed 500 characters",
    "any.required": "Address is required",
  }),

  city: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "City must be a string",
    "string.empty": "City is required",
    "string.min": "City must be at least 2 characters",
    "string.max": "City cannot exceed 100 characters",
    "any.required": "City is required",
  }),

  state: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "State must be a string",
    "string.empty": "State is required",
    "string.min": "State must be at least 2 characters",
    "string.max": "State cannot exceed 100 characters",
    "any.required": "State is required",
  }),

  pincode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "string.base": "Pincode must be a string",
      "string.empty": "Pincode is required",
      "string.pattern.base": "Pincode must be exactly 6 digits",
      "any.required": "Pincode is required",
    }),

  isDefault: Joi.boolean().optional().messages({
    "boolean.base": "Default address must be true or false",
  }),
});
