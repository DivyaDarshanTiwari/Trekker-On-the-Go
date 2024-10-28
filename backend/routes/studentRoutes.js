const express = require("express");
const router = express.Router();
const Passenger = require("../models/student");
const WaitingList = require("../utils/linkedlist");
const { broadcastMessage } = require("../services/notificationService");

const waitingList = new WaitingList();

router.post("request-trekker", (req, res) => {
  const { name, requestTime } = req.body;
  if (!name || !requestTime) {
    return res.status(400).json({ error: "Details required." });
  }

  waitingList.addPassenger(name, requestTime);
  const message = `${name} has requested a trekker at ${requestTime}`;
  broadcastMessage(message);
  res.status(200).json({ message: "Request received and broadcasted" });
});

module.exports = router;
