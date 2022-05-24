const express = require("express");
const { User } = require("../controllers");
const api = express.Router();
const Auth = require("../middleware/auth");
const Multer = require("../middleware/multer");
console.log(Multer);
api.post("/", User.logIn);
api.post("/register", User.create);
api.patch("/user", Auth, User.update);
api.post("/user/img", Auth, Multer.single("image"), User.image);

module.exports = api;
