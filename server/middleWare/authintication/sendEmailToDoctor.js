const nodemailer = require("nodemailer");
const { User } = require("../../model");
const sendEmail = async ( data) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
          user:  'aa6085948@gmail.com',
          pass: '01205119956a',
        },
      });
  
      await transporter.sendMail({
        from: 'EMR Team',
        //  to: 'mohamedsharaf1993@gmail.com',
        to: 'abdo_201333@hotmail.com',
        subject: "new Patient Join our system",
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://media.gettyimages.com/vectors/electronic-medical-records-vector-id505710370?k=20&m=505710370&s=612x612&w=0&h=9WVKS4QKENogwZZGS-3vbyPyR8hGYnWpkdQ1FnaMR9M=" alt="" width="160">'+
        '<p>New Patient Join Our system&#128525&#127881 </p>'+ 
        '<p>Here is summery:</p>'+
        '<p>Name: '+ data.userName + '</p>'+
        '<p>Phone: '+ data.phone+ '</p>'+
        '</div></body></html>',
      });
      console.log("done");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  
  module.exports = sendEmail;