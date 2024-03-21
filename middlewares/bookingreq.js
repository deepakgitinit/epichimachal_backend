const sendingMail = require("./nodemailer");
const Users = require("../models/users")

const bookingReq = async (email) => {
  const users = await Users.find({role: "ADMIN"});
  try {
    await sendingMail({
      from: `contact@epichimachal.com`,
      to: `${users.map(item=>{return item.email + ","})}`,
      subject: "Booking request received.",
      html: `
      <p>Hello, Booking request recieved from ${email}.</p>
      `,
    });

    await sendingMail({
      from: "contact@epichimachal.com",
      to: `${email}`,
      subject: "Your booking requrest received.",
      html: `
      <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f5f5f5; /* Grey background */
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff; /* White container background */
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #b3ffff; /* Blue button color */
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <img src="https://www.epichimachal.com/Logo-black.png" />
                <h2>Booking Request Received</h2>
                <p>Hello, ${email}.</p>
                <p>We have recieved your booking request. We will catch up with you real soon.</p>
            </div>
        </body>
        </html>
      `,
    });
    return true;
    
  } catch (error) {
    console.log({ status: "Unsuccessful", message: error });
    return false;
  }
};

module.exports = bookingReq;
