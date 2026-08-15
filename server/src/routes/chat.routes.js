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
import contants from "../constants/constants.js";

const router = Router();

router.use(verifyToken);

router.post(
  "/conversations",
  validateUserRole(contants.USER),
  createConversation,
);

router.get(
  "/conversations/my",
  validateUserRole(contants.USER),
  getMyConversation,
);

router.get(
  "/conversations",
  validateUserRole(contants.ADMIN),
  getAllConversations,
);

router.get(
  "/conversations/:id",
  validateUserRole(contants.USER, contants.ADMIN),
  validateObjectId(),
  getConversationById,
);

router.patch(
  "/conversations/:id/assign",
  validateUserRole(contants.ADMIN),
  validateObjectId(),
  assignConversation,
);

router.patch("/conversations/:id/close", validateObjectId(), closeConversation);

router.post(
  "/conversations/:conversationId/messages",
  validateUserRole(contants.USER, contants.ADMIN),
  validateObjectId("conversationId"),
  createMessage,
);

router.get(
  "/conversations/:conversationId/messages",
  validateUserRole(contants.USER, contants.ADMIN),
  validateObjectId("conversationId"),
  getConversationMessages,
);

router.patch(
  "/conversations/:conversationId/messages/read",
  validateUserRole(contants.USER, contants.ADMIN),
  validateObjectId("conversationId"),
  markMessagesAsRead,
);

export default router;
