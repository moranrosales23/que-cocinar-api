const express = require("express");
const { User } = require("../controllers");
const api = express.Router();

api.post("/login", User.logIn);
api.post("/register", User.logIn);

module.exports = api;
