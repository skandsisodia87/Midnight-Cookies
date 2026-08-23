import { useEffect } from "react";

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

    socket.on("conversation_joined", handleConversationJoined);
    socket.on("user_joined_conversation", handleUserJoined);
    socket.on("user_left_conversation", handleUserLeft);
    socket.on("new_message", handleNewMessage);
    socket.on("chat_error", handleChatError);
    socket.on("user_typing", handleUserTyping);
    socket.on("user_stop_typing", handleUserStopTyping);

    return () => {
      socket.off("conversation_joined", handleConversationJoined);
      socket.off("user_joined_conversation", handleUserJoined);
      socket.off("user_left_conversation", handleUserLeft);
      socket.off("new_message", handleNewMessage);
      socket.off("chat_error", handleChatError);
      socket.off("user_typing", handleUserTyping);
      socket.off("user_stop_typing", handleUserStopTyping);
    };
  }, [socket, conversationId, setMessages, messageIds]);
};

export default useConversationSocket;
