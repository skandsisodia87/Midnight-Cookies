import contants from "../constants/constants.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createConversation = asyncHandler(async (req, res) => {
  const customerId = req.user._id;

  let conversation = await Conversation.findOne({
    customerId,
    status: "open",
  })
    .populate("customerId", "name email")
    .populate("adminId", "name email");

  if (conversation) {
    return res.status(200).json({
      success: true,
      message: "Conversation already exists",
      data: conversation,
    });
  }

  conversation = await Conversation.create({
    customerId,
    adminId: null,
    status: "open",
  });

  conversation = await Conversation.findById(conversation._id)
    .populate("customerId", "name email")
    .populate("adminId", "name email");

  return res.status(201).json({
    success: true,
    message: "Conversation created successfully",
    data: conversation,
  });
});

export const getMyConversation = asyncHandler(async (req, res) => {
  const customerId = req.user._id;

  const conversation = await Conversation.findOne({
    customerId,
    status: "open",
  })
    .populate("customerId", "name email")
    .populate("adminId", "name email");

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "No active conversation found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Conversation fetched successfully",
    data: conversation,
  });
});

export const getAllConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find()
    .populate("customerId", "name email")
    .populate("adminId", "name email")
    .sort({ lastMessageAt: -1, createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Conversations fetched successfully",
    data: conversations,
  });
});

export const getConversationById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.findById(id)
    .populate("customerId", "name email")
    .populate("adminId", "name email");

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Conversation fetched successfully",
    data: conversation,
  });
});

export const assignConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const adminId = req.user._id;

  const conversation = await Conversation.findById(id);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found",
    });
  }

  if (conversation.status === "closed") {
    return res.status(400).json({
      success: false,
      message: "Cannot assign a closed conversation",
    });
  }

  conversation.adminId = adminId;

  await conversation.save();

  const updatedConversation = await Conversation.findById(id)
    .populate("customerId", "name email")
    .populate("adminId", "name email");

  return res.status(200).json({
    success: true,
    message: "Conversation assigned successfully",
    data: updatedConversation,
  });
});

export const closeConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const conversation = await Conversation.findById(id);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found",
    });
  }

  if (conversation.status === "closed") {
    return res.status(400).json({
      success: false,
      message: "Conversation is already closed",
    });
  }

  conversation.status = "closed";

  await conversation.save();

  return res.status(200).json({
    success: true,
    message: "Conversation closed successfully",
    data: conversation,
  });
});

export const createMessage = asyncHandler(async (req, res) => {
  const { conversationId, message, messageType, attachments } = req.body;

  const senderId = req.user._id;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found",
    });
  }

  if (conversation.status === "closed") {
    return res.status(400).json({
      success: false,
      message: "This conversation is closed",
    });
  }

  const isCustomer = conversation.customerId.toString() === senderId.toString();

  const isAdmin =
    conversation.adminId &&
    conversation.adminId.toString() === senderId.toString();

  if (!isCustomer && !isAdmin) {
    return res.status(403).json({
      success: false,
      message: "You are not a participant of this conversation",
    });
  }

  if (
    (!message || !message.trim()) &&
    (!attachments || attachments.length === 0)
  ) {
    return res.status(400).json({
      success: false,
      message: "Message or attachment is required",
    });
  }

  const newMessage = await Message.create({
    conversationId,
    senderId,
    message: message?.trim() || "",
    messageType: messageType || "text",
    attachments: attachments || [],
  });

  conversation.lastMessage = message?.trim() || "Attachment";
  conversation.lastMessageAt = new Date();
  conversation.unreadCount += 1;

  await conversation.save();

  const populateMessage = await Message.findById(newMessage._id).populate(
    "senderId",
    "name email",
  );

  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: populatedMessage,
  });
});

export const getConversationMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found",
    });
  }

  const isCustomer = conversation.customerId.toString() === usedId.toString();

  const isAdmin =
    conversation.adminId &&
    conversation.adminId.toString() === userId.toString();

  const isAdminUser = req.user.role === contants.ADMIN;

  if (!isCustomer && !isAdmin && !isAdminUser) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this conversation",
    });
  }

  const messages = await Message.find({ conversationId })
    .populate("senderId", "name email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    data: messages,
  });
});

export const markMessagesAsRead = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id;

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return res.status(404).json({
      success: false,
      message: "Conversation not found",
    });
  }

  const isCustomer = conversation.customerId.toString() === userId.toString();

  const isAdmin =
    conversation.adminId &&
    conversation.adminId.toString() === userId.toString();

  const isAdminUser = req.user.role === contants.ADMIN;

  if (!isCustomer && !isAdmin && !isAdminUser) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this conversation",
    });
  }
  await Message.updateMany(
    {
      conversationId,
      senderId: { $ne: userId },
      isRead: false,
    },
    {
      $set: {
        isRead: true,
        readAt: new Date(),
      },
    },
  );

  conversation.unreadCount = 0;

  await conversation.save();

  return res.status(200).json({
    success: true,
    message: "Messages marked as read",
  });
});
