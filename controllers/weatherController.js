require('dotenv').config(); // to load environment variables

//importing input validation module
const expressValidator = require('express-validator');
//package to make http requests
const axios = require('axios');

//getting environment variables
const API_KEY = process.env.API_KEY; //worldweatheronline.com api key









// GET /api/weather?city=Vinland middleware

const getWeather = (req, res, next) => {

    //get validation errors
    const errors = expressValidator.validationResult(req);

    if(errors.isEmpty()) {//if there is no validation errors

        const city = req.query.city; //get the city parameter
        const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${API_KEY}&q=${encodeURIComponent(city)}&format=json&num_of_days=16`; //set the url
        
        axios.get(url) //fetch the data from the api
        .then(response => { //return the recieved data
            if(response.data.data.error) {//check for errors (e.g city does not exist)
                res.json({
                    errors: [{
                        msg: response.data.data.error[0].msg //return the error as it is
                    }]
                });
            }
            else { //if there are no errors
                res.json(response.data); //return the weather data
            }
        })
        .catch(error => { //check for network errors
            res.json({
                errors: [{
                    msg: "It seems there is something wrong with the server. Please try again later"
                }]
            });
            console.log(error);
        });
    }
    else { //if there is a validation error
        res.json(errors); //send back the errors
    }
}


module.exports = {
    getWeather
}