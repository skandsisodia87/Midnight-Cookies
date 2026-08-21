import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Connecting");
  const [socketId, setSocketId] = useState("");

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

      setStatus(`Connection error: ${error.message}`);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return {
    socket,
    status,
    socketId,
  };
};

export default useSocket;
