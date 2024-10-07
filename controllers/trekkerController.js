const { broadcastMessage } = require("../services/notificationService");

const driverOnTheMove = (req, res) => {
  const driverId = req.user.id; // Assuming you have driver's ID in req.user

  // Update driver's status to "on the move"
  // Your existing logic to update driver's status in the database

  // Create a notification message
  const notification = {
    message: `Driver ${req.user.name} is on the move!`,
    type: "driver-status",
  };

  // Broadcast the message to all except the driver
  broadcastMessage(notification, driverId);

  res
    .status(200)
    .json({
      success: true,
      message: "Notification sent to all passengers and drivers",
    });
};

module.exports = { driverOnTheMove };
