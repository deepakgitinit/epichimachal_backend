const Bookings = require("../models/bookings");
const User = require("../models/users");
const Package = require("../models/packages");
const bookingReq = require("../middlewares/bookingreq");
const anonumusbooking = require("../middlewares/anonymusbooking");

const getAllBookings = async (req, res) =>{
  try {
    const userID = req.user.userID;
    const user = await User.findById(userID);
    
    if(user.role != "ADMIN") {
      res.status(401).json({status: "Unsuccessful", message: "You are not authorized"});
      return;
    }
    
    const bookings = await Bookings.find({});

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
}


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

const reqBooking = async (req, res) => {
  try {
    const Booking = new Bookings(req.body);
    const userID = req.user.userID;
    Booking.userid = userID;

    const user = await User.findById(userID);
    const email = user.email;
    const phone = user.phone;

    if (user.name!=null) {
      Booking.name = user.name;
    }
    
    if (req.body.package) {
      const packageID = req.body.package;
      const { title, passengers, taxi } = await Package.findById(packageID)
      Booking.package = title;
      Booking.passengers = passengers;
      Booking.taxi = taxi;
    }
    
    Booking.email = email;
    Booking.phone = phone;

    bookingReq(email, phone);
    const response = await Booking.save();
    
    if (response) {
      res
        .status(200)
        .json({ status: "Successful", message: "Booking request successful." });
      return;
    }
    res
      .status(406)
      .json({ status: "Unsuccesful", message: "There is an error occured." });

  } catch (error) {
    res.status(404).json({ status: "Unsuccessful", message: error });
  }
};

const reqAnonymousBooking = async (req, res) =>{
  try {
    const Booking = new Bookings(req.body);
    const name = req.body.name;
    const phone = req.body.phone;
    
    if (req.body.package) {
      const packageID = req.body.package;
      const { title, passengers, taxi } = await Package.findById(packageID);
      Booking.package = title;
      Booking.passengers = passengers;
      Booking.taxi = taxi;
    }

    anonumusbooking(name, phone);
    const response = await Booking.save();
    
    if (response) {
      res
        .status(200)
        .json({ status: "Successful", message: "Booking request successful." });
      return;
    }
    res
      .status(406)
      .json({ status: "Unsuccesful", message: "There is an error occured." });

  } catch (error) {
    res.status(404).json({ status: "Unsuccessful", message: error });
  }
}

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
      }, {new: true});

      const email = response.email;
      if(email){
        // const pickup = response.pickup;
        // const fromdate = response.fromdate.slice(0, 10);
        await bookingconfirmation(email, status);
      };

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

module.exports = { getAllBookings, getBookings, reqBooking, reqAnonymousBooking, updateBooking, deleteBooking };
