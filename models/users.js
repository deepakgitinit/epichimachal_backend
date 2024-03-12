const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        isEmail: true,
        required: [true, "Email required."],
    },
    password: {
        type: String,
        required: [true, "Password required"]
    },
    phone: {
        type: String,
    },
    address: String,
    profile: String,
    role: {
        type: String,
        uppercase: true,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    subscription: {
        type: Boolean,
    }
})

module.exports = mongoose.model("users", users);