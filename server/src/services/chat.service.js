import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import constants from "../constants/constants.js";

export const saveConversationMessage = async ({
  conversationId,
  senderId,
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

  if (!isCustomer && !isAssignedAdmin) {
    throw new Error("You are not a participant of this conversation");
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
    message: message?.trim() || "",
    messageType,
    attachments,
  });

  conversation.lastMessage = message?.trim() || "Attachment";

  conversation.lastMessageAt = new Date();

  conversation.unreadCount += 1;

  await conversation.save();

  const populatedMessage = await Message.findById(newMessage._id).populate(
    "senderId",
    "name email",
  );

  return populatedMessage;
};
