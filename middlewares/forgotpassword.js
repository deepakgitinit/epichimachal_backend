const sendingMail = require("./nodemailer");
const jwt = require("jsonwebtoken");

const forgotpassword = async (id, email) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  try {
    await sendingMail({
      from: "contact@epichimachal.com",
      to: email,
      subject: "Forgot Password Link",
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
                <h2>Password Reset Link</h2>
                <p>Click the button to reset your Password:</p>
                <a href="https://www.epichimachal.com/resetpassword/${token}" target="_blank" class="button">Reset Password</a>
                <p>Valid for 10 minutes only.</p>
            </div>
        </body>
        </html>
      `,

    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = forgotpassword;
