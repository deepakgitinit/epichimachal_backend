const mongoose = require("mongoose");

const users = new mongoose.Schema({
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
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    profile: {
        type: String,
        default: ""
    },
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