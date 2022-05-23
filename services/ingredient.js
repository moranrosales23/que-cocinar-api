const User = require("../models/user");
const Message = require("../utils/message");

const existIngredient = (ingredients, ingredient) =>
  ingredients.filter(({ description }) => {
    console.log(description, ingredient);
    if (!description) return false;
    return description.toLowerCase() === ingredient.toLowerCase();
  }).length > 0;

const add = async ({ description: ingredient, _user_id }) => {
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

const edit = async (_id, { ingredient, _user_id }) => {
  const user = await User.findById(_user_id);
  if (!user) return Message.notFound("User not found");
  user.ingredients = user.ingredients.map((ingredients) => {
    if (ingredients._id == _id) {
      ingredients.description = ingredient;
    }
    return ingredients;
  });
  await user.save();
  return Message.success(user.ingredients, "The ingredient has been updated");
};

const remove = async (_id, { _user_id }) => {
  const user = await User.findById(_user_id);
  if (!user) return Message.notFound("User not found");
  user.ingredients = user.ingredients.filter(
    (ingredients) => ingredients._id != _id
  );
  await user.save();
  return Message.success(user.ingredients, "The ingredient has been deleted");
};

module.exports = { add, edit, remove };
