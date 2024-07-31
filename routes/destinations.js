const express = require('express');
const { getAllDestinations, postDestination, updateDestination, deleteDestination, getDestination} = require("../controller/destinations")
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer');
const processImages = require('../middlewares/sharp');

router.route("/").get(getAllDestinations).post(auth, [multer.array('images[]'), processImages, postDestination]);
router.route("/:id").get(getDestination).patch(auth, updateDestination).delete(auth, deleteDestination);

module.exports = router;