const express = require("express");
const { sendItinerary } = require("../controller/itinerary");
const router = express.Router();

//Routes:
router.route("/").post(sendItinerary);

module.exports = router;