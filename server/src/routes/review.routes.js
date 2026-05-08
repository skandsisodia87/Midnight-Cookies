import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createReview,
  getCookieReviews,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:cookieId", getCookieReviews);

router.post("/", verifyJWT, createReview);

router.delete("/:id", verifyJWT, deleteReview);

export default router;
