const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  studentID: String,
  passangerEmail: String,
  phoneNo: Number,
  password: String,
});

module.exports = mongoose.model("Passenger_Data", productSchema);
