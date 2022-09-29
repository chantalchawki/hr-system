const Employee = require("../models/employees");
const express = require("express");
const router = express.Router();

router.post("/employees", async function (req, res) {
  console.log(req.body);
  try {
    if (req.body && req.body.name) {
      const employee = new Employee();
      employee.name = req.body.name;
      await employee.save();
      return res.status(201).json({ message: "Employee created successfully" });
    }
    return res.status(400).json({ message: "Please enter employee name" });
  } catch (err) {
    console.log("Error creating employee", err);
    res.status(500).json({ message: "Error creating employee" });
  }
});

router.get("/employees", async function (req, res) {
  try {
    const employees = await Employee.find({});
    if (employees.length == 0) {
      return res.status(404).json({ message: "No employees were found" });
    }
    res
      .status(200)
      .json({ message: "Employees fetched successfully", data: employees });
  } catch (err) {
    console.log("Error getting employees", err);
    res.status(500).json({ message: "Error getting employees" });
  }
});

router.get("/employees/:id", async function (req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee fetched successfully", data: employee });
  } catch (err) {
    console.log("Error getting employees", err);
    res.status(500).json({ message: "Error getting employees" });
  }
});

router.put("/employees/:id", async function (req, res) {
  try {
    if (!req.body.type) {
      return res
        .status(400)
        .json({ message: "Please select annual or sick leave" });
    }

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (req.body.count <= 0) {
      return res.status(400).json({ message: "Please enter correct count" });
    }

    if (req.body.type == "annual") {
      if (req.body.count > employee.annualLeave) {
        return res
          .status(400)
          .json({ message: "You have exceeded your annual leave limit" });
      }
      employee.annualLeave = employee.annualLeave - req.body.count;
      await employee.save();
      res.status(200).json({ message: "Employee updated", data: employee });
    } else if (req.body.type == "sick") {
      if (req.body.count > employee.sickLeave) {
        return res
          .status(400)
          .json({ message: "You have exceeded your sick leave limit" });
      }
      employee.sickLeave = employee.sickLeave - req.body.count;
      await employee.save();
      res.status(200).json({ message: "Employee updated", data: employee });
    }
  } catch (err) {
    console.log("Error updating employee", err);
    res.status(500).json({ message: "Error updatin employee" });
  }
});

module.exports = router;
