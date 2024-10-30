const express = require("express");
const router = express.Router();
const Passenger = require("../models/student");
const { broadcastMessage } = require("../services/notificationService");

module.exports = (studentSet) => {
  router.post("/request-trekker", (req, res) => {
    const { Id, name, requestTime } = req.body;
    console.log(Id);
    studentSet.add(Id);
    if (!name || !requestTime) {
      return res.status(400).json({ error: "Details required." });
    }

    const message = `${name} has requested a trekker at ${requestTime}`;
    broadcastMessage(message);
    res.status(200).json({ message: "Request received and broadcasted" });
  });

  return router;
};
