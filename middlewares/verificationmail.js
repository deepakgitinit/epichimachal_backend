const sendingMail = require("./nodemailer")
const jwt = require("jsonwebtoken");

const verificationMail = async (id, email) =>{
    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: "30m"
    });

    if(token){
        try {
            await sendingMail({
                from: "no-reply@epichimachal.com",
                to: `${email}`,
                subject: "Account Verification Link",
                text: `Hello, ${email}. Welcome to EpicHimachal.
                Please verify your email by clicking this link, link is activated for 30 minutes only :
                http://localhost:5000/api/v1/users/${token}`,
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