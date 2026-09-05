import constants from "../constants/constants.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { saveConversationMessage } from "../services/chat.service.js";
import {
  getCachedConversationMessages,
  markCachedConversationMessagesAsRead,
} from "../queues/message.queue.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createConversation = asyncHandler(async (req, res) => {
  const customerId = req.user._id;

  let conversation = await Conversation.findOne({
    customerId,
    status: constants.OPEN,
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
    status: constants.OPEN,
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
    status: constants.OPEN,
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
  const conversations = await Conversation.find({ adminId: { $ne: null } })
    .populate("customerId", "name email")
    .sort({ lastMessageAt: -1, createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Conversations fetched successfully",
    conversations,
  });
});

export const getUnassignConversation = asyncHandler(async (_, res) => {
  const conversations = await Conversation.find({
    adminId: null,
    status: "open",
  })
    .populate("customerId", "name email")
    .select("lastMessageAt adminUnreadCount")
    .sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    message: "Conversations fetched successfully",
    conversations,
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

  if (conversation.status === constants.CLOSED) {
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

  if (conversation.status === constants.CLOSED) {
    return res.status(400).json({
      success: false,
      message: "Conversation is already closed",
    });
  }

  conversation.status = constants.CLOSED;

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

  const populatedMessage = await saveConversationMessage({
    conversationId,
    senderId,
    userRole: req.user.role,
    message,
    messageType,
    attachments,
  });

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

  const isCustomer = conversation.customerId?.toString() === userId.toString();

  const isAssignedAdmin =
    conversation.adminId?.toString() === userId.toString();

  const isAdminUser = req.user.role === constants.ADMIN;

  if (!isCustomer && !isAssignedAdmin && !isAdminUser) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this conversation",
    });
  }

  const messages = await Message.find({
    conversationId,
  })
    .populate("senderId", "name email")
    .sort({ createdAt: 1 });

  const cachedMessages = await getCachedConversationMessages(conversationId);
  const databaseMessageIds = new Set(
    messages.map((message) => message._id.toString()),
  );
  const missingCachedMessages = cachedMessages.filter(
    (message) => !databaseMessageIds.has(String(message._id)),
  );
  const senderIds = [
    ...new Set(
      missingCachedMessages.map((message) => String(message.senderId)),
    ),
  ];
  const senders = await User.find({ _id: { $in: senderIds } }).select(
    "name email",
  );
  const senderMap = new Map(
    senders.map((sender) => [sender._id.toString(), sender]),
  );
  const cachedMessagesWithSenders = missingCachedMessages.map((message) => ({
    ...message,
    senderId: senderMap.get(String(message.senderId)) || message.senderId,
  }));

  return res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    data: [...messages, ...cachedMessagesWithSenders].sort(
      (first, second) => new Date(first.createdAt) - new Date(second.createdAt),
    ),
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

  const isAdminUser = req.user.role === constants.ADMIN;

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
      readAt: null,
    },
    {
      $set: {
        readAt: new Date(),
      },
    },
  );
  await markCachedConversationMessagesAsRead(conversationId, userId);

  const isAdminReader = isAdmin || req.user.role === constants.ADMIN;
  if (isAdminReader) {
    conversation.adminLastReadAt = new Date();
    conversation.adminUnreadCount = 0;
  } else {
    conversation.customerLastReadAt = new Date();
    conversation.customerUnreadCount = 0;
  }

  await conversation.save();

  return res.status(200).json({
    success: true,
    message: "Messages marked as read",
  });
});
