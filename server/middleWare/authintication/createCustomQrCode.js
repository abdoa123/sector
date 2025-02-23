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
module.exports = async (id, qrCodePath) => {
  // modified qrcode style
  const opts = {
    errorCorrectionLevel: 'L',
    type: 'terminal',
    quality: 0.95,
    margin: 1,
  }
  //genrate encrpted data
  try {

    let stringdata = qrCodePath;
    const filePath = path.join(__dirname, "../../public/patients/qrCodes/");

    await QRCode.toFile(filePath + id + '.png', stringdata, opts);
    const fileStream = fs.createReadStream(filePath + id + '.png');

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key:   'medicalnetwork/qrCodes/' + id + '.png',
    ACL: 'public-read',
    ContentType: 'image/jpeg',

    
  };
   const upload =  s3.upload(uploadParams).promise();
    return (await upload).Key

  } catch (err) {
    console.log("err");
    console.log(err);
    return (false)
  }
};