//import express
const express = require('express');
//get validation utility
const validate = require('./../util/validation');
// get weather controller
const weatherController = require('./../controllers/weatherController');



//initialize the router
const router = express.Router();






//routes ==>

//GET => /api/weather?city=Kabukicho  city param is required
router.get('/', validate('weather'), weatherController.getWeather);


module.exports = router;