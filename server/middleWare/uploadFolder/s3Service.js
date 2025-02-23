require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const nanoid = require('nanoid')
const axios = require('axios');



var AWS = require('aws-sdk');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// AWS.config.update({
//    accessKeyId: 'ABCDEF',
//  secretAccessKey: 'CDFJ22332',
//    region: 'us-east-1',
//  });
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
// UPLOAD FILE TO S3
function uploadFile(file,folderPath) {
try{

  const fileStream = fs.createReadStream(file.path);

const uniqueFilename = `${nanoid.nanoid()}_${file.filename}`;

const uploadParams = {
  Bucket: bucketName,
  Body: fileStream,
  Key: folderPath + '/' + uniqueFilename, // Use the unique filename
  ACL: 'public-read',
  ContentType: file.mimetype,
};
return s3.upload(uploadParams).promise(); // this will upload file to S3
}
catch(err){
  console.log("a");
  console.log(err);
}
}
function uploadMultiFile(file,folderPath) {
  try {
    const uniqueFilename = `${nanoid.nanoid()}_merged.pdf`;

    const uploadParams = {
      Bucket: bucketName,
      Body: file, // Pass the file buffer directly
      Key: folderPath + '/' + uniqueFilename,
      ACL: 'public-read',
      ContentType: 'application/pdf',
    };
    return s3.upload(uploadParams).promise(); 
  }
  catch(err){
    console.log(err);
  }
  }
function SendMessage(message,number,subject){

  AWS.config.update({
    accessKeyId: process.env.AWS_SECRET_KEY_ID_sns,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_sns,
    region:  process.env.region2_sns,
  });
    var params = {
        Message: message,
        PhoneNumber: '+20' + number,
         MessageAttributes: {
             'AWS.SNS.SMS.SenderID': {
                 'DataType': 'String',
                 'StringValue': subject
             }
         }
    };

    return new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();


}
function SendSmsMisrMessage(number,code) {
  // Define the URL of the API endpoint
const apiUrl = 'https://smsmisr.com/api/OTP/';
  // Define request parameters
  const params = {
    environment: 1,
    username: 'fa5eebbb31a74d47611a3e3bf810f5ae65bbbc08536fedea8efaf39c40c47eb0',
    password: 'b0295fc885b2bb45ec73db93f269dead8e0b583ab639ce2e7876187962d52e7d',
    sender: '5de4dab618237848f3c283d22593d154607b13c9d98d3557f14642d855c4a1ff',
    mobile: '2' + number,
    template: '0f9217c9d760c1c0ed47b8afb5425708da7d98729016a8accfc14f9cc8d1ba83',
    otp: code,
  };

// Make a POST request with the defined parameters
axios.post(apiUrl, params)
    .then(response => {
        // Handle the response data
        console.log(response.data);
        return true;
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
        return false;

    });
}

function DeleteFile(filePath){
  var params = {
    Bucket: bucketName,
    Key: filePath
    /* 
       where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
       - full path name to your file without '/' at the beginning
    */
  };
  
  return s3.deleteObject(params).promise();
}

async function getFile(filePath){

  var params = {
    Bucket: bucketName,
    Key: filePath
  };

  const data = await s3.getObject(params).promise();
  return data.Body
}

module.exports = { uploadFile , DeleteFile,SendMessage, getFile ,uploadMultiFile,SendSmsMisrMessage};