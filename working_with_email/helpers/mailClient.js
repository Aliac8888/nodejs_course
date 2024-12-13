const nodemailer = require("nodemailer");
const SENDER = "aaaaaaaaaa@email.com";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "CHANGE_WITH_YOUR_CREDENTIALS",
    pass: "CHANGE_WITH_YOUR_CREDENTIALS",
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