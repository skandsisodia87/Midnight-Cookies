import Joi from "joi";

export const addReviewSchema = Joi.object({
  cookieId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().trim().min(3).max(500).required(),
});
