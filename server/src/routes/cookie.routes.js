import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import {
  createCookie,
  getAllCookies,
  getSingleCookie,
  updateCookie,
  deleteCookie,
} from "../controllers/cookie.controller.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getAllCookies);

router.get("/:id", getSingleCookie);

router.post("/", verifyJWT, verifyAdmin, createCookie);

router.put("/:id", verifyJWT, verifyAdmin, updateCookie);

router.delete("/:id", verifyJWT, verifyAdmin, deleteCookie);

export default router;
