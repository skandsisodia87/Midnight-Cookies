import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createCookie,
  getAllCookies,
  getSingleCookie,
  updateCookie,
  deleteCookie,
  bulkCreateCookies,
} from "../controllers/cookie.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getAllCookies);

router.get("/:slug", getSingleCookie);

router.post("/", verifyJWT, verifyAdmin, createCookie);

router.post("/bulk", verifyJWT, verifyAdmin, bulkCreateCookies);

router.put("/:id", verifyJWT, verifyAdmin, updateCookie);

router.delete("/:id", verifyJWT, verifyAdmin, deleteCookie);

export default router;
