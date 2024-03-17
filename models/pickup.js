const mongoose = require("mongoose");

const pickups = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Title cannot be empty"],
        trim: true
    },
})

module.exports = mongoose.model("pickup", pickups);