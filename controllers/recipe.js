const { Recipe } = require("../services/");

const all = async (req, res) => {
  try {
    const data = await Recipe.all(req.query);
    res.status(200).send(data);
  } catch (error) {
    const err = error.message;
    res.status(400).send({ err });
  }
};

const find = async (req, res) => {
  try {
    const { code, message, data } = await Recipe.find(req.params.id);
    res.status(code).send({ message, data });
  } catch (error) {
    res.status(400).send({ message: "The Recipe not exist", error });
  }
};

const favorites = async (req, res) => {
  try {
    const { code, message, data } = await Recipe.setFavorite(
      req.params.id,
      req.body
    );
    res.status(code).send({ message, data });
  } catch (error) {
    const err = error.message;
    res.status(400).send({ message: "Error", err });
  }
};

const addComment = async (req, res) => {
  try {
    const { code, message, data } = await Recipe.addComment(
      req.params.id,
      req.body
    );
    res.status(201).send({ message, data });
  } catch (error) {
    const err = error.message || error;
    res
      .status(400)
      .send({ message: "Comment couldn't be created", error: err });
  }
};

module.exports = { all, find, favorites, addComment };
