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

router.use(verifyToken);

router.post("/add", addToCart);

router.get("/", getCart);

router.patch("/update/:cookieId", updateCartItemQuantity);

router.patch("/batch-update", updateCartItemsQuantity);

router.delete("/remove/:cookieId", removeCartItem);

router.delete("/clear", clearCart);

export default router;
