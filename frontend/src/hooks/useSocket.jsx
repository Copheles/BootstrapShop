// useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setSocketConnected } from "../slices/authSlice";

const URL =
  process.env.NODE_ENV === "production" ? "https://bootstrapshop.onrender.com" : "http://localhost:5000";

export const useSocket = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const newSocketRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      // Establish socket connection
      newSocketRef.current = io(URL, {
        query: {
          username: userInfo.name,
        },
      });

      // Set the socket connection status
      dispatch(setSocketConnected(true));

      return () => {
        // Close socket connection when component unmounts
        newSocketRef.current.close();
        dispatch(setSocketConnected(false));
      };
    } else {
      // Close socket connection if no user info
      if (newSocketRef.current) {
        newSocketRef.current.close();
        dispatch(setSocketConnected(false));
      }
    }
  }, [userInfo, dispatch]);

  // Function to emit a custom event
  const emitEvent = (eventName, data) => {
    if (newSocketRef.current) {
      newSocketRef.current.emit(eventName, data);
    } else {
      console.error("Socket not initialized.");
    }
  };

  // Function to listen for a specific event
  const listenToEvent = (eventName, callback) => {
    if (newSocketRef.current) {
      newSocketRef.current.on(eventName, callback);
    } else {
      console.error("Socket not initialized.");
    }
  };

    // Cleanup function to remove all event listeners
    const cleanupListeners = () => {
      if (newSocketRef.current) {
        newSocketRef.current.removeAllListeners();
      }
    };

  return { emitEvent, listenToEvent, cleanupListeners };
};
