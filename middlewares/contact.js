const sendingMail = require("./nodemailer");

const contact = async (name, email, message) => {
  try {
    await sendingMail({
      from: `${email}`,
      to: `deepakhomemail@gmail.com`,
      subject: "Contact form message.",
      html: `
      <p>Hello, Contact form recieved from ${name?name:"user"}.</p>
      <p>message: ${message}</p>
      `,
    });

    await sendingMail({
        from: `noreply@epichimachal.com`,
        to: `${email}`,
        subject: "Your contact form receieved.",
        html: `
        <p>Hello, ${name?name:"user"}.</p>
        <p>We have recieved your message. We will catch up with you real soon.</p>
        `,
      });

    return true;
    
  } catch (error) {
    console.log({ status: "Unsuccessful", message: error });
    return false;
  }
};

module.exports = contact;
