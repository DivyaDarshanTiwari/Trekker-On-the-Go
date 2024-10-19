const bodyParser = require("body-parser");
const express = require("express");
const Passenger = require("./models/student");
const Driver = require("./models/trekker");
const Collective_Data = require("./models/CollectiveDatabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const morgan = require("morgan");

const studentRoute = require("./routes/studentRoutes");
const trekkerRoute = require("./routes/trekkerRoutes");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/sign_up", async (req, res) => {
  const { name, ID, Email, phoneNo, password, role } = req.body;

  try {
    console.log(req.body);

    if (!name || !ID || !Email || !phoneNo || !password || !role) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    const existingPassenger = await Collective_Data.findOne({
      Email,
    });
    if (existingPassenger) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }
    if (role.toLowerCase() === "passenger") {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new Collective_Data({
        name,
        ID,
        Email,
        phoneNo,
        password: encryptedPassword,
        role,
      });
      await newUser.save();
      const newPassenger = new Passenger({
        UID: newUser._id,
        name,
        ID,
        Email,
        phoneNo,
        password: encryptedPassword,
        role,
      });

      await newPassenger.save();
    } else {
      const { LicensePlate, maxCapacity } = req.body;
      if (!LicensePlate || !maxCapacity) {
        return res
          .status(400)
          .json({ msg: "Please fill all required fields if you are driver" });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new Collective_Data({
        name,
        ID,
        Email,
        phoneNo,
        password: encryptedPassword,
        role,
      });
      await newUser.save();
      const newDriver = new Driver({
        UID: newUser._id,
        name,
        ID,
        Email,
        phoneNo,
        password: encryptedPassword,
        LicensePlate,
        maxCapacity,
        role,
      });
      await newDriver.save();
    }
    return res.status(200).json({ msg: "Succesfull registration" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { Email, password } = req.body;
  try {
    const user = await Collective_Data.findOne({ Email });
    if (!user) {
      return res.status(400).send("User does not exist.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }
    const token = jwt.sign(
      { userId: Collective_Data._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});

app.use("/student", studentRoute);
app.use("/driver", trekkerRoute);

module.exports = app;
