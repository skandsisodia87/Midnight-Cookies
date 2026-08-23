import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import constants from "../common/constants";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("connecting");
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { withCredentials: true });

    setSocket(newSocket);

    newSocket.on(constants.CONNECT, () => {
      console.log("Socket connected: ", newSocket.id);

      setStatus(constants.CONNECTED);
      setSocketId(newSocket.id);
    });

    newSocket.on(constants.DISCONNECT, (reason) => {
      console.log("Socket disconnected: ", reason);

      setStatus(constants.DISCONNECTED);
      setSocketId("");
    });

    newSocket.on(constants.CONNECT_ERROR, (error) => {
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
