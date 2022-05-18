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

module.exports = { all };
