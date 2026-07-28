import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  getAllCookies,
  getSingleCookie,
  getFeaturedCookies,
} from "../controllers/cookie.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validation.middleware.js";

const router = express.Router();

router.get("/", getAllCookies);

router.get("/featured", getFeaturedCookies);

router.get("/:slug", getSingleCookie);

export default router;
