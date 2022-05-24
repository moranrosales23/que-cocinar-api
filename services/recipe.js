const User = require("../models/user");
const Recipe = require("../models/recipe");
const Message = require("../utils/message");

const existRecipeInFavorites = ({ favorites }, id_recipe) =>
  favorites.filter(({ recipe }) => recipe._id == id_recipe).length > 0;

const removeFavorite = ({ favorites }, id_recipe) =>
  favorites.filter(({ recipe }) => recipe._id != id_recipe);

const setFavorite = async (recipe, { _user_id }) => {
  const user = await User.findById(_user_id);
  if (!user) return Message.notFound("User not found");
  if (existRecipeInFavorites(user, recipe))
    user.favorites = removeFavorite(user, recipe);
  else user.favorites.push({ recipe });
  await user.save();
  return Message.success(user.favorites);
};

const all = async ({ page = 1, limit = 10, search = "" }) => {
  const recipes = await Recipe.find(
    { name: { $regex: search, $options: "i" } },
    "_id name category img rate"
  ).paginate({
    page,
    limit,
  });
  return recipes;
};

const find = async (_id) => {
  const recipe = await Recipe.find({ _id }).populate("comments.user");
  return !recipe
    ? Message.notFound("Recipe not found")
    : Message.success(recipe);
};

const addComment = async (
  id_recipe,
  { comment: description, _user_id: user }
) => {
  const recipe = await Recipe.findById(id_recipe);
  if (!recipe) return Message.notFound("Recipe not found");
  recipe.comments.push({ user, description });
  await recipe.save();
  return Message.success(recipe.comments, "The comment was added successfully");
};

module.exports = { setFavorite, all, find, addComment };
