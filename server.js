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

//package to validate input fields
const expressValidator = require('express-validator');




//initializing the server instance
const server = express();









//connecting to the database
mongoose.connect(`mongodb+srv://publicUser:${PASSWORD}@cluster0-p8xqm.mongodb.net/CNC?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//check for db errors
db.on('error', err => {
    console.log(err);
});









//importing the controllers that contains all functionality
const personController = require('./controllers/personController');
const weatherController = require('./controllers/weatherController');
const organizationController = require('./controllers/organizationController');









//parse IP information for every request (under req.ipInfo)
server.use(expressIp().getIpInfoMiddleware);

//parse incoming request bodies in a middleware before the handlers (available under the req.body)
server.use(bodyParser.urlencoded({extended: false}));









//function to validate input
const validate = method => {
    switch (method) {

        case 'checkin': { // checkin validation, the request requires all 3 fields
          return [
              expressValidator.body('familyName', 'Family name is required').exists().trim(),
              expressValidator.body('firstName', 'First Name is required').exists().trim(),
              expressValidator.body('city', 'City is required required').exists().trim()
          ]
        }
        case 'registerOrg' : { // organization register validation
            return [
                expressValidator.body('email', 'The email is required').exists().trim().isEmail().normalizeEmail(),
                expressValidator.body('name', 'The organization name is required').exists().trim(),
                expressValidator.body('phone', 'The phone number is required').exists().trim().isMobilePhone(),
                expressValidator.body('password', 'The password is required').exists().trim()
            ]
        }
        case 'loginOrg' : {  // organization login validation
            return [
                expressValidator.body('email', 'The email is required').exists().trim().isEmail(),
                expressValidator.body('password', 'The password is required').exists().trim()
            ]
        }
        case 'weather' : { // weather validation
            return [
                expressValidator.query('city', 'A city must be chosen in order to fetch weather data.').exists().trim().isString()
            ]
        }        
    }
}









// GET => localhost:5000/api/howto ----------------DOCUMENTATION-----------------

server.get('/api', (req, res, next) => {
    
    // api documentation 
    res.json({desc:"API Documentation",routes:[{route:'/api/person',desc:'search for a person by firstname, familyname, or city',method:'GET',param_type:'query',params:[{name:"firstName",required:false},{name:"familyName",required:false},{name:"city",required:false}],response:'json',example:'/api/person?firstName=John&familyName=Snow&city=Winterfell'},{route:'/api/checkin',desc:'check yourself in',method:'POST',param_type:'urlencoded form data',params:[{name:"firstName",required:true},{name:"familyName",required:true},{name:"city",required:true}],response:'json'},{route:'/api/weather',desc:'get the weather data of a city for up to 13 days',method:'GET',param_type:'query',params:[{name:"city",required:true}],response:'json',example:'/api/weather?city=Winterfell'},{route:'/api/organization/register',desc:'regitser organization to get an api key',method:'POST',param_type:'urlencodedformdata',params:[{name:"email",required:true},{name:"password",required:true},{name:"name",required:true},{name:"phone",required:true}],response:'json'},{route:'/api/organization/login', desc: 'organzation login to get api key',method:'POST',param_type:'urlencoded form data',params:[{name:"email",required:true},{name:"password",required:true}],response:'json'},{route:'/api/organization/checkin', desc: 'check a person in if you\'re an organization',method:'POST',param_type:'urlencodedformdata',header:'Authorization: Bearer <ORGANIZATION_KEY>',params:[{name:"firstName",required:true},{name:"familyName",required:true},{name:"city",required:true}],response:'json'}]})
});









/*--------------------------------------------HANDELING THE ROUTES--------------------------------------------*/

/*-------------------------------------------PERSON ROUTES (NO AUTH)------------------------------------------*/



//GET => /api/person?firstName={val}&familyName={val}&city={val} all query params are optional, but at least one must be set
server.get('/api/person', personController.getPerson);


// POST => /api/checkin
server.post('/api/checkin', validate('checkin') , personController.checkIn);









/*-------------------------------------------WEATHER ROUTES (NO AUTH)------------------------------------------*/



//GET => /api/weather?city=Kabukicho  city param is required
server.get('/api/weather', validate('weather'), weatherController.getWeather);









/*---------------------------------------ORGANIZATION ROUTES (AUTH KEY)---------------------------------------*/



//register new organisation
//POST => /api/organization/register
server.post('/api/organization/register', validate('registerOrg'), organizationController.register);


//organization login => get organization key
//POST => /api/organization/login
server.post('/api/organization/login', validate('loginOrg'), organizationController.login);


//requires a key, which is verified in the verifyKey middleware
//POST => /api/organization/checkin
server.post('/api/organization/checkin', organizationController.verifyKey, validate('checkin'), organizationController.checkin);








/*------------------------------CONNECTING TO THE DATABASE AND STARTING THE SERVER------------------------------*/



//event fires when connected to the Database
db.once('open', () => {

    console.log("connected to MongoDB...");

    //start the server on port 5000 only after the connection to the database has been established
    server.listen(PORT, () => console.log('running on 5000...'));
});
