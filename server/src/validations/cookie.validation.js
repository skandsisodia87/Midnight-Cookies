import Joi from "joi";
import constants from "../constants/constants.js";

export const cookieSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required().messages({
    "string.base": "Cookie name must be a string",
    "string.empty": "Cookie name is required",
    "string.min": "Cookie name must be at least 2 characters",
    "string.max": "Cookie name cannot exceed 200 characters",
    "any.required": "Cookie name is required",
  }),

  description: Joi.string().trim().min(10).required().messages({
    "string.base": constants.DESCRIPTION_TYPE,
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
    "any.required": "Description is required",
  }),

  category: Joi.string().trim().required().messages({
    "string.base": "Category must be a string",
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),

  stock: Joi.number().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be less than 0",
    "any.required": "Stock is required",
  }),

  // images: Joi.array().items(Joi.string()).min(1).required().messages({
  //   "array.base": "Images must be an array",
  //   "array.min": "At least one image is required",
  //   "any.required": "Cookie image is required",
  // }),

  ingredients: Joi.array()
    .items(Joi.string().trim())
    .min(2)
    .required()
    .messages({
      "array.base": "Ingredients must be an array",
      "array.min": "Please provide at least 2 ingredients",
      "any.required": "Ingredients are required",
    }),

  variants: Joi.array()
    .items(
      Joi.object({
        weight: Joi.string().trim().required().messages({
          "string.base": "Weight must be a string",
          "string.empty": "Weight is required",
          "any.required": "Weight is required",
        }),

        price: Joi.number().min(99).required().messages({
          "number.base": "Price must be a number",
          "number.min": "Price must be at least ₹99",
          "any.required": "Price is required",
        }),

        discountPrice: Joi.number().min(59).required().messages({
          "number.base": "Discount price must be a number",
          "number.min": "Discount price must be at least ₹59",
          "any.required": "Discount price is required",
        }),

        stock: Joi.number().min(1).required().messages({
          "number.base": "Variant stock must be a number",
          "number.min": "Variant stock must be at least 1",
          "any.required": "Variant stock is required",
        }),

        isAvailable: Joi.boolean().messages({
          "boolean.base": "Availability must be true or false",
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Variants must be an array",
      "array.min": "At least one variant is required",
      "any.required": "Variants are required",
    }),
});
