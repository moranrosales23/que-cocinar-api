const express = require("express");
const { User } = require("../controllers");
const api = express.Router();
const Auth = require("../middleware/auth");

api.post("/", User.logIn);
api.post("/register", User.create);
api.patch("/user", Auth, User.update);

module.exports = api;
