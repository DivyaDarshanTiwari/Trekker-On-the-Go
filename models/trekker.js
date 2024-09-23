const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  driverID: String,
  driverEmail: String,
  phoneNo: Number,
  password: String,
  LicensePlate: String,
  maxCapacity: Number,
});

module.exports = mongoose.model("Driver_Data", driverSchema);
