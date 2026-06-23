import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddressById = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
