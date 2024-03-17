const express = require("express");
const { getBookings, confirmBooking, updateBooking, deleteBooking } = require("../controller/bookings")

const router = express.Router();
const auth = require("../middlewares/auth");

router.route("/").get(auth, getBookings).post(auth, confirmBooking);
router.route("/:id").patch(auth, updateBooking).delete(auth, deleteBooking)

module.exports = router;