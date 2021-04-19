const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //create mailoptions
  const mailOptions = {
    from: '<Anagha>anagha@email.com',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  //send Mail
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
