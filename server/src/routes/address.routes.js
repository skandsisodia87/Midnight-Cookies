import express from "express";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddressById,
} from "../controllers/address.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import { addressSchema } from "../validations/address.validation.js";

const router = express.Router();

router
  .route("/")
  .post(verifyToken, validate(addressSchema), addAddress)
  .get(verifyToken, validate(addressSchema), getAddresses);

router
  .route("/:addressId")
  .get(verifyToken, getAddressById)
  .put(verifyToken, updateAddress)
  .delete(verifyToken, deleteAddress);

export default router;
