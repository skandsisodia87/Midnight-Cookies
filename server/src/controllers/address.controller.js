import Address from "../models/address.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addAddress = asyncHandler(async (req, res) => {
  const { fullName, phone, address, city, state, pincode, isDefault } =
    req.body;

  if (isDefault) {
    await Address.updateMany(
      { user: req.user._id },
      { $set: { isDefault: false } },
    );
  }

  const newAddress = await Address.create({
    user: req.user._id,
    fullName,
    phone,
    address,
    city,
    state,
    pincode,
    isDefault: !!isDefault,
  });

  return res.status(201).json({
    success: true,
    message: "Address added successfully",
    newAddress,
  });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const { fullName, phone, address, city, state, pincode, isDefault } =
    req.body;

  const addressExist = await Address.findOne({
    _id: addressId,
    user: req.user._id,
  });

  if (!addressExist) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  if (isDefault) {
    await Address.updateMany(
      {
        user: req.user._id,
        _id: { $ne: addressId },
      },
      {
        $set: { isDefault: false },
      },
    );
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      isDefault: !!isDefault,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return res.status(200).json({
    success: true,
    message: "Address updated successfully",
    address: updatedAddress,
  });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const address = await Address.findOne({
    _id: addressId,
    user: req.user._id,
  });

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  await Address.findByIdAndDelete(addressId);

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find(
    {
      user: req.user._id,
    },
    "-updatedAt -user -__v",
  ).sort({
    createdAt: -1,
  });

  return res.status(200).json({
    success: true,
    message:
      addresses.length > 0
        ? "Addresses fetched successfully"
        : "No addresses found",
    addresses,
  });
});

export const getAddressById = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const address = await Address.findOne(
    {
      _id: addressId,
      user: req.user._id,
    },
    "-updatedAt -user -__v",
  );

  if (!address) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Address fetched successfully",
    address,
  });
});
