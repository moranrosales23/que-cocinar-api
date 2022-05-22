const User = require("../models/user");
const Message = require("../utils/message");

const existIngredient = (ingredients, ingredient) =>
  ingredients.filter(({ description }) => description === ingredient).length >
  0;

const add = async ({ ingredient, _user_id }) => {
  const user = await User.findById(_user_id);
  if (!user) return Message.notFound("User not found");
  if (existIngredient(user.ingredients, ingredient))
    return Message.error("The ingredient already exists");
  user.ingredients.push({ description: ingredient });
  await user.save();
  return Message.success(
    user.ingredients,
    "The ingredient was added successfully"
  );
};

const edit = async ({ _id, ingredient, _user_id }) => {
  const user = await User.findById(_user_id);
  if (!user) return Message.notFound("User not found");
  user.ingredients = user.ingredients.map((ingredients) => {
    if (ingredients._id == _id) {
      ingredients.description = ingredient;
    }
    return ingredients;
  });
  await user.save();
  return Message.success(user, "The user has been updated");
};

const all = async ({ page = 1, limit = 10, _user_id }) => {
  const ingredients = await User.findById(_user_id, "ingredients").paginate({
    page,
    limit,
  });
  return ingredients;
};

module.exports = { all, add, edit };
