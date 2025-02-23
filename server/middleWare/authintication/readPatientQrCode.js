const Jimp = require("jimp");
const { getFile } = require('../uploadFolder/s3Service');
const { Patient } = require('../../model');
const QrCode = require('qrcode-reader');

module.exports = async (id) => {
  try {

    const getPatient = await Patient.findOne({
        where: {id}
    })

    const buffer = await getFile(getPatient.patientQrCode);
console.log(buffer, "from image buffer...")
const image = await Jimp.read(buffer);
console.log(image, "after image buffer...")

    const qr = new QrCode();
    return new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const qrCodeData = value.result;
          resolve(qrCodeData);
        }
      };
      qr.decode(image.bitmap);
    });
  } catch (error) {
    console.error(error);
  }
};
