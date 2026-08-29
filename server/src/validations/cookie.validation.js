import Joi from "joi";
import constants from "../constants/constants.js";

const customJsonParse = (value, helpers) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return helpers.error("any.invalid");
    }
  }
  return value;
};

const variantSchema = Joi.object({
  _id: Joi.string().optional(),
  weight: Joi.string().trim().required().messages({
    "string.base": "Weight must be a string",
    "string.empty": "Weight is required",
    "any.required": "Weight is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  discountPrice: Joi.number().min(0).optional().messages({
    "number.base": "Discount price must be a number",
    "number.min": "Discount price cannot be negative",
  }),

  stock: Joi.number().min(0).required().messages({
    "number.base": "Variant stock must be a number",
    "number.min": "Variant stock cannot be less than 0",
    "any.required": "Variant stock is required",
  }),

  isAvailable: Joi.boolean().optional(),
  sku: Joi.string().optional(),
});

export const cookieSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required().messages({
    "string.base": "Cookie name must be a string",
    "string.empty": "Cookie name is required",
    "string.min": "Cookie name must be at least 2 characters",
    "string.max": "Cookie name cannot exceed 200 characters",
    "any.required": "Cookie name is required",
  }),

  description: Joi.string().trim().min(5).required().messages({
    "string.base": constants.DESCRIPTION_TYPE || "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
    "any.required": "Description is required",
  }),

  category: Joi.string().trim().required().messages({
    "string.base": "Category must be a valid category ID",
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),

  stock: Joi.number().min(0).optional(),

  ingredients: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim()).min(1),
      Joi.string().custom(customJsonParse),
    )
    .required()
    .messages({
      "any.required": "Ingredients are required",
    }),

  variants: Joi.alternatives()
    .try(
      Joi.array().items(variantSchema).min(1),
      Joi.string().custom(customJsonParse),
    )
    .required()
    .messages({
      "any.required": "At least one variant is required",
    }),

  isFeatured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
  isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
});

export const updateCookieSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).optional(),
  description: Joi.string().trim().min(5).optional(),
  category: Joi.string().trim().optional(),
  stock: Joi.number().min(0).optional(),
  ingredients: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().trim()),
      Joi.string().custom(customJsonParse),
    )
    .optional(),
  variants: Joi.alternatives()
    .try(
      Joi.array().items(variantSchema),
      Joi.string().custom(customJsonParse),
    )
    .optional(),
  isFeatured: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
  isActive: Joi.alternatives().try(Joi.boolean(), Joi.string()).optional(),
});

