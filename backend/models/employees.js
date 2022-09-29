const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
  name: String,
  annualLeave: { type: Number, default: 21 },
  sickLeave: { type: Number, default: 10 },
});

module.exports = mongoose.model("Employee", EmployeeSchema);