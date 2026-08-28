import { useEffect, useState } from "react";
import { toast } from "sonner";
import constants from "../common/constants";

const useConversationSocket = (
  socket,
  conversationId,
  setMessages,
  messageIds,
) => {
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  useEffect(() => {
    setIsOtherUserTyping(false);

    if (!socket || !conversationId) return;

    // Join the conversation room
    socket.emit(constants.JOIN_CONVERSATION, conversationId);

    // Re-join if socket reconnects
    const handleConnect = () => {
      console.log("Socket reconnected, joining conversation:", conversationId);
      socket.emit(constants.JOIN_CONVERSATION, conversationId);
    };

    const handleUserTyping = (data) => {
      if (
        !conversationId ||
        data?.conversationId?.toString() !== conversationId.toString()
      ) {
        return;
      }

      console.log("User typing in conversation:", data);
      setIsOtherUserTyping(true);
    };

    const handleUserStopTyping = (data) => {
      if (
        !conversationId ||
        data?.conversationId?.toString() !== conversationId.toString()
      ) {
        return;
      }

      console.log("User stopped typing in conversation:", data);
      setIsOtherUserTyping(false);
    };

    const handleConversationJoined = (data) => {
      console.log("Conversation joined successfully:", data);
    };

    const handleUserJoined = (data) => {
      console.log("User joined conversation:", data);
    };

    const handleUserLeft = (data) => {
      console.log("User left conversation:", data);
    };

    const handleNewMessage = (incomingMessage) => {
      console.log("New message received:", incomingMessage);

      if (!incomingMessage?._id) {
        return;
      }

      if (
        conversationId &&
        incomingMessage.conversationId?.toString() !== conversationId.toString()
      ) {
        return;
      }

      // Prevent duplicate message
      if (messageIds?.current && messageIds.current.has(incomingMessage._id)) {
        return;
      }

      if (messageIds?.current) {
        messageIds.current.add(incomingMessage._id);
      }

      if (setMessages) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === incomingMessage._id)) {
            return prev;
          }
          return [...prev, incomingMessage];
        });
      }
    };

    const handleChatError = (data) => {
      console.error("Chat error from socket:", data);
      if (data?.message) {
        toast.error(data.message);
      }
    };

    socket.on(constants.CONNECT, handleConnect);
    socket.on(constants.CONVERSATION_JOINED, handleConversationJoined);
    socket.on(constants.USER_JOINED_CONVERSATION, handleUserJoined);
    socket.on(constants.USER_LEFT_CONVERSATION, handleUserLeft);
    socket.on(constants.NEW_MESSAGE, handleNewMessage);
    socket.on(constants.CHAT_ERROR, handleChatError);
    socket.on(constants.USER_TYPING, handleUserTyping);
    socket.on(constants.USER_STOP_TYPING, handleUserStopTyping);

    return () => {
      socket.emit(constants.LEAVE_CONVERSATION, conversationId);
      socket.off(constants.CONNECT, handleConnect);
      socket.off(constants.CONVERSATION_JOINED, handleConversationJoined);
      socket.off(constants.USER_JOINED_CONVERSATION, handleUserJoined);
      socket.off(constants.USER_LEFT_CONVERSATION, handleUserLeft);
      socket.off(constants.NEW_MESSAGE, handleNewMessage);
      socket.off(constants.CHAT_ERROR, handleChatError);
      socket.off(constants.USER_TYPING, handleUserTyping);
      socket.off(constants.USER_STOP_TYPING, handleUserStopTyping);
    };
  }, [socket, conversationId, setMessages, messageIds]);

  return { isOtherUserTyping };
};

export default useConversationSocket;
