const multer = require("multer");
const fs = require("fs");

const dir = "./public/images";
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

// Modify multer configuration to handle multiple files
const upload = multer({ storage: fileStorageEngine }).array("images", 5); // Assuming "images" is the field name for the files

module.exports = upload;
