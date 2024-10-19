const express = require("express");
const router = express.Router();
const Passenger = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("", async (req, res) => {
  return res.status(200).send("welcome student");
});
module.exports = router;
