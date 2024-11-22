const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");

module.exports = (trekkerList, studentSet) => {
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

  router.post("/trekker-go-down", (req, res) => {
    const id = req.driverId;
    const trekkerId = req.body.trekkerId;
    trekkerList.updateTrekkerStatus(trekkerId, "on the go");
    trekkerList.displayList();
    broadcastMessage("A driver is on the move from the college", id);
    res.json({
      msg: "Message broadcasted: Driver is on the move from the college",
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

  //end-point for available trekkers
  router.post("/available-trekkers", (req, res) => {
    const availableTrekkers = trekkerList.getAvailableTrekkers();
    res.json({ availableTrekkers });
  });

  router.post("/available-students", (req, res) => {
    try {
      const availableStudents = studentSet.size();
      res.json({ availableStudents });
    } catch (error) {
      console.log(error);
    }
  });

  //end-point for adding student in trekker
  router.post("/add-student-to-trekker", (req, res) => {
    try {
      const trekkerId = req.body.trekkerId;
      if(!trekkerId) return res.status(400).json({ msg: "Trekker ID not found!" });
      const result = trekkerList.addStudentToTrekker(trekkerId);
      console.log(result);
      if(result.message === "Student added to the trekker successfully!") {
        trekkerList.displayList();
        return res.status(200).json({ msg: result.message });
      }
      res.status(400).json({ msg: result.message });
    } catch(err) {
      console.log(err);
      res.status(500).json({ msg: "An error occurred whiled adding the student" });
    }
  });

  return router;
};
