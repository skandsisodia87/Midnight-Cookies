import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import constants from "../constants/constants.js";

export const saveConversationMessage = async ({
  conversationId,
  senderId,
  userRole = constants.USER,
  message,
  messageType = constants.TEXT,
  attachments = [],
}) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  if (conversation.status === constants.CLOSED) {
    throw new Error("This conversation is closed");
  }

  const isCustomer =
    conversation.customerId?.toString() === senderId.toString();

  const isAssignedAdmin =
    conversation.adminId?.toString() === senderId.toString();

  let isAdmin = userRole === constants.ADMIN;
  if (!isAdmin && !isCustomer && !isAssignedAdmin) {
    const senderUser = await User.findById(senderId).select("role");
    if (senderUser?.role === constants.ADMIN) {
      isAdmin = true;
    }
  }

  if (!isCustomer && !isAssignedAdmin && !isAdmin) {
    throw new Error("You are not a participant of this conversation");
  }

  // If an admin sends a message to an unassigned conversation, assign it to them
  if (isAdmin && !conversation.adminId) {
    conversation.adminId = senderId;
  }

  if (
    messageType === constants.TEXT &&
    !message?.trim() &&
    attachments.length === 0
  ) {
    throw new Error("Message or attachment is required");
  }

  const newMessage = await Message.create({
    conversationId,
    senderId,
    senderRole: isAdmin ? constants.ADMIN : constants.USER,
    message: message?.trim() || "",
    messageType,
    attachments,
  });

  conversation.lastMessage = message?.trim() || "Attachment";

  conversation.lastMessageAt = new Date();

  if (isAdmin) conversation.customerUnreadCount += 1;
  else conversation.adminUnreadCount += 1;

  await conversation.save();

  const populatedMessage = await Message.findById(newMessage._id).populate(
    "senderId",
    "name email",
  );

  return populatedMessage;
};
