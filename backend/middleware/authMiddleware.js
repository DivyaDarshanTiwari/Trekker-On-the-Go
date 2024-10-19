const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided");
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

const passagerRoleVerify = (req, res, next) => {
  try {
    const { role } = req.body;
    if (role.toLowerCase() === "passenger") {
      console.log("Passenger logged in");
      next();
    } else {
      return res.status(400).json({ msg: "Only passenger are authorized" });
    }
  } catch (err) {
    console.log("Some error in the passenger role \n" + err);
  }
};

const driverRoleVerify = (req, res, next) => {
  try {
    const { role } = req.body;
    if (role.toLowerCase() === "driver") {
      console.log("Passenger logged in");
      next();
    } else {
      return res.status(400).json({ msg: "Only driver are authorized" });
    }
  } catch (err) {
    console.log("Some error in the driver role \n" + err);
  }
};

module.exports = { authenticateToken, passagerRoleVerify, driverRoleVerify };
