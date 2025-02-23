const multer = require("multer");
var fs = require("fs");

var dir = "./public/images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Use upload.fields() for multiple files
const upload = multer({ storage: fileStorageEngine }).fields([
  { name: 'result', maxCount: 1 },
  { name: 'result2', maxCount: 1 }
]);

module.exports = upload;