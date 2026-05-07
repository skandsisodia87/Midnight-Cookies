import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;
