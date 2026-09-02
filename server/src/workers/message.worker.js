import redis from "../config/redis.js";
import constants from "../constants/constants.js";
import Message from "../models/message.model.js";

const createConsumerGroup = async () => {
  try {
    await redis.xgroup(
      "CREATE",
      constants.MESSAGE_STREAM,
      constants.CONSUMER_GROUP,
      "0",
      "MKSTREAM",
    );

    console.log("Redis consumer group created");
  } catch (error) {
    if (!error.message.includes("BUSYGROUP")) {
      throw error;
    }

    console.log("Redis consumer group already exists");
  }
};

const parseRedisMessage = (fields) => {
  const data = {};

  for (let i = 0; i < fields.length; i += 2) {
    data[fields[i]] = fields[i + 1];
  }

  return {
    _id: data._id,
    conversationId: data.conversationId,
    senderId: data.senderId,
    userRole: data.userRole,
    message: data.message,
    messageType: data.messageType,
    attachments: JSON.parse(data.attachments || "[]"),
    clientMessageId: data.clientMessageId,
    createdAt: new Date(data.createdAt),
  };
};

const collectBatch = async () => {
  const batch = [];

  const startTime = Date.now();

  while (
    batch.length < constants.BATCH_SIZE &&
    Date.now() - startTime < constants.BATCH_TIMEOUT
  ) {
    const remainingTime = constants.BATCH_TIMEOUT - (Date.now() - startTime);

    if (remainingTime <= 0) {
      break;
    }

    const result = await redis.xreadgroup(
      "GROUP",
      constants.CONSUMER_GROUP,
      constants.CONSUMER_NAME,

      "COUNT",
      constants.BATCH_SIZE - batch.length,

      "BLOCK",
      remainingTime,

      "STREAMS",
      constants.MESSAGE_STREAM,

      ">",
    );

    if (!result) {
      break;
    }

    const [, entries] = result[0];

    if (!entries || !entries.length) {
      break;
    }

    for (const [redisId, fields] of entries) {
      batch.push({
        redisId,
        message: parseRedisMessage(fields),
      });
    }
  }

  return batch;
};

const saveBatch = async (batch) => {
  if (!batch.length) {
    return;
  }

  const messages = batch.map((item) => item.message);

  const redisIds = batch.map((item) => item.redisId);

  console.log(`Saving ${messages.length} messages to DB`);

  try {
    await Message.insertMany(messages, {
      ordered: false,
    });

    console.log(`Successfully saved ${messages.length} messages`);

    await redis.xack(
      constants.MESSAGE_STREAM,
      constants.CONSUMER_GROUP,
      ...redisIds,
    );

    console.log(`Successfully ACKed ${redisIds.length} messages`);
  } catch (error) {
    console.error("MongoDB batch insert error:", error);
  }
};

const processMessages = async () => {
  while (true) {
    try {
      const batch = await collectBatch();

      if (!batch.length) {
        continue;
      }

      console.log(`Batch collected: ${batch.length} messages`);

      await saveBatch(batch);
    } catch (error) {
      console.error("Message worker error:", error);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};

const startWorker = async () => {
  try {
    await createConsumerGroup();

    console.log(`Message worker started: ${constants.CONSUMER_NAME}`);

    await processMessages();
  } catch (error) {
    console.error("Failed to start message worker:", error);

    process.exit(1);
  }
};

startWorker();
