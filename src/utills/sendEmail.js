require("dotenv").config();
let nodemailer = require("nodemailer");

let sendingEmail = ({email,resetPasswordUrl}) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: process.env.SEND_GRID_EMAIL, // Change to your verified sender
    subject: "Password Reset Request",
    text: `You recently requested to reset your password for your account. Click the link below to reset it. \n\n ${resetPasswordUrl} \n\n If you did not request a password reset, please ignore this email or contact support if you have questions.`,
    html: `<h3>Webstore password reset</h3> <p>You recently requested to reset your password for your account. Click the link below to reset it:</p><p><a href="${resetPasswordUrl}">Reset your password</a></p><p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};


module.exports = { sendingEmail };
