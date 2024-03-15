const express = require("express");
const { getBookings, confirmBooking, updateBooking } = require("../controller/bookings")

const router = express.Router();
const auth = require("../middlewares/auth");

router.route("/").get(auth, getBookings).post(auth, confirmBooking);
router.route("/update").post(auth, updateBooking)

module.exports = router;