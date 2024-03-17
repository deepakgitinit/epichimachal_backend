const mongoose = require("mongoose");

const taxies = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Title cannot be empty"],
        trim: true
    },
    type: String,
    number: {
        type: Number,
        default: 1,
    },
    image: String,
})

module.exports = mongoose.model("taxi", taxies);