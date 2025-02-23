const QRCode = require('qrcode');
const jwt = require("jsonwebtoken")
const path = require("path");//Token module
const { Patient } = require('../../model');
const {uploadFile} = require('../uploadFolder/s3Service')
require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
module.exports = async (id, bulk = false) => {
  // modified qrcode style
  // modified qrcode style
  const opts = {
    errorCorrectionLevel: 'L',
    type: 'terminal',
    quality: 0.95,
    margin: 1,
  }
  //genrate encrpted data
  try {
    const encrpted = jwt.sign(
      { patientId: id,isFromTrstLab:true },
      process.env.TOKEN_KEY,
    );

    let stringdata = process.env.Target_SERVER+"/QrCodeChecker/" + encrpted;
    const filePath = path.join(__dirname, "../../public/patients/qrCodes/");

    const generateQrCode = await QRCode.toFile(filePath + id + '.png', stringdata, opts);
    const fileStream = fs.createReadStream(filePath + id + '.png');


  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key:   'patients/qrCodes/' + id + '.png',
    ACL: 'public-read',
    ContentType: 'image/jpeg',

    
  };
   const upload =  s3.upload(uploadParams).promise();
   const patientQrCode = (await upload).Key
   const fileToDelete = filePath + id + '.png'

  if (!bulk) {
    const updatePatient = await Patient.update({ patientQrCode: (await upload).Key }, {
      where: {
          id
      }
  })  
  }

  return {
    patientQrCode,
    id,
    fileStream: fileToDelete
   }

  } catch (err) {
    console.log(err)
    return (false)
  }
};