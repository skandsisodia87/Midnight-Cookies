import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createReview,
  getCookieReviews,
  getTestimonials,
  deleteReview,
} from "../controllers/review.controller.js";
import {
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";
import constants from "../constants/constants.js";

const router = express.Router();

router.get("/testimonials", getTestimonials);
router.get("/:cookieId", validateObjectId("cookieId"), getCookieReviews);

router.post("/", verifyJWT, validateUserRole(constants.USER), createReview);

router.delete(
  "/:id",
  verifyJWT,
  validateUserRole(constants.USER),
  validateObjectId(),
  deleteReview,
);

export default router;
