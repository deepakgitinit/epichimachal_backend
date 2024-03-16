const mongoose = require("mongoose");

const packages = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name cannot be empty"],
        trim: true,
        // maxLength: [50, "Max length is 50 characters"],
        // default: false
    },
    price: {
        type: Number,
        required: [true, "Price cannot be empty"]
    },
    category: Array,
    tags: Array,
    destinations: Array,
    time: String,
    thumbnail: String,
    description: String
})

module.exports = mongoose.model("package", packages);