const sendingMail = require("./nodemailer")
const jwt = require("jsonwebtoken");

const verificationMail = async (id, email) =>{
    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: "10m"
    });

    if(token){
        try {
            await sendingMail({
                from: "contact@epichimachal.com",
                to: `${email}`,
                subject: "Account Verification Link",
                html: `<!DOCTYPE html>
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
                        color: #808080;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Email Verification</h2>
                        <p>Click the button below to verify your email address:</p>
                        <a href="http://localhost:5173/verification/${token}" target="_blank" class="button">Verify Email</a>
                        <p>Valid for 10 minutes only.</p>
                    </div>
                </body>
                </html>
                `
            })
            return true;

        } catch(error) {
            console.log({status: "Unsuccessful", message: error});
            return false;
        }
    }else{
        return false;
    }
}

module.exports = verificationMail