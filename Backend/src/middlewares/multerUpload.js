const Multer = require("multer");

const storage = Multer.memoryStorage();
const upload = Multer({
  storage,
});

module.exports = upload;