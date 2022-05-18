const User = require("../models/user");
const Recipe = require("../models/recipe");
const Message = require("../utils/message");

const existRecipeInFavorites = ({ favorites }, id_recipe) =>
  favorites.filter(({ recipe }) => recipe === id_recipe).length > 0;

const setFavorite = async ({ recipe, _user_id }) => {
  const user = await User.findById(_user_id);
  if (!user) return Message.notFound("User not found");
  if (existRecipeInFavorites(user, recipe))
    return Message.error("The recipe is already in favorites");
  user.favorites.push({ recipe });
  await user.save();
  return Message.success();
};

const all = async ({ page = 1, limit = 10 }) => {
  const recipes = await Recipe.find({}, "_id name category img rate").paginate({
    page,
    limit,
  });

  return recipes;
};

module.exports = { setFavorite, all };
