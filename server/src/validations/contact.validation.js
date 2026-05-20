import Joi from "joi";

export const contactSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),

  email: Joi.string().email().required(),

  subject: Joi.string().trim().min(3).max(200).required(),

  message: Joi.string().trim().min(10).max(2000).required(),
});
