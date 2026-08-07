import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  createOrderSchema,
  orderStatusSchema,
} from "../validations/order.validation.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", validate(createOrderSchema), createOrder);

router.get("/my-orders", getMyOrders);

router.get("/:orderId", getSingleOrder);

export default router;
