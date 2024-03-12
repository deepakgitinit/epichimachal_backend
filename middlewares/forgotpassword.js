const sendingMail = require("./nodemailer")
const jwt = require("jsonwebtoken");

const forgotusername = async (id, name, email) =>{
    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: "10m"
    });

    try {
        await sendingMail({
            from: "no-reply@travelmorehimachal.com",
            to: `${email}`,
            subject: "Forgot password Link",
            text: `Hello ${name?name:"User"}. Please reset your password from given
            link, link is activated for 10 minutes only :
            http://localhost:5000/api/v1/users/forgotpassword/${token}`,
        });
        return true;

    } catch(error) {
        console.log({status: "Unsuccessful", message: error});
        return false;
    }
}

module.exports = forgotusername;