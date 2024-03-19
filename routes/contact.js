const express = require("express");
const { sendContactForm } = require("../controller/contact");
const router = express.Router();

//Routes:
router.route("/").post(sendContactForm);

module.exports = router;