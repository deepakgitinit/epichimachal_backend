const Bookings = require("../models/bookings");
const User = require("../models/users");
const bookingReq = require("../middlewares/bookingreq");

const getBookings = async (req, res) => {
  try {
    const userID = req.user.userID;
    const bookings = await Bookings.find({ userid: userID });

    if (bookings) {
      res.status(200).json({ status: "Successful", message: bookings });
      return;
    }
    res
      .status(406)
      .json({ status: "Unsuccesful", message: "There is an error occured." });
  } catch (error) {
    res.status(404).json({ status: "Unsuccessful", message: error });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const Booking = new Bookings(req.body);
    const userID = req.user.userID;
    Booking.userid = userID;

    const user = await User.findById(userID);
    const email = user.email;

    if (user.name) {
      const name = user.name;
      Booking.name = name;
    }
    if (user.phone) {
      const phone = user.phone;
      Booking.phone = phone;
    }

    Booking.email = email;
    bookingReq(email);

    const response = await Booking.save();
    if (response) {
      res
        .status(200)
        .json({ status: "Successful", message: "Booking request succesful." });
      return;
    }
    res
      .status(406)
      .json({ status: "Unsuccesful", message: "There is an error occured." });
  } catch (error) {
    res.status(404).json({ status: "Unsuccessful", message: error });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingid = req.body.bookingid;
    const userid = req.user.userID;

    const user = await User.findById(userid)
    const role = user.role;

    const status = req.body.status;

    if (role == "ADMIN") {
      const response = await Bookings.findByIdAndUpdate(bookingid, {
        status: status,
      });

      if (response) {
        res
          .status(200)
          .json({ status: "Successful", message: "Booking Status Updated." });
        return;
      }
      res
        .status(400)
        .json({ status: "Unsuccesful", message: "Status not Updated." });
      return;
    }

    res
      .status(401)
      .json({
        status: "Unsuccessful",
        message: "Not Authorized to Confirm Booking.",
      });
  } catch (error) {
    res.status(404).json({ status: "Unsuccessful", message: error });
  }

  const deleteBooking = async (req, res) =>{
    try {
      re
    } catch (error) {
      
    }
  }

};

module.exports = { getBookings, confirmBooking, updateBooking };
