const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: String,
  studentID: String,
  passangerEmail: String,
  phoneNo: Number,
  password: String,
  role: String,
});

module.exports = mongoose.model("Passenger_Data", studentSchema);
