const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: String,
  SAP_DL_ID: String,
  Email: String,
  phoneNo: Number,
  password: String,
  role: String,
});

module.exports = mongoose.model("Collective_Data", Schema);
