import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { parseCookie } from "cookie";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import constants from "../constants/constants.js";
import { saveConversationMessage } from "../services/chat.service.js";

const chatSocket = (io) => {
  io.use((socket, next) => {
    try {
      const cookieHeader = socket.handshake.headers.cookie;

      if (!cookieHeader) {
        return next(new Error("Authentication required"));
      }

      const cookies = parseCookie(cookieHeader);
      const token = cookies.accessToken;

      if (!token) {
        return next(new Error("Authentication token not found"));
      }

      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;

      next();
    } catch (error) {
      console.error("Socket authentication error:", error.message);
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user._id;
    const userRole = socket.user.role;

    console.log(`Socket connected ${socket.id} | User: ${userId}`);

    socket.on(constants.JOIN_CONVERSATION, async (conversationId) => {
      try {
        if (!conversationId) {
          return socket.emit(constants.CHAT_ERROR, {
            message: "Conversation ID is required",
          });
        }
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
          return socket.emit(constants.CHAT_ERROR, {
            message: "Conversation not found",
          });
        }

        const isCustomer =
          conversation.customerId?.toString() === userId.toString();

        const isAssignedAdmin =
          conversation.adminId?.toString() === userId.toString();

        const isAdmin = userRole === constants.ADMIN;

        // Customer can only join their own conversation.
        // Assigned admin can join their conversation.
        // Admin can join any conversation.
        if (!isCustomer && !isAssignedAdmin && !isAdmin) {
          return socket.emit(constants.CHAT_ERROR, {
            message: "You are not allowed to join this conversation",
          });
        }

        const room = `${constants.CONVERSATION}:${conversationId}`;

        socket.join(room);

        // Store currently joined conversation
        socket.conversationId = conversationId;

        console.log(`${userId} joined ${room}`);

        socket.emit(constants.CONVERSATION_JOINED, {
          conversationId,
          room,
        });

        // Notify other participants
        socket.to(room).emit(constants.USER_JOINED_CONVERSARION, {
          conversationId,
          userId,
        });
      } catch (error) {
        console.error("Join conversation error:", error);

        socket.emit(constants.CHAT_ERROR, {
          message: "Unable to join conversation",
        });
      }
    });

    socket.on(constants.LEAVE_CONVERSATION, (conversationId) => {
      if (!conversationId) {
        return;
      }
      const room = `${constants.CONVERSATION}:${conversationId}`;

      socket.leave(room);

      if (socket.conversationId === conversationId) {
        socket.conversationId = null;
      }

      console.log(`${userId} left ${room}`);

      socket.to(room).emit(constants.USER_LEFT_CONVERSARION, {
        conversationId,
        userId,
      });
    });

    socket.on(constants.SEND_MESSAGE, async (data) => {
      try {
        const { conversationId, message, messageType, attachments } =
          data || {};

        if (!conversationId) {
          return socket.emit(constants.CHAT_ERROR, {
            message: "Conversation ID is required",
          });
        }

        const savedMessage = await saveConversationMessage({
          conversationId,
          senderId: userId,
          message,
          messageType,
          attachments,
        });

        const room = `${constants.CONVERSATION}:${conversationId}`;

        io.to(room).emit(constants.NEW_MESSAGE, savedMessage);
      } catch (error) {
        console.error("Send message error:", error);

        socket.emit(constants.CHAT_ERROR, {
          message: error.message || "Unable to send message",
        });
      }
    });

    socket.on(constants.TYPING, ({ conversationId }) => {
      if (!conversationId) {
        return;
      }

      console.log("typing message...");

      // const room = `${constants.CONVERSATION}:${conversationId}`;
      // socket.to(room).emit("user_typing", {
      //   conversationId,
      //   userId,
      // });
    });

    socket.on(constants.STOP_TYPING, ({ conversationId }) => {
      if (!conversationId) {
        return;
      }

      console.log("stop typing");

      const room = `${constants.CONVERSATION}:${conversationId}`;
      socket.to(room).emit("user_stop_typing", {
        conversationId,
        userId,
      });
    });

    socket.on(constants.JOIN_ONLINE, () => {
      socket.broadcast.emit("user_online", {
        userId,
      });
    });

    socket.on(constants.DISCONNECT, (reason) => {
      console.log(`Socket disconnected: ${socket.id}`);
      console.log(`Reason: ${reason}`);
      socket.broadcast.emit("user_offline", {
        userId,
      });
    });
  });
};

export default chatSocket;
