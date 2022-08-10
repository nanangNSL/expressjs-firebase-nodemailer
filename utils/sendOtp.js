require("dotenv").config();
const nodemailer = require('nodemailer');

exports.sendOtp = templateEmail =>{
    const  transporter = nodemailer.createTransport({
        host: process.env.HOST_SEND_OTP,
        port: process.env.PORT_SEND_OTP,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
          user: process.env.USER_OTP_OWNER, // generated ethereal user
          pass: process.env.PASS_OTP_OWNER,
        },
      });
      return(
        transporter.sendMail(templateEmail)
        .then(info => console.log(`email terkirim ${info.message}`))
        .catch(err => console.log(`email not send to ${err}`))
      )
}