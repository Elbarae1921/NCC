//import express
const express = require("express");
//import the validation function
const validate = require('./../util/validation');
// get weather controller
const contactController = require('./../controllers/contactController');



//initialize the router
const router = express.Router();






//routes ==>

//POST => /api/contact
router.post('/', validate('contact'), contactController.contact);


module.exports = router;