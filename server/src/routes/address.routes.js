import express from "express";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddressById,
} from "../controllers/address.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(verifyToken, addAddress).get(verifyToken, getAddresses);

router
  .route("/:addressId")
  .get(verifyToken, getAddressById)
  .put(verifyToken, updateAddress)
  .delete(verifyToken, deleteAddress);

export default router;
