const mongoose = require("mongoose");

const connect = () =>
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("Successfully connected"))
    .catch((err) => console.log("Couldn't connect to DB", err));

module.exports = connect;
