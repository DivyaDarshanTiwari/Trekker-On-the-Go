const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  name: String,
  driverID: String,
  driverEmail: String,
  phoneNo: Number,
  password: String,
  LicensePlate: String,
  maxCapacity: Number,
  role: String,
});

module.exports = mongoose.model("Driver_Data", driverSchema);
