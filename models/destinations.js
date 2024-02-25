const mongoose = require("mongoose");

const destinations = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title cannot be empty"],
        trim: true
    },
    description: String,
    tags: Array,
    images: Array
})

module.exports = mongoose.model("destination", destinations);