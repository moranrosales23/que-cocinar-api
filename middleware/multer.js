const multer = require("multer");

const memoryStorage = multer({
  storage: multer.memoryStorage(),
});

module.exports = memoryStorage;
