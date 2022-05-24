const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email address is required."],
    unique: true,
    minLength: 6,
  },
  password: {
    type: String,
    required: [true, "The password is required."],
    minLength: 6,
  },
  name: {
    type: String,
    minLength: 2,
  },
  lastname: {
    type: String,
    minLength: 4,
  },
  nickname: {
    type: String,
    minLength: 2,
  },
  complete_perfil: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: "",
  },
  favorites: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    },
  ],
  ingredients: [
    {
      description: {
        type: String,
        minLength: 2,
      },
    },
  ],
  public_id: {
    type: String,
  },
});

User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRounds);
});

User.post("save", function (error, doc, next) {
  next(error.code === 11000 ? new Error("The email is already in use") : error);
});

User.methods.JWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY_SECRET, {
    expiresIn: process.env.JWT_TIME_EXPIRED,
  });
};

module.exports = mongoose.model("User", User);
