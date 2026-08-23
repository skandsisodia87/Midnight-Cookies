import { useEffect } from "react";
import constants from "../common/constants";

const useConversationSocket = (
  socket,
  conversationId,
  setMessages,
  messageIds,
) => {
  useEffect(() => {
    if (!socket) return;

    const handleUserTyping = (data) => {
      if (
        !conversationId ||
        data?.conversationId?.toString() !== conversationId.toString()
      ) {
        return;
      }

      console.log("Typing message...");
      // setIsOtherUserTyping(true);
    };

    const handleUserStopTyping = (data) => {
      if (
        !conversationId ||
        data?.conversationId?.toString() !== conversationId.toString()
      ) {
        return;
      }

      console.log("Stop Typing");
      // setIsOtherUserTyping(false);
    };

    const handleConversationJoined = (data) => {
      console.log("Conversation joined:", data);
    };

    const handleUserJoined = (data) => {
      console.log("User joined:", data);
    };

    const handleUserLeft = (data) => {
      console.log("User left:", data);
    };

    const handleNewMessage = (incomingMessage) => {
      console.log("New message:", incomingMessage);

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
      if (messageIds.current.has(incomingMessage._id)) {
        return;
      }

      messageIds.current.add(incomingMessage._id);
      setMessages((prev) => [...prev, incomingMessage]);
    };

    const handleChatError = (data) => {
      console.error("Chat error:", data);
    };

    socket.on(constants.CONVERSATION_JOINED, handleConversationJoined);
    socket.on(constants.USER_JOINED_CONVERSARION, handleUserJoined);
    socket.on(constants.USER_LEFT_CONVERSARION, handleUserLeft);
    socket.on(constants.NEW_MESSAGE, handleNewMessage);
    socket.on(constants.CHAT_ERROR, handleChatError);
    socket.on(constants.USER_TYPING, handleUserTyping);
    socket.on(constants.USER_STOP_TYPING, handleUserStopTyping);

    return () => {
      socket.off(constants.CONVERSATION_JOINED, handleConversationJoined);
      socket.off(constants.USER_JOINED_CONVERSARION, handleUserJoined);
      socket.off(constants.USER_LEFT_CONVERSARION, handleUserLeft);
      socket.off(constants.NEW_MESSAGE, handleNewMessage);
      socket.off(constants.CHAT_ERROR, handleChatError);
      socket.off(constants.USER_TYPING, handleUserTyping);
      socket.off(constants.USER_STOP_TYPING, handleUserStopTyping);
    };
  }, [socket, conversationId, setMessages, messageIds]);
};

export default useConversationSocket;
