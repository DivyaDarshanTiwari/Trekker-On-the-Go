const express = require("express");
const router = express.Router();
const Passenger = require("../models/student");
const bcrypt = require("bcrypt");

router.post("/sign_up", async (req, res) => {
  const { name, studentID, passangerEmail, phoneNo, password, role } = req.body;

  console.log(name, studentID, passangerEmail, phoneNo, password);

  try {
    // Check if all required fields are provided (phoneNo is optional)
    if (
      !name ||
      !studentID ||
      !passangerEmail ||
      !phoneNo ||
      !password ||
      !role
    ) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }
    const existingPassenger = await Passenger.findOne({
      passengerEmail: passangerEmail,
    });
    console.log(existingPassenger);
    if (existingPassenger) {
      return res
        .status(400)
        .json({ msg: "Passenger with this email already exists" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newPassenger = new Passenger({
      name,
      studentID,
      passangerEmail: encryptedPassword,
      phoneNo,
      password,
      role,
    });
    console.log(newPassenger);
    await newPassenger.save();
    res.status(201).json({ msg: "Passenger registered successfully" });
  } catch (error) {
    // Log the error and return server error response
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Passenger.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
