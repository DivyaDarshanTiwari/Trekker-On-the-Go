import React, { useEffect } from "react";
import { useNotifications } from "../GlobalCompnent/notificationContext";
import "../CSS/Notification.css"; // Make sure to include the CSS

const Notifications = () => {
  const { notifications, markAllAsRead } = useNotifications();

  useEffect(() => {
    markAllAsRead(); // Reset unread count when viewing notifications
  }, [markAllAsRead]);

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
