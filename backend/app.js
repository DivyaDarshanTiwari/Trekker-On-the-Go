const bodyParser = require("body-parser");
const express = require("express");
const Passenger = require("./models/student");
const Driver = require("./models/trekker");
const Collective_Data = require("./models/CollectiveDatabase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const {
  authenticateToken,
  passagerRoleVerify,
  driverRoleVerify,
} = require("./middleware/authMiddleware");

const app = express();
const morgan = require("morgan");

const studentRoute = require("./routes/studentRoutes");
const trekkerRoute = require("./routes/trekkerRoutes");
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
};

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.post("/sign_up", async (req, res) => {
  const { name, ID, Email, phoneNo, password, role } = req.body;

  try {
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
        SAP_DL_ID: ID,
        Email,
        phoneNo,
        password: encryptedPassword,
        role,
      });
      console.log(newUser);
      await newUser.save();
      const newPassenger = new Passenger({
        UID: newUser._id,
        name,
        SAP_DL_ID: ID,
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
        SAP_DL_ID: ID,
        Email,
        phoneNo,
        password: encryptedPassword,
        role,
      });
      await newUser.save();
      const newDriver = new Driver({
        UID: newUser._id,
        name,
        SAP_DL_ID: ID,
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
  console.log(req.body);
  try {
    let user = await Collective_Data.findOne({ Email });
    console.log("user dATA" + user);
    if (!user) {
      return res.status(400).send("User does not exist.");
    }
    console.log("1");

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("2" + isMatch);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }
    console.log("3");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("4");

    if (user.role.toLowerCase() === "driver") {
      user = await Driver.findOne({ Email });
    }

    res.status(200).json({ token: token, role: user.role, data: user });
  } catch (err) {
    console.log(err);
  }
});

app.use("/passenger", authenticateToken, passagerRoleVerify, studentRoute);
app.use("/driver", authenticateToken, driverRoleVerify, trekkerRoute);

module.exports = app;
