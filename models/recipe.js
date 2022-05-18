const mongoose = require("mongoose");
const Paginate = require("../utils/paginate");

const Recipe = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required."],
    minLength: 4,
  },
  category: {
    type: String,
    required: [true, "The category is required."],
    minLength: 2,
  },
  instructions: {
    type: String,
    required: [true, "The instructions is required."],
    minLength: 8,
  },
  img: {
    type: String,
    minLength: 4,
  },
  tags: {
    type: String,
  },
  youtube: {
    type: String,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: [true, "The name of ingredient is required."],
      },
      measure: {
        type: String,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      description: {
        type: String,
      },
    },
  ],
  rate: {
    type: Number,
  },
});

Recipe.plugin(Paginate);
module.exports = mongoose.model("Recipe", Recipe);
