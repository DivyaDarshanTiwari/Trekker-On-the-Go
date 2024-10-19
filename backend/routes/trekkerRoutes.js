const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");

router.get("/on-move", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move", id);
  res.json({ msg: "message broadcasted" });
});

module.exports = router;
