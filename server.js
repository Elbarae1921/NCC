//package that loads environment variables
require('dotenv').config();


//getting environment variables
const PORT = process.env.PORT || 5000; //port
const PASSWORD = process.env.MONGODB_PASSWORD; //mongoDB passwordx









//NodeJS webapp framework
const express = require('express');
//MongoDB object modeling tool
const mongoose = require('mongoose');
//package for parsing incoming request bodies.
const bodyParser = require('body-parser');
//package for getting IP information using geoip-lite
const expressIp = require('express-ip');




//initializing the server instance
const server = express();









//connecting to the database
mongoose.connect(`mongodb+srv://publicUser:${PASSWORD}@cluster0-p8xqm.mongodb.net/CNC?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//check for db errors
db.on('error', err => {
    console.log(err);
});









//importing the routers
const checkinRouter = require("./routes/checkinRoutes");
const weatherRouter = require("./routes/weatherRoutes");
const organizationRouter = require("./routes/organizationRoutes");
const staffRouter = require("./routes/staffRoutes");
const documentationRoutes = require('./routes/documentationRoutes');
const contactRoutes = require('./routes/contactRoutes');









//parse IP information for every request (under req.ipInfo)
server.use(expressIp().getIpInfoMiddleware);

//parse incoming request bodies in a middleware before the handlers (available under the req.body)
server.use(bodyParser.urlencoded({extended: false}));








/*--------------------------------------------HANDELING THE ROUTES--------------------------------------------*/

//-----DOCUMENTATION
// GET => localhost:5000/api/ : api documentation  //get the documentation object from the utilities folder
server.use('/api', documentationRoutes);

//-----CONTACT ROUTE
// GET => localhost:5000/api/contact/
server.use('/api/contact', contactRoutes);

//-----PERSON ROUTES (NO AUTH)
//GET => /api/checkin/*
server.use('/api/checkin', checkinRouter);

//-----WEATHER ROUTES (NO AUTH)
//GET => /api/weather?city=Kabukicho
server.use('/api/weather', weatherRouter);

//-----ORGANIZATION ROUTES (AUTH KEY)
//POST => /api/organization/*
server.use('/api/organization', organizationRouter);

//-----STAFF ROUTES (AUT)
//ROUTE ==> /api/staff/*'
server.use('/api/staff', staffRouter);












/*-----------------------------CONNECTING TO THE DATABASE AND STARTING THE SERVER----------------------------*/

//event fires when connected to the Database
db.once('open', () => {

    console.log("connected to MongoDB...");

    //start the server on port 5000 only after the connection to the database has been established
    server.listen(PORT, () => console.log(`running on ${PORT}...`));
});