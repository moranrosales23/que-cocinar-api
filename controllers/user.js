const { User } = require("../services/");

const logIn = async (req, res) => {
  try {
    const { code, message, data } = await User.logIn(req.body);
    res.status(code).send({ message, data });
  } catch (error) {
    res
      .status(400)
      .send({ message: "User o Password incorrect", errores: error });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.add(req.body);
    res.status(201).send({ message: "User created", data: user });
  } catch (error) {
    const err = error.message || error;
    res.status(400).send({ message: "User couldn't be created", error: err });
  }
};

const update = async (req, res) => {
  try {
    console.log(req.body);
    const { code, message, data } = await User.edit(req.body);
    res.status(code).send({ message, data });
  } catch (error) {
    const err = error.message || error;
    res.status(400).send({ message: "User couldn't be updated", err });
  }
};

module.exports = { logIn, create, update };
