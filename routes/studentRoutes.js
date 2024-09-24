const express = require("express");
const router = express.Router();
const Passenger = require('../models/student');

router.post('/sign_up', async (req, res) => {
  const { name, studentID, passangerEmail, phoneNo, password } = req.body;

  console.log(name,studentID,passangerEmail,phoneNo,password);

  try {
    // Check if all required fields are provided (phoneNo is optional)
    if(!name || !studentID || !passangerEmail || !phoneNo || !password) {
      return res.status(400).json({msg:"Please fill all required fields"});
    }
    const existingPassenger = await Passenger.findOne({passengerEmail:passangerEmail});
    console.log(existingPassenger);
    if(existingPassenger) {
      return res.status(400).json({msg:"Passenger with this email already exists"});
    }
    const newPassenger = new Passenger({
      name,
      studentID,
      passangerEmail,
      phoneNo,
      password
    })
    console.log(newPassenger);
    await newPassenger.save();
    res.status(201).json({msg:"Passenger registered successfully"});
  } catch (error) {
    // Log the error and return server error response
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
