const bcrypt = require("bcrypt");
const User = require("../models/user");
const Message = require("../utils/message");
const cloudinary = require("cloudinary").v2;

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

const uploadImage = async function (file, { _user_id }) {
  try {
    if (file === undefined) return Message.notFound("The file does not exist");
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME_APP,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const user = await User.findById(_user_id);
    if (!user) return Message.notFound("User not found");

    const data_img = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "profile" }, (error, result) => {
          if (result) resolve(result);
          else reject(error);
        })
        .end(file.buffer);
    });
    const public_id = user.public_id;
    user.public_id = data_img.public_id;
    user.img = data_img.url;
    await user.save();
    if (public_id !== undefined) {
      await cloudinary.uploader.destroy(public_id);
    }
    return Message.success({ image: user.img }, "The image has been updated");
  } catch (error) {
    return Message.error(error.message);
  }
};

module.exports = { logIn, add, edit, getFavorites, uploadImage };
