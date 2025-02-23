const multer = require('multer')
const path = require("path");
module.exports = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images"));
      },
      filename: (req, file, cb) => {
        img = Date.now() + "-" + file.originalname
        req.photo = img
        cb(null, img);
      },
    }),
  }).single("photo")
