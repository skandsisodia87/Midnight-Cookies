import { useEffect } from "react";

const useConversationSocket = (socket, setMessages) => {
  useEffect(() => {
    if (!socket) return;

    const handleConversationJoined = (data) => {
      console.log("Conversation joined:", data);

      setMessages((prev) => [
        ...prev,
        `Joined conversation: ${data.conversationId}`,
      ]);
    };

    const handleUserJoined = (data) => {
      console.log("User joined:", data);

      setMessages((prev) => [
        ...prev,
        `User ${data.userId} joined the conversation`,
      ]);
    };

    const handleUserLeft = (data) => {
      console.log("User left:", data);

      setMessages((prev) => [
        ...prev,
        `User ${data.userId} left the conversation`,
      ]);
    };

    const handleChatError = (data) => {
      console.error("Chat error:", data);

      setMessages((prev) => [...prev, `Error: ${data.message}`]);
    };

    socket.on("conversation_joined", handleConversationJoined);
    socket.on("user_joined_conversation", handleUserJoined);
    socket.on("user_left_conversation", handleUserLeft);
    socket.on("chat_error", handleChatError);

    return () => {
      socket.off("conversation_joined", handleConversationJoined);
      socket.off("user_joined_conversation", handleUserJoined);
      socket.off("user_left_conversation", handleUserLeft);
      socket.off("chat_error", handleChatError);
    };
  }, [socket, setMessages]);
};

export default useConversationSocket;
