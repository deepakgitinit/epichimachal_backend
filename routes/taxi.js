const express = require("express");
const { getTaxies, createTaxi, deleteTaxi } = require("../controller/taxi");
const router = express.Router();

const multer = require('../middlewares/multer');
const auth = require("../middlewares/auth");

//Routes:
router.route("/").get(getTaxies).post(auth, [multer.single('image'), createTaxi]);
router.route("/:id").delete(auth, deleteTaxi)

module.exports = router;