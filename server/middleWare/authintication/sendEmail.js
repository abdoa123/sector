const nodemailer = require("nodemailer");
var AWS = require('aws-sdk');
const { User } = require("../../model");
AWS.config.update({
  accessKeyId: process.env.AWS_SECRET_KEY_ID_ses,
secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ses,
  region:  process.env.region2_sns,
});
const sendEmail = async (email, subject, text, userData) => {
    try {
        
        const updateCode = await User.update({code : (parseInt(text))}, {
            where: { id: userData.id }
          })
    
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: email,
        subject: subject,
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p>Hey ' + userData.userName +'</p>'+
        '<p></p>'+ 
        '<p>Need to reset your password?</p>'+
        '<p>Use your secret code!</p>'+
        '<p>your code : '+ text + '</p>'+
        '<p>Thanks,</p>'+
        '<p>Medcloud Team</p>'+
        '</div></body></html>',      });

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  const sendWelcomeEmail = async (email, userName) => {
    try {
        
        
    
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: email,
        subject: 'Welcome',
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p>Welcome ' + userName +'</p>'+
        '<p></p>'+ 
        '<p>We wanted to confirm that we have received your account request and it is being reviewed.One of our members will contact you as soon as possible to confirm the request.  We will keep you posted to any updates. </p>'+
        '<p></p>'+ 
        '<p>Thank you,</p>'+
        '<p>Medcloud Team</p>'+
        '</div></body></html>',      });

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  const sendEmailToRegistrar = async (email, patient) => {
    try {
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: email,
        subject: 'Notification for New Patient Registration',
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p>Welcome Our Medical Registrar</p>'+
        '<p></p>'+ 
        '<p>We wanted to inform you that a new patient with user name '+ patient.firstName + patient.lastName +'  and a phone number '+ patient.phone + ' has registered to our system</p>'+
        '<p></p>'+ 
        '<p>Thank you,</p>'+
        '<p>Medcloud Team</p>'+
        '</div></body></html>',      });

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  const sendInviteEmail = async (email,clinicName) => {
    try {
        
        
    
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: email,
        subject: 'Invitation to Join '+clinicName+ 'on Medcloud',
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p> Dear Doctor </p>'+
        '<p>We hope this finds you well. We are writing to extend an invitation for you to join '+clinicName+' on Medcloud, the top electronic health records (EHR) platform for managing medical appointments and records.</p>'+ 
        '<p>As a medical professional with your level of expertise, we believe you would be a valuable addition to our clinic'+"'"+'s team. By accepting this invitation, you will have access to a wide range of features such as managing your own schedule, assigning tasks, receiving appointments from patients assigned to you within our clinic, and viewing medical records, progress, and appointments of your patients, and referral to healthcare providers within your medical network.</p>'+
        '<p>If you do not have an existing Medcloud account, you can create one easily through the following link: (https://medcloudeg.com/free_trial Once your account has been approved by our technical staff, you will be notified and able to login. You will also be given a complete training for free on how to use the platform and navigate it to make your workflow more efficient and easier.</p>'+ 
        '<p>If you have any inquiries or doubts, please do not hesitate to reach out to us. We are thrilled to have you onboard and are looking forward to working with you.</p>'+
        '<p>Thank you,</p>'+
        '<p>Best regards,'+clinicName+' </p>'+
        '</div></body></html>',      });                       

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  const sendInviteEmailToNewDoctor = async (email,clinicName) => {
    try {
        
        
    
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: email,
        subject: 'Invitation to Join '+clinicName+ 'on Medcloud',
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p> Dear Doctor </p>'+
        '<p>As a doctor with your expertise, we believe you would be a valuable addition to our clinic'+"'"+'s team. By accepting this invitation, you will be able to receive appointments from patients assigned to you within our clinic, see their medical history, progress, and appointments. You can also manage your own schedule, assign tasks, and communicate with other staff members across different branches of our clinic via the referral system.</p>'+ 
        '<p>To accept this invitation, please log in to your Medcloud account and navigate to the "Notifications (Or any other name)" section, where you should see an invitation with our clinic'+"'"+'s name. Click "Accept Invitation (Insert name)" to join us, you may also click on the following link for a quick </p>'+
        '<p>redirection: https://medcloudeg.com/free_trial</p>'+ 
        '<p>If you have any questions or concerns, please do not hesitate to contact us. We are excited to have you on board and look forward to working with you.</p>'+
        '<p>Best regards,'+clinicName+'</p>'+
        '</div></body></html>',      });                       

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  const sendToConfirmPasswordmail = async (email, userName,link) => {
    try {
        

      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: email,
        subject: 'Welcome',
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p>Welcome ' + userName +'</p>'+
        '<p></p>'+ 
        '<p>your account request has been confirmed </p>'+
        '<p></p>'+ 
        '<p>You can set your password by clicking the link below:</p>'+ 
        '<p>' + link +'</p>'+

        '<p>Thank you,</p>'+
        '<p>Medcloud Team</p>'+
        '</div></body></html>',      });

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  const sendClinicInfoBymail = async (password, clinicName,userName) => {
    try {
        
    
    console.log('link');
      const transporter = nodemailer.createTransport({
        SES: new AWS.SES({ region:process.env.region2_sns, apiVersion: "2010-12-01"}),
        from:'support@medcloudeg.com',
        secure: true,
        auth: {
            user: "support@medcloudeg.com",
            pass: "#@support$@medcloudeg2022",},
      });
  
      await transporter.sendMail({
        from: 'support@medcloudeg.com',
        to: 'memo192.168@gmail.com',
        subject: 'Welcome zeyad',
        html: '<!DOCTYPE html>'+
        '<html><head><title></title>'+
        '</head><body><div>'+
        '<img src="https://medcloudeg.com/static/media/medcloud_logoblue.d7f654a5.png" alt="" width="160">'+
        '<p>there is a new clinic : ' + clinicName +'</p>'+
        '<p></p>'+ 
        '<p>Email: ' + userName + '</p>'+
        '<p></p>'+ 
        '<p>password: '+ password +'</p>'+ 
        '<p>Thank you,</p>'+
        '<p>Medcloud Team</p>'+
        '</div></body></html>',      });

    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  
  module.exports = {sendEmail,sendWelcomeEmail,sendEmailToRegistrar, sendToConfirmPasswordmail,sendClinicInfoBymail,sendInviteEmail,sendInviteEmailToNewDoctor};