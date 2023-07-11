const express = require("express");
const app = express.Router();

const routineRoutes = require("./routines");

app.use("/routines", routineRoutes)

module.exports = app