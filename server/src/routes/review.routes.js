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

const router = express.Router();

router.get("/:cookieId", validateObjectId("cookieId"), getCookieReviews);

router.post("/", verifyJWT, validateUserRole("user"), createReview);

router.delete(
  "/:id",
  verifyJWT,
  validateUserRole("user"),
  validateObjectId(),
  deleteReview,
);

export default router;
