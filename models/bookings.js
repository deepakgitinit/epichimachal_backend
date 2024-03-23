const mongoose = require('mongoose');

const bookings = new mongoose.Schema({
    userid: String,
    email: String,
    name: String,
    phone: String,
    pickup: String,
    destinations: [],
    passengers: String,
    fromdate: Date,
    todate: Date,
    taxi: String,
    status: {
        type: String,
        default: "Pending"
    },
    package: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("bookings", bookings);