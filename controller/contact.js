const contact = require("../middlewares/contact")
const sendContactForm = async (req, res) =>{
    const {name, email, message} = req.body;
    const response = await contact(name, email, message)
    if (response) {
        res.status(200).json({status: "Successful", msg: "Mail sent successfully."})
    }else{
        res.status(200).json({status: "Unxsccessful", msg: "There is an error sending mail."})
    }
}

module.exports = {sendContactForm}