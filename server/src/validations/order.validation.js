import Joi from "joi";

export const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        cookieId: Joi.string().required(),
        quantity: Joi.number().min(1).required,
        variantId: Joi.string().required(),
      }),
    )
    .min(1)
    .required(),
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  notes: Joi.string(),
});

export const orderStatusSchema = Joi.object({
  orderStatus: Joi.string().trim().required(),
});
