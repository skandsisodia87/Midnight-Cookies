import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),

  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().trim().email().required(),
});

export const verifyEmailOtpSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  otp: Joi.string().trim().min(6).max(6).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required(),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});
