const sendingMail = require("./nodemailer")

const forgotusername = async (name, username, email) =>{
    try {
        await sendingMail({
            from: "no-reply@travelmorehimachal.com",
            to: `${email}`,
            subject: "Forgot username Link",
            text: `Hello ${name?name:"User"}. Your username is ${username}`,
        });
        return true;

    } catch(error) {
        console.log({status: "Unsuccessful", message: error});
        return false;
    }
}

module.exports = forgotusername;