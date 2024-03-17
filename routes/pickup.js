const express = require("express");
const { fetchPickups, createPickup, deletePickups } = require("../controller/pickup");
const router = express.Router();

const auth = require("../middlewares/auth");

//Routes:
router.route("/").get(fetchPickups).post(auth, createPickup);
router.route("/:id").delete(auth, deletePickups)

module.exports = router;