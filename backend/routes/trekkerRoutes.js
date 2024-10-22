const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");

router.get("/trekker-go-up", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move towards the college", id);
  res.json({
    msg: "Message broadcasted: Driver is on the move towards the college",
  });
});

router.get("/reached-college", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver has reached the college", id);
  res.json({ msg: "Message broadcasted: Driver has reached the college" });
});

router.get("/trekker-go-down", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move from the college", id);
  res.json({
    msg: "Message broadcasted: Driver is on the move from the college",
  });
});

module.exports = router;
