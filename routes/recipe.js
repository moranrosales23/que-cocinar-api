const express = require("express");
const { Recipe } = require("../controllers");
const api = express.Router();

api.get("/", Recipe.all);
api.get("/:id", Recipe.find);
api.patch("/:id/favorites", Recipe.favorites);
api.patch("/:id/comments", Recipe.addComment);

module.exports = api;
