import constants from "../../constants/constants.js";
import User from "../../models/user.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({
    role: constants.USER,
    isDeleted: false,
  })
    .select("name email phone isActive createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    message: "Customers fetched successfully.",
    customers,
  });
});

export const getCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await User.findOne({
    _id: id,
    role: constants.USER,
    isDeleted: false,
  })
    .select(
      "name email phone isActive role isEmailVerified createdAt updatedAt",
    )
    .lean();

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: constants.CUSTOMER_NOT_FOUND,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Customer fetched successfully.",
    data: customer,
  });
});

export const updateCustomerStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await User.findOne({
    _id: id,
    role: constants.USER,
    isDeleted: false,
  });

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: constants.CUSTOMER_NOT_FOUND,
    });
  }

  customer.isActive = !customer.isActive;
  await customer.save();

  return res.status(200).json({
    success: true,
    message: `Customer ${
      customer.isActive ? "activated" : "deactivated"
    } successfully.`,
    data: {
      isActive: customer.isActive,
    },
  });
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const customer = await User.findOneAndUpdate(
    {
      _id: id,
      role: constants.USER,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    {
      new: true,
    },
  );

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: constants.CUSTOMER_NOT_FOUND,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Customer deleted successfully.",
  });
});
