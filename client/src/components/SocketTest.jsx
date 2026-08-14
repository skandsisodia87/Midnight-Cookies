import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

export default function SocketTest() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Disconnected");
  const [socketId, setSocketId] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { withCredentials: true });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected: ", newSocket.id);

      setStatus("Connected");
      setSocketId(newSocket.id);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected: ", reason);

      setStatus("Disconnected");
      setSocketId("");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);

      setStatus("Connection error: ", error.message);
    });

    newSocket.on("conversation_joined", (data) => {
      console.log("Conversation joined: ", data);

      setMessages((prev) => [
        ...prev,
        `Joined conversation: ${data.conversationId}`,
      ]);
    });

    newSocket.on("user_joined_conversation", (data) => {
      console.log("User joined", data);

      setMessages((prev) => [
        ...prev,
        `User ${data.userId} joined the conversation`,
      ]);
    });

    newSocket.on("user_left_conversation", (data) => {
      console.log("User left:", data);

      setMessages((prev) => [
        ...prev,
        `User ${data.userId} left the conversation`,
      ]);
    });

    newSocket.on("chat_error", (data) => {
      console.error("Chat error:", data);

      setMessages((prev) => [...prev, `Error: ${data.message}`]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinConversation = () => {
    if (!socket) {
      return;
    }

    if (!conversationId.trim()) {
      return;
    }

    socket.emit("join_conversation", conversationId.trim());
  };

  const leaveConversation = () => {
    if (!socket) {
      return;
    }

    if (!conversationId.trim()) {
      return;
    }

    socket.emit("leave_conversation", conversationId.trim());

    setMessages((prev) => [...prev, `Left conversation: ${conversationId}`]);
  };
  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">Chat Socket Test</h1>

        <div className="mb-4">
          <p>
            Status: <span className="font-semibold">{status}</span>
          </p>

          {socketId && (
            <p className="mt-1 text-sm text-gray-500">Socket ID: {socketId}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Conversation ID
          </label>

          <input
            type="text"
            value={conversationId}
            onChange={(e) => setConversationId(e.target.value)}
            placeholder="Enter conversation ID"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={joinConversation}
            disabled={status !== "Connected"}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Join Conversation
          </button>

          <button
            type="button"
            onClick={leaveConversation}
            disabled={status !== "Connected"}
            className="rounded-lg bg-gray-200 px-5 py-3 font-medium text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Leave
          </button>
        </div>

        <div className="mt-6 rounded-lg bg-gray-100 p-4">
          <h2 className="mb-3 font-semibold">Socket Events</h2>

          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No events yet</p>
          ) : (
            <div className="space-y-2">
              {messages.map((message, index) => (
                <div key={index} className="rounded bg-white p-3 text-sm">
                  {message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
