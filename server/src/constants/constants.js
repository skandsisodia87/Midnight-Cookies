const constants = {
  APPICATION_NAME: "Midnight Cookies",

  USER: "user",
  ADMIN: "admin",
  PRODUCTION: "production",

  PLACED: "placed",
  CONFIRMED: "confirmed",
  BAKING: "baking",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",

  COD: "COD",
  ONLINE: "ONLINE",

  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",

  IMAGE: "image",
  FILE: "file",
  TEXT: "text",

  FIXED: "fixed",
  PERCENTAGE: "percentage",

  OPEN: "open",
  CLOSED: "closed",

  BATCH_SIZE: 20,
  BLOCK_TIMEOUT: 5000,
  BATCH_TIMEOUT: 1500,
  MESSAGE_RETENTION_MS: 60 * 60 * 1000,
  CLEANUP_INTERVAL_MS: 5 * 60 * 1000,
  MESSAGE_STREAM: "chat:messages",
  CONSUMER_GROUP: "message-workers",
  CONSUMER_NAME: `worker-${process.pid}`,

  USER_NOT_FOUND: "User not found.",
  INVALID_REFRESH_TOKEN: "Invalid refresh token.",
  ORDER_NOT_FOUND: "Order not found.",
  EMAIL_SENDING_FAILED: "Email sending failed.",
  COOKIE_NOT_FOUND: "Cookie not found.",
  IMAGE_NOT_FOUND: "Image not found.",
  CATEGORY_NOT_FOUND: "Category not found.",
  COUPON_NOT_FOUND: "Coupon not found.",
  CUSTOMER_NOT_FOUND: "Customer not found.",
  NAME_REQUIRED: "Name is required.",
  DESCRIPTION_TYPE: "Description must be a string.",

  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CONVERSATION: "conversation",

  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
  CONVERSATION_JOINED: "conversation_joined",
  USER_JOINED_CONVERSATION: "user_joined_conversation",
  USER_LEFT_CONVERSATION: "user_left_conversation",
  NEW_MESSAGE: "new_message",
  CHAT_ERROR: "chat_error",
  USER_TYPING: "user_typing",
  USER_STOP_TYPING: "user_stop_typing",
  STOP_TYPING: "stop_typing",
  SEND_MESSAGE: "send_message",
  LEAVE_CONVERSATION: "leave_conversation",
  JOIN_CONVERSATION: "join_conversation",
  JOIN_ONLINE: "join_online",
  TYPING: "typing",
};

export default constants;
