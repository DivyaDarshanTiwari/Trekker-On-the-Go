const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");

module.exports = (trekkerList) => {
  router.post("/trekker-go-up", (req, res) => {
    const id = req.driverId;
    const trekkerId = req.body.trekkerId;
    trekkerList.updateTrekkerStatus(trekkerId, "on the go");
    trekkerList.displayList();
    broadcastMessage("A driver is on the move towards the college", id);
    res.json({
      msg: "Message broadcasted: Driver is on the move towards the college",
    });
  });

  router.post("/reached-college", (req, res) => {
    const id = req.driverId;
    const trekkerId = req.body.trekkerId;
    trekkerList.updateTrekkerStatus(trekkerId, "available");
    trekkerList.displayList();
    broadcastMessage("A driver has reached the college", id);
    res.json({ msg: "Message broadcasted: Driver has reached the college" });
  });

  return router;
};
