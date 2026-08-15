import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
} from "../controllers/order.controller.js";
import {
  validate,
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";
import {
  createOrderSchema,
  orderStatusSchema,
} from "../validations/order.validation.js";
import contants from "../constants/constants.js";

const router = express.Router();

router.use(verifyJWT);
router.use(validateUserRole(contants.USER));

router.post("/", validate(createOrderSchema), createOrder);

router.get("/my-orders", getMyOrders);

router.get("/:orderId", getSingleOrder);

export default router;
