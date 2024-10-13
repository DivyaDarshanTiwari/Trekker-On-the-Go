const express = require("express");
const router = express.Router();
const Driver = require("../models/trekker");
const { broadcastMessage } = require("../services/notificationService");

router.post("/sign_up", async (req, res) => {
  const {
    name,
    driverID,
    driverEmail,
    phoneNo,
    password,
    LicensePlate,
    maxCapacity,
    role,
  } = req.body;

  console.log(req.body);

  try {
    // Check if all required fields are provided (phoneNo is optional)
    if (
      !name ||
      !driverID ||
      !driverEmail ||
      !phoneNo ||
      !password ||
      !LicensePlate ||
      !maxCapacity ||
      !role
    ) {
      res.status(400).json({ msg: "Please fill all required fields" });
    }
    const existingDriver = await Driver.findOne({ driverEmail: driverEmail });
    console.log(existingDriver);
    if (existingDriver) {
      return res
        .status(400)
        .json({ msg: "Driver with this email already exists" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newDriver = new Driver({
      name,
      driverID,
      driverEmail,
      phoneNo,
      password: encryptedPassword,
      LicensePlate,
      maxCapacity,
      role,
    });
    await newDriver.save();
    res.status(201).json({ msg: "Driver registered successfully" });
  } catch (error) {
    // Log the error and return server error response
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/on-move", (req, res) => {
  const id = req.driverId;
  broadcastMessage("A driver is on the move", id);
  res.json({ msg: "message broadcasted" });
});

module.exports = router;
