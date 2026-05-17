import express from "express";
import {
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, addAddress);

router.put("/:addressId", verifyToken, updateAddress);

router.delete("/:addressId", verifyToken, deleteAddress);

export default router;
