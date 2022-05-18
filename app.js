const express = require("express");
const { User, Recipe } = require("./routes");
const PREFIX = "/api/v1/";

const app = express();

app.use(express.json());
app.use(`${PREFIX}auth`, User);
app.use(`${PREFIX}recipe`, Recipe);

module.exports = app;
