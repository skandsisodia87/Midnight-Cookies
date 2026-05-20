import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createCookie,
  getAllCookies,
  getSingleCookie,
  updateCookie,
  deleteCookie,
  bulkCreateCookies,
  getFeaturedCookies,
} from "../controllers/cookie.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import { cookieSchema } from "../validations/cookie.validation.js";

const router = express.Router();

router.get("/", getAllCookies);

router.get("/featured", getFeaturedCookies);

router.get("/:slug", getSingleCookie);

router.post("/", verifyJWT, verifyAdmin, validate(cookieSchema), createCookie);

router.post("/bulk", verifyJWT, verifyAdmin, bulkCreateCookies);

router.put(
  "/:id",
  verifyJWT,
  verifyAdmin,
  validate(cookieSchema),
  updateCookie,
);

router.delete("/:id", verifyJWT, verifyAdmin, deleteCookie);

export default router;
