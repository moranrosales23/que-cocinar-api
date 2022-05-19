const express = require("express");
const { Recipe } = require("../controllers");
const api = express.Router();

api.get("/", Recipe.all);
api.get("/:id", Recipe.find);

module.exports = api;
