const nodemailer = require('nodemailer')

const sendingMail = async({from, to, subject, html}) =>{
  try {
    let mailOptions = ({
      from,
      to,
      subject,
      html
    })

    const Transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,   //465
      secure: true, 
      auth: {
        user: process.env.Nodemailer_Email,
        pass: process.env.Nodemailer_Password,
      },
    });

    return await Transporter.sendMail(mailOptions);

  } catch (error) {
    console.log(error)
  }
    
}

module.exports = sendingMail;