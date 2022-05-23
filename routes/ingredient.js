const express = require("express");
const { Ingredient } = require("../controllers");
const Auth = require("../middleware/auth");
const api = express.Router();

api.post("/", Auth, Ingredient.create);
api.put("/:id", Auth, Ingredient.update);

module.exports = api;
