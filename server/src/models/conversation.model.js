import { Schema, model } from "mongoose";
import constants from "../constants/constants.js";

const conversationSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: [constants.OPEN, constants.CLOSED],
      default: constants.OPEN,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    customerUnreadCount: {
      type: Number,
      default: 0,
    },

    adminUnreadCount: {
      type: Number,
      default: 0,
    },

    customerLastReadAt: {
      type: Date,
      default: null,
    },

    adminLastReadAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Conversation", conversationSchema);
