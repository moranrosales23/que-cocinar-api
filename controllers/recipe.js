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
    res.status(400).send({ message: "Fav couldn't be created ", error });
  }
};

module.exports = { all, find };
