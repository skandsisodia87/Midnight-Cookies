import "dotenv/config";
import redis from "../config/redis.js";
import constants from "../constants/constants.js";
import connectDB from "../config/db.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const getPendingMessageKeys = async () => {
  const keys = [];
  let cursor = "0";

  do {
    const [nextCursor, batchKeys] = await redis.scan(
      cursor,
      "MATCH",
      `${constants.MESSAGE_CACHE_PREFIX}*`,
      "COUNT",
      100,
    );
    cursor = nextCursor;
    keys.push(...batchKeys);
  } while (cursor !== "0");

  return keys;
};

const savePendingMessages = async () => {
  const keys = await getPendingMessageKeys();
  if (!keys.length) return;

  const values = await redis.mget(...keys);
  const pending = values
    .filter(Boolean)
    .map((value) => {
      const message = JSON.parse(value);
      return {
        ...message,
        senderRole:
          message.userRole === constants.ADMIN
            ? constants.ADMIN
            : constants.USER,
      };
    })
    .sort(
      (first, second) => new Date(first.createdAt) - new Date(second.createdAt),
    );

  if (!pending.length) return;

  try {
    await Message.insertMany(pending, { ordered: false });
  } catch (error) {
    if (error.code !== 11000) {
      console.error("MongoDB batch insert error:", error);
      return;
    }
  }

  const savedIds = await Message.countDocuments({
    _id: { $in: pending.map((message) => message._id) },
  });

  if (savedIds !== pending.length) return;

  const conversationUpdates = new Map();
  for (const message of pending) {
    const conversationId = String(message.conversationId);
    const current = conversationUpdates.get(conversationId) || {
      lastMessage: message.message || "Attachment",
      lastMessageAt: new Date(message.createdAt),
    };

    if (new Date(message.createdAt) >= current.lastMessageAt) {
      current.lastMessage = message.message || "Attachment";
      current.lastMessageAt = new Date(message.createdAt);
    }

    conversationUpdates.set(conversationId, current);
  }

  await Promise.all(
    [...conversationUpdates].map(async ([conversationId, update]) => {
      const [customerUnreadCount, adminUnreadCount] = await Promise.all([
        Message.countDocuments({
          conversationId,
          senderRole: constants.ADMIN,
          readAt: null,
        }),
        Message.countDocuments({
          conversationId,
          senderRole: constants.USER,
          readAt: null,
        }),
      ]);

      return Conversation.findByIdAndUpdate(conversationId, {
        $set: {
          lastMessage: update.lastMessage,
          lastMessageAt: update.lastMessageAt,
          customerUnreadCount,
          adminUnreadCount,
        },
      });
    }),
  );

  await redis.del(...keys);
  console.log(`Persisted ${pending.length} chat messages`);
};

const startWorker = async () => {
  try {
    await connectDB();
    console.log("Message persistence cron started: every 5 minutes");
    await savePendingMessages();
    setInterval(() => {
      savePendingMessages().catch((error) =>
        console.error("Message persistence cron error:", error),
      );
    }, constants.CLEANUP_INTERVAL_MS);
  } catch (error) {
    console.error("Failed to start message worker:", error);

    process.exit(1);
  }
};

startWorker();
