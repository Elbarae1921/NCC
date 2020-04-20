//import express
const express = require('express');
//get validation utility
const validate = require('./../util/validation');
// get checkin controller
const personController = require('./../controllers/personController');



//initialize the router
const router = express.Router();






//routes ==>

//GET => /api/checkin?firstName={val}&familyName={val}&city={val} all query params are optional, but at least one must be set
router.get('/', personController.getPerson);

// POST => /api/checkin
router.post('/', validate('checkin') , personController.checkIn);





module.exports = router;