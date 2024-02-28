const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username cannot be empty."],
    },
    password: String,
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email required."],
    },
    phone: {
        type: String,
        unique: true,
    },
    address: String,
    profile: String,
    role: {
        type: String,
        uppercase: true,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
})

module.exports = mongoose.model("users", users);