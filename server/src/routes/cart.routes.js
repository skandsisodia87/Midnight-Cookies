import { Router } from "express";
import verifyToken from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartItemQuantity,
  updateCartItemsQuantity,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
import {
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";
import constants from "../constants/constants.js";

const router = Router();

router.use(verifyToken);
router.use(validateUserRole(constants.USER));

router.post("/add", addToCart);

router.get("/", getCart);

router.patch(
  "/update/:cookieId",
  validateObjectId("cookieId"),
  updateCartItemQuantity,
);

router.patch("/batch-update", updateCartItemsQuantity);

router.delete(
  "/remove/:cookieId",
  validateObjectId("cookieId"),
  removeCartItem,
);

router.delete("/clear", clearCart);

export default router;
