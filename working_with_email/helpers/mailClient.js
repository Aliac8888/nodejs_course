const nodemailer = require("nodemailer");
const SENDER = "aaaaaaaaaa@email.com";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4f310d22a98ea4",
    pass: "aa5975d7d9f4a4",
  },
});

function sendWelcome(recipient,subject,text) {
    transporter.sendMail({ from: SENDER,to:recipient,subject,text }, function (error, info) {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
}

module.exports = { sendWelcome };