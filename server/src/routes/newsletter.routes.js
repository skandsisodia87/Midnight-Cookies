import express from "express";
import { emailSchema } from "../validations/auth.validation.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  subscribeNewsletter,
  verifyNewsletter,
} from "../controllers/newsletter.controller.js";

const router = express.Router();

router.post("/subscribe", validate(emailSchema), subscribeNewsletter);
router.get("/verify/:token", verifyNewsletter);

export default router;
