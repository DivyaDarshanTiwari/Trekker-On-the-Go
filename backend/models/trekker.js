const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const driverSchema = mongoose.Schema({
  UID: ObjectId,
  name: String,
  ID: String,
  Email: String,
  phoneNo: Number,
  password: String,
  LicensePlate: String,
  maxCapacity: Number,
  role: String,
});

module.exports = mongoose.model("Driver_Data", driverSchema);
