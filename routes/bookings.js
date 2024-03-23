const express = require("express");
const { getBookings, reqBooking, updateBooking, deleteBooking, getAllBookings, reqAnonymousBooking } = require("../controller/bookings")

const router = express.Router();
const auth = require("../middlewares/auth");

router.route("/").get(auth, getBookings).post(auth, reqBooking);
router.route("/:id").patch(auth, updateBooking).delete(auth, deleteBooking)
router.route("/all").get(auth, getAllBookings)
router.route("/anonymus").post(reqAnonymousBooking)

module.exports = router;