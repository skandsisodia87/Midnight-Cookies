import express from "express";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddressById,
} from "../controllers/address.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import {
  validate,
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";
import { addressSchema } from "../validations/address.validation.js";
import constants from "../constants/constants.js";

const router = express.Router();

router.use(verifyToken);
router.use(validateUserRole(constants.USER));

router.route("/").post(validate(addressSchema), addAddress).get(getAddresses);

router
  .route("/:addressId")
  .all(validateObjectId("addressId"))
  .get(getAddressById)
  .put(validate(addressSchema), updateAddress)
  .delete(deleteAddress);

export default router;
