const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");
<<<<<<< HEAD
const TekkerLinkedList_At_College = require("../LinkedList/TrekkerList");
const TekkerLinkedList_towards_college = require("../LinkedList/TrekkerList");
const TekkerLinkedList_from_college = require("../LinkedList/TrekkerList");
=======
>>>>>>> 9cb707525621177d9a3e1a37987de967ecffdb50

router.post("/trekker-go-up", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move towards the college", id);
  res.json({
    msg: "Message broadcasted: Driver is on the move towards the college",
  });
});

router.post("/reached-college", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver has reached the college", id);
  res.json({ msg: "Message broadcasted: Driver has reached the college" });
});

router.post("/trekker-go-down", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move from the college", id);
  res.json({
    msg: "Message broadcasted: Driver is on the move from the college",
  });
});

module.exports = router;
