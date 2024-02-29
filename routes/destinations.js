const express = require('express');
const { getAllDestinations, postDestination, updateDestination, deleteDestination} = require("../controller/destinations")
const router = express.Router();

const multer = require('../middlewares/multer');
const auth = require("../middlewares/auth");

router.route("/").get(getAllDestinations).post(auth, [multer.array('images'), postDestination]);
router.route("/:id").patch(auth, updateDestination).delete(auth, deleteDestination);

module.exports = router;