import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(200).required(),
  description: Joi.string().trim().min(10).required(),
  category: Joi.string().required(),
  stock: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string()).min(1).required(),
  ingredients: Joi.array().items(Joi.string()).min(2).required(),

  variants: Joi.array()
    .items(
      Joi.object({
        weight: Joi.string().trim().required(),
        price: Joi.number().min(99).required(),
        discountPrice: Joi.number().min(59).required(),
        stock: Joi.number().min(1).required(),
        isAvailable: Joi.boolean(),
      }),
    )
    .min(1)
    .required(),
});
