const sendingMail = require("./nodemailer");

const bookingReq = async (email) => {
  try {
    await sendingMail({
      from: "no-reply@epichimachal.com",
      to: `${email}`,
      subject: "Account Verification Link",
      text: `Hello, ${email}. Welcome to EpicHimachal.
                Thank you for your booking. We will catch up you really soon.`,
    });
    return true;
  } catch (error) {
    console.log({ status: "Unsuccessful", message: error });
    return false;
  }
};

module.exports = bookingReq;
