const express = require("express");
const app = express();
const cors = require('cors');

const connectDB = require("./db/connect");

// Routes
const packages = require('./routes/packages.js');
const destinations = require("./routes/destinations.js");
const users = require("./routes/users.js");
const bookings = require("./routes/bookings.js");

//Environment Variables
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.DB_URI;
const port = process.env.APP_PORT;

//Middlewares
app.use(cors());
app.use('/public', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.use("/api/v1/packages", packages);
app.use("/api/v1/destinations", destinations)
app.use("/api/v1/users", users)
app.use("/api/v1/bookings", bookings)

const start = async () =>{
    try {
        await connectDB(uri);
        app.listen(port, ()=>{
            console.log(`Application is Running on port: ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();