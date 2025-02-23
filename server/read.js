
// // // // Requiring the module
// // // const reader = require('xlsx')
// // // const db = require("./app/model");
// // // const Patho = db.frequency;
// // // const crypto = require("crypto");
// // // const file = reader.readFile('./test.xlsx')

// // // let data = []

// // // const sheets = file.SheetNames

// // // const addOrderSurgry = async () => {
// // //    console.log("asdsad")
// // //    const temp = reader.utils.sheet_to_json(
// // //       file.Sheets[file.SheetNames[0]])
// // //    temp.forEach((res) => {
// // //       data.push(res)
// // //    })

// // //    for (var i = 0; i < data.length; i++) {
// // //       // idCode = crypto.randomBytes(3).toString("hex");
// // //       const patho = {
// // //          name: data[i].name,
// // //          arabicName:data[i].arabicName,
// // //       };
// // //       await Patho.create(patho).then(ress => {
// // //          console.log(ress)
// // //       })
// // //    }
// // // }
// // // // Reading our test file




// // // // // Printing data
// // // // for(var i =0 ; i<data.length;i++){

// // // //    const a = await addOrderSurgry(data[i]).then(result => {

// // // //       if (result) {
// // // //           test = true;
// // // //       }
// // // //     console.log(result)
// // // //    })

// // // // }
// // // addOrderSurgry();
// // // // const jwt = require("jsonwebtoken") //Token module
// // // // require("dotenv").config();
// // // // const QRCode = require('qrcode');
// // // // const opts = {
// // // //    errorCorrectionLevel: 'L',
// // // //    type: 'terminal',
// // // //    quality: 0.95,
// // // //    margin: 1,
// // // //    width: 150,
// // // //     height: 150,
// // // //   }
// // // // const generateQR = async (data,id) => {
// // // // 	try {
// // // //       //toDataURL
// // // //       console.log(data);
// // // // 		await QRCode.toFile('./public/patients/qrCodes/'+id+'.png' , data,opts);
// // // // 	} catch(err){
// // // // 		console.log(err);
// // // // 	}
// // // // }
// // // //             const token = jwt.sign(
// // // //                { userId: 1, name:"abdo" },
// // // //                process.env.TOKEN_KEY,
// // // //            );
// // // // console.log(token);
// // // // let data = token
// // // // let stringdata = "localhost:8080/patient/"+token;
// // // // //const decoded = jwt.verify(test[1], process.env.TOKEN_KEY);
// // // // console.log(stringdata);
// // // // generateQR(stringdata,9);

// // // // //generateQR(stringdata,5);
// // let date_2 = new Date('10/25/2021');
// // let date_1 = new Date();
// // console.log(date_1);
// // const days = (date_1, date_2) =>{
// //     let difference = date_1.getTime() - date_2.getTime();
// //     let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
// //     return TotalDays;
// // }
// // console.log(days(date_1, date_2) +" days to world cup");

const express = require('express');
const app = express();
require('dotenv').config();
const { uploadFile, DeleteFile ,SendMessage} = require("./middleWare/uploadFolder/s3Service");

var AWS = require('aws-sdk');
let nodemailer = require('nodemailer');
const axios = require('axios');


