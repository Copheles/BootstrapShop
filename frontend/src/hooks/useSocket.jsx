import { useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setSocketConnected } from "../slices/authSlice";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000";

let socketInstance = null; // Singleton socket instance

export const useSocket = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initializeSocket = () => {
    if (!socketInstance && userInfo) {

      // Establish socket connection only if not already initialized
      socketInstance = io(URL, {
        query: {
          username: userInfo.name,
        },
        reconnection: true, // Enable reconnection
        reconnectionAttempts: Infinity, // Attempt to reconnect infinitely
      });

      // Set the socket connection status
      dispatch(setSocketConnected(true));

      // Close socket connection and reset instance when the component unmounts
      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
          socketInstance = null;
          dispatch(setSocketConnected(false));
        }
      };
    }
  };

  useEffect(() => {
    const cleanupSocket = initializeSocket(); // Initialize socket and obtain cleanup function

    // Cleanup function returned from initializeSocket will be called on unmount
    return () => {
      if (cleanupSocket) {
        cleanupSocket(); // Call the cleanup function to disconnect the socket
      }
    };
  }, [userInfo]); // Re-run effect if userInfo changes

  // Function to emit a custom event
  const emitEvent = (eventName, data) => {
    if (socketInstance) {
      socketInstance.emit(eventName, data);
    } else {
      console.error("Socket not initialized.");
    }
  };

  // Function to listen for a specific event
  const listenToEvent = (eventName, callback) => {
    if (!socketInstance) {
      initializeSocket(); // Initialize socket if not already initialized
    }
  
    if (socketInstance) {
      socketInstance.on(eventName, callback);
    } else {
      console.error("Socket not initialized.");
    }
  };

  // Cleanup function to remove all event listeners
  const cleanupListeners = () => {
    if (socketInstance) {
      socketInstance.removeAllListeners();
    }
  };

  return { emitEvent, listenToEvent, cleanupListeners };
};
