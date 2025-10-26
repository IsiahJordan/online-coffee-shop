const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Dest is email destination 
async function sendMail(dest, subject, msg){
  let mail_thread = {
    from: process.env.MAIL_USER,
    to: dest,
    subject: subject,
    text: msg 
  }
  const result = await transporter.sendMail(mail_thread);

  return result;
}

module.exports = { sendMail };

