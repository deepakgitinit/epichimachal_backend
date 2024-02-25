const express = require('express');
const { getAllDestinations, postDestination, updateDestination, deleteDestination} = require("../controller/destinations")
const router = express.Router();

const multer = require('../middlewares/multer');

router.route("/").get(getAllDestinations).post([multer.array('images'), postDestination]);

module.exports = router;