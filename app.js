const express = require("express");
const app = express();
const cors = require('cors');

const connectDB = require("./db/connect");

// Routes
const packages = require('./routes/packages.js');
const destinations = require("./routes/destinations.js");
const users = require("./routes/users.js");
const bookings = require("./routes/bookings.js");
const taxi = require("./routes/taxi.js");
const pickup = require("./routes/pickup.js");
const contact = require("./routes/contact.js");

//Environment Variables
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.DB_URI;
const port = process.env.APP_PORT;

//Middlewares
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors());
app.use('/public', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routers
app.use("/api/v1/packages", packages);
app.use("/api/v1/destinations", destinations)
app.use("/api/v1/users", users)
app.use("/api/v1/bookings", bookings)
app.use("/api/v1/taxi", taxi)
app.use("/api/v1/pickup", pickup)
app.use("/api/v1/contact", contact)

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