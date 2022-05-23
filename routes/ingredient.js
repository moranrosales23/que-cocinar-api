const express = require("express");
const { Ingredient } = require("../controllers");
const Auth = require("../middleware/auth");
const api = express.Router();

api.post("/", Auth, Ingredient.create);
api.patch("/:id", Auth, Ingredient.update);
api.delete("/:id", Auth, Ingredient.remove);

module.exports = api;
