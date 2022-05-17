const bcrypt = require("bcrypt");
const User = require("../models/user");
const Message = require("../utils/message");

const isEqualPass = (password, current) => bcrypt.compare(password, current);

const logIn = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("password").exec();
  if (!user) return Message.notFound("User o Password incorrect");
  return (await isEqualPass(password, user.password))
    ? Message.success(user.JWT())
    : Message.notFound("User o Password incorrect");
};

const add = ({ email, password }) => User.create({ email, password });

module.exports = { logIn, add };
