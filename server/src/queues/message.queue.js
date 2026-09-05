import redis from "../config/redis.js";
import constants from "../constants/constants.js";

export const getMessageCacheKey = (conversationId, messageId) =>
  `${constants.MESSAGE_CACHE_PREFIX}${conversationId}:${messageId}`;

export const getCachedConversationMessages = async (conversationId) => {
  const keys = [];
  let cursor = "0";
  const pattern = `${constants.MESSAGE_CACHE_PREFIX}${conversationId}:*`;

  do {
    const [nextCursor, batchKeys] = await redis.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      100,
    );
    cursor = nextCursor;
    keys.push(...batchKeys);
  } while (cursor !== "0");

  if (!keys.length) return [];

  const values = await redis.mget(...keys);
  return values.filter(Boolean).map((value) => JSON.parse(value));
};

export const markCachedConversationMessagesAsRead = async (
  conversationId,
  userId,
) => {
  const keys = [];
  let cursor = "0";
  const pattern = `${constants.MESSAGE_CACHE_PREFIX}${conversationId}:*`;

  do {
    const [nextCursor, batchKeys] = await redis.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      100,
    );
    cursor = nextCursor;
    keys.push(...batchKeys);
  } while (cursor !== "0");

  if (!keys.length) return;

  const values = await redis.mget(...keys);
  await Promise.all(
    keys.map(async (key, index) => {
      if (!values[index]) return;

      const message = JSON.parse(values[index]);
      if (String(message.senderId) === String(userId)) return;

      const ttl = await redis.pttl(key);
      message.readAt = new Date().toISOString();
      await redis.set(key, JSON.stringify(message), "PX", Math.max(ttl, 1000));
    }),
  );
};

const addMessageToQueue = async (message) => {
  const messageId = String(message._id);
  const cacheKey = getMessageCacheKey(message.conversationId, messageId);

  await redis.set(
    cacheKey,
    JSON.stringify({
      ...message,
      _id: messageId,
      conversationId: String(message.conversationId),
      senderId: String(message.senderId),
      createdAt: message.createdAt
        ? new Date(message.createdAt).toISOString()
        : new Date().toISOString(),
    }),
    "PX",
    constants.MESSAGE_RETENTION_MS,
  );
};

export default addMessageToQueue;
