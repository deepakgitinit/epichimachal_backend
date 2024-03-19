const Bookings = require("../models/bookings");
const User = require("../models/users");
const Package = require("../models/packages");
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

    if (user.name!=null) {
      Booking.name = user.name;
    }
    
    if (user.phone) {
      Booking.phone = user.phone;
    } else {
      res
      .status(200)
      .json({
        status: "Unsuccesful",
        message: "Phone Number required for Booking.",
      });
      return;
    }
    
    if (req.body.package) {
      const packageName = req.body.package;
      const { passengers, taxi } = await Package.findOne({
        title: packageName,
      });
      if (passengers) {
        Booking.passengers = passengers;
      }
      if (taxi) {
        Booking.taxi = taxi;
      }
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

    const user = await User.findById(userid);
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

    res.status(401).json({
      status: "Unsuccessful",
      message: "Not Authorized to Confirm Booking.",
    });
  } catch (error) {
    res.status(404).json({ status: "Unsuccessful", message: error });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Bookings.findByIdAndDelete(id);

    if (response) {
      res
        .status(200)
        .json({
          status: "Successful",
          message: "Booking Deleted Successfully.",
        });
      return;
    }
    res
      .status(400)
      .json({ status: "Unsuccesful", message: "Booking not Deleted." });
    return;
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "Unsuccessful", message: "Internal Server Error" });
  }
};

module.exports = { getBookings, confirmBooking, updateBooking, deleteBooking };
