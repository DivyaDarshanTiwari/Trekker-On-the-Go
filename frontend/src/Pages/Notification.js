import React, { useEffect, useState } from "react";
import "../CSS/Notification.css"; // Make sure to include the CSS

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        if (notification.message && notification.date) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            notification,
          ]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notif, index) => (
          <div className="notification" key={index}>
            <p>{notif.message}</p>
            <small>{new Date(notif.date).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
