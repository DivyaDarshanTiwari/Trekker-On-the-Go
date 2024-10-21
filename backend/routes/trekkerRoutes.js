const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");

router.get("", async (req, res) => {
  return res.status(200).send("Welcome Driver");
});

router.get("/trekker-go-up", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move towards the college", id);
  res.json({ msg: "message broadcasted" });
});

router.get("/reached-college", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver has reached the college", id);
  res.json({ msg: "message broadcasted" });
});

router.get("/trekker-go-down", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move from the colleger", id);
  res.json({ msg: "message broadcasted" });
});
module.exports = router;
