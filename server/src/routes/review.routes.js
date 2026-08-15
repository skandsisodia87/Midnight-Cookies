import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createReview,
  getCookieReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import {
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";
import contants from "../constants/constants.js";

const router = express.Router();

router.get("/:cookieId", validateObjectId("cookieId"), getCookieReviews);

router.post("/", verifyJWT, validateUserRole(contants.USER), createReview);

router.delete(
  "/:id",
  verifyJWT,
  validateUserRole(contants.USER),
  validateObjectId(),
  deleteReview,
);

export default router;
