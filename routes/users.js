const express = require("express");
const {createUser, loginUser, verification, resendVerification, forgotUsername, forgotPassword, setPassword} = require("../controller/users");

const router = express.Router();
const multer = require("../middlewares/multer");

router.route("/signup").post(multer.single("profile"), createUser);
router.route("/login").post(loginUser);
router.route("/:verification").get(verification);
router.route("/resend").post(resendVerification);
router.route("/forgotusername").post(forgotUsername);
router.route("/forgotpassword").post(forgotPassword)
router.route("/setpassword/:token").post(setPassword);

module.exports = router;