const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const studentSchema = mongoose.Schema({
  UID: ObjectId,
  name: String,
  ID: String,
  Email: String,
  phoneNo: Number,
  password: String,
  role: String,
});

module.exports = mongoose.model("Passenger_Data", studentSchema);
