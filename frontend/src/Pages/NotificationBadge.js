import React from "react";
import { useNotifications } from "../GlobalCompnent/notificationContext";

const NotificationBadge = () => {
  const { unreadCount } = useNotifications();

  return (
    <div className="notification-badge">
      {unreadCount > 0 && `(${unreadCount})`}
    </div>
  );
};

export default NotificationBadge;
