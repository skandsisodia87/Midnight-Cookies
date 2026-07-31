import Joi from "joi";

export const contactSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required().messages({
    "string.base": "Full name must be a string",
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters",
    "string.max": "Full name cannot exceed 100 characters",
    "any.required": "Full name is required",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),

  subject: Joi.string().trim().min(3).max(200).required().messages({
    "string.base": "Subject must be a string",
    "string.empty": "Subject is required",
    "string.min": "Subject must be at least 3 characters",
    "string.max": "Subject cannot exceed 200 characters",
    "any.required": "Subject is required",
  }),

  message: Joi.string().trim().min(10).max(2000).required().messages({
    "string.base": "Message must be a string",
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters",
    "string.max": "Message cannot exceed 2000 characters",
    "any.required": "Message is required",
  }),
});
