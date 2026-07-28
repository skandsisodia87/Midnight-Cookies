import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createReview,
  getCookieReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/:cookieId", validateObjectId("cookieId"), getCookieReviews);

router.post("/", verifyJWT, createReview);

router.delete("/:id", verifyJWT, validateObjectId(), deleteReview);

export default router;
