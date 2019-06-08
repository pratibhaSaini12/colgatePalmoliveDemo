var nodemailer = require('nodemailer');

module.exports = {

  sendMail: function(link, email) {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zeeshanali242@gmail.com',
        pass: 'fa@1994z'
      }
    });
    var text = 'Plese click on the link below to set your Pimcore ERP password. <br/>' + link;
    var mailOptions = {
      from: 'zeeshanali242@gmail.com',
      to: email,
      subject: 'Set your password',
      html: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {

      } else {

      }
    });
  }
}
