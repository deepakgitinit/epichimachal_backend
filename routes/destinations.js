const express = require('express');
const { getAllDestinations, postDestination, updateDestination, deleteDestination, getDestination} = require("../controller/destinations")
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer');

router.route("/").get(getAllDestinations).post(auth, [multer.array('images[]'), postDestination]);
router.route("/:id").get(getDestination).patch(auth, updateDestination).delete(auth, deleteDestination);

module.exports = router;