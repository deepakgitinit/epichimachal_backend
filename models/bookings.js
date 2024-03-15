const mongoose = require('mongoose');

const bookings = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User ID is required."]
    },
    email: String,
    name: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: ""
    },
    pickup: String,
    destination: String,
    passengers: String,
    fromdate: Date,
    todate: Date,
    car: String,
    status: {
        type: String,
        default: "Pending"
    },
    packages: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("bookings", bookings);