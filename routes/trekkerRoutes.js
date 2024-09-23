const express = require("express");
const router = express.Router();
const Driver = require('../models/trekker');

router.post("/driver_sign_up", async (req, res) => {
  const {driverName, driverID, driverEmail, phoneNo, password, LicensePlate, maxCapacity} = req.body;

  try {
    // Check if all required fields are provided (phoneNo is optional)
    if (!driverName || !driverID || !driverEmail || !phoneNo || !password || !LicensePlate || !maxCapacity) {
      res
        .status(400)
        .json({ msg: "Please fill all required fields" });
    }
    const existingDriver = await Driver.findOne({driverEmail});
    if(existingDriver) {
      return res.status(400).json({msg:"Passenger with this email already exists"});
    }
    const newDriver = new Passenger({
      _id: new mongoose.Types.ObjectId(),  // Manually assign an _id (optional)
      drivername,
      driverID,
      driverEmail,
      phoneNo,
      password,
      LicensePlate,
      maxCapacity
    })
    await newDriver.save();
    res.status(201).json({msg:"Passenger registered successfully"});
  } catch (error) {
    // Log the error and return server error response
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
