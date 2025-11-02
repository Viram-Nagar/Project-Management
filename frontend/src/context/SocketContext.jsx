import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const SocketContext = createContext("");

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      autoConnect: false,
    });

    socketRef.current.connect();

    socketRef.current.on("connect", () => {
      console.log(`New user is connected with id : ${socketRef.current.id}`);
      setIsConnected(true);
    });

    socketRef.current.on("project:removed", ({ projectId, message }) => {
      alert(message);
      console.log(projectId);
      navigate("/projects");
    });

    socketRef.current.on("disconnect", () => {
      console.log(`User with id : ${socketRef.current.id} is disconnected`);
      setIsConnected(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [navigate]);

  const value = { socket: socketRef.current, isConnected };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