app.get('/', async (req, res) => {
    const apiUrl = 'http://detc.somee.com/api/Category';
    if (!(/^\d+$/.test(123))) {
        console.log("ttt");
    }else{
        console.log("tt123t");

    }

// // Make a get request with the defined parameters
// axios.get(apiUrl)
//     .then(response => {
//         // Handle the response data
//         console.log(response.data);
//         return true;
//     })
//     .catch(error => {
//         // Handle errors
//         console.error('Error:', error);
//         return false;

   
    // const jwt = require("jsonwebtoken");
    // const zlib = require("zlib");
    
    // const payload = { patientId: 1 };
    
    // // Convert payload to JSON string
    // const payloadString = JSON.stringify(payload);
    
    // // Compress payload
    // const compressedPayload = zlib.deflateSync(payloadString);
    
    // // Encode compressed payload
    // const token = jwt.sign(compressedPayload, process.env.TOKEN_KEY);
    
    // let stringdata = "https://medcloudeg.com/" + "/QrCodeChecker/" + token;
    // console.log(stringdata);

    // const longUrl = 'http://localhost:3006/QrCodeChecker/eyJhbGciOiJIUzIhjkjjk1NiIsInsdfdsf';
    
    // var shortUrl = require("node-url-shortener");

    // shortUrl.short(longUrl, function (err, url) {
    //     console.log(url);
    // });
       
    

//     //const result = await  SendMessage( "Welcome to MedCloud, your partner in health for a healthier, happier life.\n Your patient code is: " + "55"+"\n" +"Please note that you may soon receive a call from MedCloud to complete your medical registration." ,"01205119956" ,"medcloudeg");  // Calling above function in s3.js
//     const result2 =  await SendMessage( "مرحبا بك في ميدكلاود، شريكك في الصحة لحياة أكثر صحة وسعادة. .\n \nرمز المريض الخاص بك هو: " + "55" + '\n'+'\n'+"يرجى ملاحظة أنه قد يتم الاتصال بك قريبًا من قبل ميدكلاود لإكمال تسجيلك الطبي." ,"01205119956","medcloudeg");  // Calling above function in s3.js
//     const result22 =  await SendMessage( "مرحبًا بك في ميدكلاود، شريكك في الصحة لحياة أكثر صحة وسعادة .\n\n"
//    +"1- رمز المريض الخاص بك هو: "+"55" +'\n'+'\n'+
//    "2- يمكنك الوصول إلى رمز الاستجابة السريعة الخاص بك رقميًا من خلال الرابط التالي: "+"asdas \n\n" 
//    +"يرجى ملاحظة أنه قد يتم الاتصال بك قريبًا من قبل ميدكلاود لإكمال تسجيلك الطبي."
//   ,"01205119956","medcloudeg");  // Calling above function in s3.js
/*

مرحبًا بك في ميدكلاود، شريكك في الصحة لحياة أكثر صحة وسعادة.
1- رمز المريض الخاص بك هو: "+patientCode+"
2- يمكنك الوصول إلى رمز الاستجابة السريعة الخاص بك رقميًا من خلال الرابط التالي: "+process.env.Target_SERVER+"/patient_showCode/"+createPatient.id+"
يرجى ملاحظة أنه قد يتم الاتصال بك قريبًا من قبل ميدكلاود لإكمال تسجيلك الطبي.", req.body.phone, "NewVisit");

*/

//     // console.log("Message = " + req.query.message);
//     // console.log("Number = " + req.query.number);
//     // console.log("Subject = " + req.query.subject);
//    AWS.config.update({
//        accessKeyId: process.env.AWS_SECRET_KEY_ID_ses,
//      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ses,
//        region:  process.env.region2_sns,
//      });
// //     var params = {
// //         Message: "hello",
// //         PhoneNumber: '+2001205119956',
// //         MessageAttributes: {
// //             'AWS.SNS.SMS.SenderID': {
// //                 'DataType': 'String',
// //                 'StringValue': "test"
// //             }
// //         }
// //     };
// let transporter = nodemailer.createTransport({
//    SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
//    from:'support@medcloudeg.com',
//    secure: true,
//    auth: {
//        user: "support@medcloudeg.com",
//        pass: "#@support$@medcloudeg2022",},
//  });

//  // send mail with defined transport object
//  var tt =  callemail(transporter,"subject","text","url").then(res=>{

//      console.log("Message sent: %s", res.messageId);
//      return res; // or something
//  });
//  res.send(result2)
//     var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

//     publishTextPromise.then(
//         function (data) {
//             res.end(JSON.stringify({ MessageID: data.MessageId }));
//         }).catch(
//             function (err) {
//                 res.end(JSON.stringify({ Error: err }));
//             });

});

app.listen(3000, () => console.log('SMS Service Listening on PORT 3000'))

// let AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: "<access key ID>",
//     secretAccessKey: ,
//     region: "<region>"
// });


// function scheduledEmail (subject,text,url) {
   
//     let transporter = nodemailer.createTransport({
//       SES: new AWS.SES({ region:'<REGION>', apiVersion: "2010-12-01"})
//     });
  
//     // send mail with defined transport object
//     return callemail(transporter,subject,text,url).then(res=>{

//         console.log("Message sent: %s", res.messageId);
//         return res; // or something
//     });
// }

function callemail(transporter,subject,text,url){
   return new Promise(resolve=>{
       let info = transporter.sendMail({
           from: 'support@medcloudeg.com',
           to: 'abdulrahemanmanman@gmail.com',
           subject: "code",
           html: '<!DOCTYPE html>'+
           '<html><head><title></title>'+
           '</head><body><div>'+
           '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
           '<p>Hey ' + "abdo"+'</p>'+
           '<p></p>'+ 
           '<p>Need to reset your password?</p>'+
           '<p>Use your secret code!</p>'+
           '<p>your code : '+ "4545" + '</p>'+
           '<p>Thanks,</p>'+
           '<p>EMR Team</p>'+
           '</div></body></html>',    
           
          
          
       });
       resolve(info);
   }).catch(err=>{
       console.log(err);
   });
}
//scheduledEmail("some stuff to send","Attached is a CSV of some stuff.","https://raw.github.com/andris9/Nodemailer/master/LICENSE");