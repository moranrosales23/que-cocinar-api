const express = require("express");
const { Recipe } = require("../controllers");
const Auth = require("../middleware/auth");
const api = express.Router();

api.get("/", Auth, Recipe.all);
api.get("/:id", Auth, Recipe.find);
api.patch("/:id/favorites", Auth, Recipe.favorites);
api.patch("/:id/comments", Auth, Recipe.addComment);

module.exports = api;
