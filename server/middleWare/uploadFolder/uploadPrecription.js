const path = require("path");
const multer = require('multer')
module.exports = (req, res, next) => {
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, "../../public/prescriptions"));
            },
            filename: (req, file, cb) => {
                pdf = Date.now() + "-" + file.originalname
                req.resultString = pdf

                cb(null, pdf);
            },
        }),
    }).single("result"), async function (req, res) {
        try {
          const getPrescriptionId = await Prescription.findOne({
            where: { id: req.body.id }
          })
          console.log(getPrescriptionId);
          if (fs.existsSync(path.join(__dirname, "../../public/prescriptions/" + getPrescriptionId.result))) {
            fs.unlinkSync(path.join(__dirname, "../../public/prescriptions/" + getPrescriptionId.result))
          }
          const uploadResult = await Prescription.update({ result: result }, {
            where: { id: req.body.id }
          })
  
          res.send(uploadResult)
  
        } catch (err) {
          res.status(500).send("some error while upload result")
        }
      
  }
    next();
}

