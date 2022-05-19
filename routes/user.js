const express = require("express");
const { User } = require("../controllers");
const api = express.Router();

api.post("/", User.logIn);
api.post("/register", User.create);
api.patch("/user", User.update);

module.exports = api;
