const nodemailer = require('nodemailer');
const qr = require('qr-image');

const newBar = (bar) => {
  const qr_svg = qr.imageSync(bar.id)
  const qrcode = qr_svg.toString('base64')
  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, 
    auth: {
        user: 'apikey', 
        pass: process.env.GRID_KEY
    }
  });
  
  let mailOptions = {
    to: bar.email,
    from: '"UnTapped Trivia" <welcome@untappedtrivia.com>',
    subject: 'Welcome to UnTapped Trivia!',
    text: `Welcome to UnTapped Trivia! Your bar has been registered! You will have [length] access, as per your payment plan. 
          Your Bar ID is ${bar.id}. You will use this along with the password given to log in to the site. Have fun playing, and if you have any questions, 
          please reach out to us at help@untappedtrivia.com`,
    html: `<h2>Welcome to UnTapped Trivia!</h2>
          <h4>Your bar has been registered!</h4>
          <h6>You will have [length] access, as per your payment plan. </h6>
          <h4>Your bar id is <strong>${bar.id}</strong></h4>
          <h6>You will use this along with the password given to log in to the site.</h6>
          <h6>Use this QR code to have users log into your bar if you don't want to give out your Bar's ID</h6>
          <h6>Have fun playing, and if you have any questions, please reach out to us at help@untappedtrivia.com</h6>`,
    attachments: [
      { 
        filename: `${bar.name}_QR.png`,
        content: qrcode,
        encoding: 'base64'
      }
    ]
    
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
  });
};

module.exports = {
  newBar
}