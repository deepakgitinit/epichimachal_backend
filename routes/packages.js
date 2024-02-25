const express = require("express");
const { getPackages, postPackage, updatePackage, deletePackage } = require("../controller/packages");
const router = express.Router();

const multer = require('../middlewares/multer');

//Routes:
router.route("/").get(getPackages).post([multer.single('thumbnail'), postPackage]);

module.exports = router;