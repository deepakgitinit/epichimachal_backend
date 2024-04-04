const sendingMail = require("./nodemailer");
const Users = require("../models/users")

const sendItineraryMail = async (emails, subject, htmlContent) => {
    const users = await Users.find({role: "ADMIN"});
  try {
    await sendingMail({
      from: "contact@epichimachal.com",
      to: `${emails}`,
      subject: `Itinerary: ${subject}.`,
      html: htmlContent,
    });

    await sendingMail({
        from: `contact@epichimachal.com`,
        to: `${users.map(item=>{return item.email + ","})}`,
        subject: "Itinerary sent Successfully.",
        html: `
        <p>Hello, Itinerary send to ${emails} successfully.</p>
        `,
      });

    return true;
    
  } catch (error) {
    console.log({ status: "Unsuccessful", message: error });
    return false;
  }
};

module.exports = sendItineraryMail;
