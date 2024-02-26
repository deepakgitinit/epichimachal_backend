const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const packages = require('./routes/packages.js');
const destinations = require("./routes/destinations.js")

//Environment Variables
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.DB_URI;
const port = process.env.APP_PORT;

//Middlewares
app.use('/public', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.use("/api/v1/packages", packages);
app.use("/api/v1/destinations", destinations)

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