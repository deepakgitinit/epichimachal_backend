const sendingMail = require("./nodemailer");
const Users = require("../models/users")

const anonumusbooking = async (name, phone) => {
  const users = await Users.find({role: "ADMIN"});
  try {
    await sendingMail({
      from: `contact@epichimachal.com`,
      to: `${users.map(item=>{return item.email + ","})}`,
      subject: "Booking request received.",
      html: `
      <p>Hello, Booking request recieved from ${name}, phone: ${phone}.</p>
      `,
    });
    
    return true;
    
  } catch (error) {
    console.log({ status: "Unsuccessful", message: error });
    return false;
  }
};

module.exports = anonumusbooking;
