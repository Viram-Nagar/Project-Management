import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export default function useJoinUserRoom(userId) {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (socket && isConnected && userId) {
      socket.emit("join:user", userId);
      console.log(`Joined room : ${userId}`);
    }
  }, [socket, isConnected, userId]);
}
