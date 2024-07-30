const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.PASSWORD
  }
});

const transporterSecure = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN
  }
});


async function sendMail(toList, subject, mailText, mailHtml = "") {
  const mailConfigurations = {
    from: process.env.EMAIL_USERNAME,
    // Comma Separated list of mails
    to: toList.join(", "),
    subject: subject,

    // This would be the text of email body
    text: 'Hi! There, You know I am using the'
      + ' NodeJS Code along with NodeMailer '
      + 'to send this email.'
  };

  if (mailText) {
    mailConfigurations.text = mailText;
  }
  else if (mailHtml) {
    mailConfigurations.html = mailHtml;
  }

  transporterSecure.sendMail(mailConfigurations, function (error, info) {
    if (error){
      console.log("Error in sending email: ", error);
      return false;
    } 
    console.log('Email Sent Successfully');
  });

  return true;
}



module.exports = {
  sendMail,
};