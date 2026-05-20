import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  getAllOrders,
} from "../controllers/order.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  createOrderSchema,
  orderStatusSchema,
} from "../validations/order.validation.js";

const router = express.Router();

router.post("/", verifyJWT, validate(createOrderSchema), createOrder);

router.get("/my-orders", verifyJWT, getMyOrders);

router.get("/:orderId", verifyJWT, getSingleOrder);

router.get("/admin/all", verifyJWT, verifyAdmin, getAllOrders);

router.put(
  "/admin/:id",
  verifyJWT,
  verifyAdmin,
  validate(orderStatusSchema),
  updateOrderStatus,
);

export default router;
