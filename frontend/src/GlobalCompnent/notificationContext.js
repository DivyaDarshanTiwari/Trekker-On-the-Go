import React, { createContext, useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        if (notification.message && notification.date) {
          setNotifications((prev) => [...prev, notification]);
          setUnreadCount((count) => count + 1); // Increase unread count
          // toast.info(notification.message);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  const markAllAsRead = () => setUnreadCount(0); // Resets unread count

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
