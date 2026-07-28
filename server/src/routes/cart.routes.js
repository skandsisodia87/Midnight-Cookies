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
import validateObjectId from "../middleware/validateObjectId.js";

const router = Router();

router.use(verifyToken);

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
