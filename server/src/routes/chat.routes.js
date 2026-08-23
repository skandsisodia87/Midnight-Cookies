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
  getUnassignConversation,
} from "../controllers/chat.controller.js";
import constants from "../constants/constants.js";

const router = Router();

router.use(verifyToken);

router.post(
  "/conversations",
  validateUserRole(constants.USER),
  createConversation,
);

router.get(
  "/conversations/my",
  validateUserRole(constants.USER),
  getMyConversation,
);

router.get(
  "/conversations",
  validateUserRole(constants.ADMIN),
  getAllConversations,
);

router.get(
  "/conversations/:id",
  validateUserRole(constants.USER, constants.ADMIN),
  validateObjectId(),
  getConversationById,
);

router.get(
  "/conversations-unassign",
  validateUserRole(constants.ADMIN),
  getUnassignConversation,
);

router.patch(
  "/conversations/:id/assign",
  validateUserRole(constants.ADMIN),
  validateObjectId(),
  assignConversation,
);

router.patch("/conversations/:id/close", validateObjectId(), closeConversation);

router.post(
  "/conversations/:conversationId/messages",
  validateUserRole(constants.USER, constants.ADMIN),
  validateObjectId("conversationId"),
  createMessage,
);

router.get(
  "/conversations/:conversationId/messages",
  validateUserRole(constants.USER, constants.ADMIN),
  validateObjectId("conversationId"),
  getConversationMessages,
);

router.patch(
  "/conversations/:conversationId/messages/read",
  validateUserRole(constants.USER, constants.ADMIN),
  validateObjectId("conversationId"),
  markMessagesAsRead,
);

export default router;
