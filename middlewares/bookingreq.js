const sendingMail = require("./nodemailer");

const bookingReq = async (email) => {
  try {
    await sendingMail({
      from: "no-reply@epichimachal.com",
      to: `${email}`,
      subject: "Your Booking is Pendiing.",
      html: `
      <p>Hello, ${email}.</p>
      <p>Thank you for your booking. We will catch up you really soon.</p>
      `,
    });
    return true;
  } catch (error) {
    console.log({ status: "Unsuccessful", message: error });
    return false;
  }
};

module.exports = bookingReq;
