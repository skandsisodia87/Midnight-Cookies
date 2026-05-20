import express from "express";
import { contactSchema } from "../validations/contact.validation.js";
import { validate } from "../middleware/validation.middleware.js";
import { contactUs } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", validate(contactSchema), contactUs);

export default router;
