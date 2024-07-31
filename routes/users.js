const express = require("express");
const {createUser, loginUser, userProfile, updateUser, verification, resendVerification, forgotPassword, setPassword, setSettingsPassword} = require("../controller/users");

const router = express.Router();
const multer = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const processImage = require("../middlewares/sharp_single");

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);

router.route("/profile").get(auth, userProfile);
router.route("/update").post(auth, multer.single("profile"), processImage, updateUser)

router.route("/:verification").get(verification);
router.route("/resend").post(resendVerification);

router.route("/forgotpassword").post(forgotPassword)
router.route("/setpassword").post(auth, setSettingsPassword);
router.route("/setpassword/:token").post(setPassword);

module.exports = router;