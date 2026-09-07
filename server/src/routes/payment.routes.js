import express from "express";
import { createPaymentOrder } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", createPaymentOrder);

export default router;
