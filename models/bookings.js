const mongoose = require('mongoose');

const bookings = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "User ID is required."]
    },
    email: String,
    pickup: String,
    destination: String,
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