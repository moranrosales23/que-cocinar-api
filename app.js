const express = require("express");
const { User } = require("./routes");
const app = express();

app.use(express.json());
app.use("/api/v1/auth", User);

module.exports = app;
