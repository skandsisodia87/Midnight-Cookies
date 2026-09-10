import Joi from "joi";

export const deliveryAgentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80).required(),
  phone: Joi.string().trim().min(7).max(20).required(),
  partner: Joi.string().trim().min(2).max(80).required(),
  isActive: Joi.boolean().default(true),
});

export const updateDeliveryAgentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(80),
  phone: Joi.string().trim().min(7).max(20),
  partner: Joi.string().trim().min(2).max(80),
  isActive: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "Please provide at least one field to update",
  });
