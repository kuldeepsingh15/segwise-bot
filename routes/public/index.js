const express = require("express");
const app = express.Router();

const slackRoutes = require("./slack");

app.use("/slack", slackRoutes)

module.exports = app