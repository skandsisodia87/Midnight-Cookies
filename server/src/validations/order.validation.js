import Joi from "joi";

export const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        cookieId: Joi.string().required().messages({
          "string.empty": "Cookie ID is required",
          "any.required": "Cookie ID is required",
        }),

        quantity: Joi.number().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.min": "Quantity must be at least 1",
          "any.required": "Quantity is required",
        }),

        variantId: Joi.string().required().messages({
          "string.empty": "Variant ID is required",
          "any.required": "Variant ID is required",
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Items must be an array",
      "array.min": "At least one item is required",
      "any.required": "Items are required",
    }),

  shippingAddress: Joi.object().required().messages({
    "object.base": "Shipping address must be an object",
    "any.required": "Shipping address is required",
  }),

  paymentMethod: Joi.string().trim().required().messages({
    "string.empty": "Payment method is required",
    "any.required": "Payment method is required",
  }),

  notes: Joi.string().allow("").messages({
    "string.base": "Notes must be a string",
  }),
});

export const orderStatusSchema = Joi.object({
  orderStatus: Joi.string().trim().required().messages({
    "string.empty": "Order status is required",
    "any.required": "Order status is required",
  }),
});
