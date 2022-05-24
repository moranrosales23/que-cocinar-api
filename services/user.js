const bcrypt = require("bcrypt");
const User = require("../models/user");
const Message = require("../utils/message");

const isEqualPass = (password, current) => bcrypt.compare(password, current);

const logIn = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const { password: pass, _id, ...rest } = user._doc;
  if (!user) return Message.notFound("User o Password incorrect");
  return (await isEqualPass(password, pass))
    ? Message.success({ ...rest, tk: user.JWT() })
    : Message.notFound("User o Password incorrect");
};

const add = ({ email, password }) => User.create({ email, password });

const edit = async ({ name, lastname, nickname, _user_id: _id }) => {
  const user = await User.findOneAndUpdate(
    { _id },
    { name, lastname, nickname, complete_perfil: true },
    { new: true }
  );
  return Message.success(
    { name, lastname, nickname, complete_perfil: true },
    "The user has been updated"
  );
};

const getFavorites = async ({ page = 1, limit = 10, _user_id }) => {
  const favorites = await User.findById(_user_id)
    .populate("favorites.recipe", "_id name category img rate")
    .paginate({
      page,
      limit,
    });
  return favorites;
};

module.exports = { logIn, add, edit, getFavorites };
