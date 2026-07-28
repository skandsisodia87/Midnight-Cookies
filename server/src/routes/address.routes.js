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
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.use(verifyToken);

router
  .route("/")
  .post(validate(addressSchema), addAddress)
  .get(validate(addressSchema), getAddresses);

router
  .route("/:addressId")
  .all(validateObjectId("addressId"))
  .get(getAddressById)
  .put(updateAddress)
  .delete(deleteAddress);

export default router;
