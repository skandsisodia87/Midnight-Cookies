import { Router } from "express";

import verifyToken from "../middleware/auth.middleware.js";

import {
  validateObjectId,
  validateUserRole,
} from "../middleware/validation.middleware.js";

import {
  assignConversation,
  closeConversation,
  createConversation,
  getAllConversations,
  getConversationById,
  getMyConversation,
  createMessage,
  getConversationMessages,
  markMessagesAsRead,
} from "../controllers/chat.controller.js";

const router = Router();

router.use(verifyToken);

router.post("/conversations", validateUserRole("user"), createConversation);

router.get("/conversations/my", validateUserRole("user"), getMyConversation);

router.get("/conversations", validateUserRole("admin"), getAllConversations);

router.get(
  "/conversations/:id",
  validateUserRole("user", "admin"),
  validateObjectId(),
  getConversationById,
);

router.patch(
  "/conversations/:id/assign",
  validateUserRole("admin"),
  validateObjectId(),
  assignConversation,
);

router.patch("/conversations/:id/close", validateObjectId(), closeConversation);

router.post(
  "/conversations/:conversationId/messages",
  validateUserRole("user", "admin"),
  validateObjectId("conversationId"),
  createMessage,
);

router.get(
  "/conversations/:conversationId/messages",
  validateUserRole("user", "admin"),
  validateObjectId("conversationId"),
  getConversationMessages,
);

router.patch(
  "/conversations/:conversationId/messages/read",
  validateUserRole("user", "admin"),
  validateObjectId("conversationId"),
  markMessagesAsRead,
);

export default router;
