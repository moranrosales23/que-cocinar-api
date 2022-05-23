const express = require("express");
const cors = require("cors");
const { User, Recipe, Ingredient } = require("./routes");

const PREFIX = "/api/v1/";

const app = express();

app.use(cors());
app.use(express.json());
app.use(`${PREFIX}auth`, User);
app.use(`${PREFIX}recipe`, Recipe);
app.use(`${PREFIX}ingredient`, Ingredient);

module.exports = app;
