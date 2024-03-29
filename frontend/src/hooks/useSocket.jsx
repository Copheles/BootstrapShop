import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export const useSocket = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  console.log("socket", socket);

  useEffect(() => {
    // Establish Socket.IO connection when the component mounts
    const newSocket = io(URL);

    console.log(newSocket);

    // Set the socket state
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [userInfo]);

  return socket;
};
