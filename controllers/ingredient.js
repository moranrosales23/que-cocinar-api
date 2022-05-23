const { Ingredient } = require("../services/");

const create = async (req, res) => {
  try {
    const { code, message, data } = await Ingredient.add(req.body);
    res.status(code).send({ message, data });
  } catch (error) {
    const err = error.message || error;
    res
      .status(400)
      .send({ message: "Ingredient couldn't be created", error: err });
  }
};

const update = async (req, res) => {
  try {
    const { code, message, data } = await Ingredient.edit(
      req.params.id,
      req.body
    );
    res.status(code).send({ message, data });
  } catch (error) {
    const err = error.message || error;
    res.status(400).send({ message: "Ingredient couldn't be updated", err });
  }
};

const remove = async (req, res) => {
  try {
    const { code, message, data } = await Ingredient.remove(
      req.params.id,
      req.body
    );
    res.status(code).send({ message, data });
  } catch (error) {
    const err = error.message || error;
    res.status(400).send({ message: "Ingredient couldn't be updated", err });
  }
};

module.exports = { create, update, remove };
