require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connect = require("./database");
const employeesRouter = require("./controllers/employees");
const app = express();
const port = 3000;

connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(employeesRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
