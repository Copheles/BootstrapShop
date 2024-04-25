import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      const socket = io(URL, {
        query: {
          username: userInfo.name,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
