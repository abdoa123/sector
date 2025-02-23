const multer = require('multer')
const path = require("path");
module.exports = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images"));
      },
      filename: (req, file, cb) => {
        pdf = Date.now() + "-" + file.originalname
        req.resultString = pdf

        cb(null, pdf);
      },
    }),
  }).single("photo")
