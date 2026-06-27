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

const router = Router();

router.post("/add", verifyToken, addToCart);

router.get("/", verifyToken, getCart);

router.patch("/update/:cookieId", verifyToken, updateCartItemQuantity);

router.patch("/batch-update", verifyToken, updateCartItemsQuantity);

router.delete("/remove/:cookieId", verifyToken, removeCartItem);

router.delete("/clear", verifyToken, clearCart);

export default router;
