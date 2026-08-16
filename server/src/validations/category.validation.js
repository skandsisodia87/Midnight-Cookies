import Joi from "joi";
import constants from "../constants/constants.js";

const categorySchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": constants.NAME_REQUIRED,
    "any.required": constants.NAME_REQUIRED,
  }),

  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/)
    .required()
    .messages({
      "string.base": "Slug must be a string.",
      "string.empty": "Slug is required.",
      "any.required": "Slug is required.",
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens.",
    }),

  description: Joi.string().trim().allow("").messages({
    "string.base": constants.DESCRIPTION_TYPE,
  }),
});

export default categorySchema;
