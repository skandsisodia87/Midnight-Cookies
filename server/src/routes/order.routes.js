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
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", validate(createOrderSchema), createOrder);

router.get("/my-orders", getMyOrders);

router.get("/:orderId", getSingleOrder);

router.get("/admin/all", verifyAdmin, getAllOrders);

router.put(
  "/admin/:id",
  verifyAdmin,
  validate(orderStatusSchema),
  validateObjectId(),
  updateOrderStatus,
);

export default router;
