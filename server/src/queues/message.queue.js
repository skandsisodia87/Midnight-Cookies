import redis from "../config/redis";
import constants from "../constants/constants";

const addMessageToQueue = async (message) => {
  await redis.xadd(
    constants.MESSAGE_STREAM,
    "*",
    "conversationId",
    String(message.conversationId),

    "senderId",
    String(message.senderId),

    "userRole",
    String(message.userRole),

    "message",
    message.message || "",

    "messageType",
    message.messageType || "text",

    "attachments",
    JSON.stringify(message.attachments || []),

    "clientMessageId",
    message.clientMessageId || "",

    "createdAt",
    message.createdAt
      ? new Date(message.createdAt).toISOString()
      : new Date().toISOString(),
  );
};

export default addMessageToQueue;
