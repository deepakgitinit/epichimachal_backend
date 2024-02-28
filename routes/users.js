const express = require("express");
const {createUser, loginUser} = require("../controller/users");

const router = express.Router();
const multer = require("../middlewares/multer");

router.route("/signup").post(multer.single("profile"), createUser);
router.route("/login").post(loginUser);

module.exports = router;