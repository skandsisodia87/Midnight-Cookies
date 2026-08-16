import { model, Schema } from "mongoose";
import constants from "../constants/constants.js";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    message: {
      type: String,
      trim: true,
      required: true,
    },

    messageType: {
      type: String,
      enum: [constants.TEXT, constants.IMAGE, constants.FILE],
      default: "text",
    },

    attachments: [
      {
        url: String,
        publicId: String,
        fileName: String,
        fileType: String,
      },
    ],

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Message", messageSchema);
