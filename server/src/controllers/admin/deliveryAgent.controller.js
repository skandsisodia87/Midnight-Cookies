import DeliveryAgent from "../../models/deliveryAgent.model.js";
import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const getDeliveryAgents = asyncHandler(async (req, res) => {
  const agents = await DeliveryAgent.find({ isDeleted: false }).sort({
    isActive: -1,
    name: 1,
  });

  return res.status(200).json({
    success: true,
    agents,
  });
});

export const createDeliveryAgent = asyncHandler(async (req, res) => {
  const agent = await DeliveryAgent.create(req.body);

  return res.status(201).json({
    success: true,
    message: "Delivery agent created successfully",
    agent,
  });
});

export const updateDeliveryAgent = asyncHandler(async (req, res) => {
  const agent = await DeliveryAgent.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { $set: req.body },
    { new: true, runValidators: true },
  );

  if (!agent) {
    return res.status(404).json({
      success: false,
      message: "Delivery agent not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Delivery agent updated successfully",
    agent,
  });
});

export const deleteDeliveryAgent = asyncHandler(async (req, res) => {
  const assignedOrder = await Order.exists({
    deliveryAgent: req.params.id,
    orderStatus: { $nin: ["delivered", "cancelled"] },
  });

  if (assignedOrder) {
    return res.status(409).json({
      success: false,
      message: "This delivery agent is assigned to an active order",
    });
  }

  const agent = await DeliveryAgent.findOneAndUpdate(
    { _id: req.params.id, isDeleted: false },
    { $set: { isDeleted: true, isActive: false } },
    { new: true },
  );

  if (!agent) {
    return res.status(404).json({
      success: false,
      message: "Delivery agent not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Delivery agent deleted successfully",
  });
});
