//import express
const express = require('express');
//get validation utility
const validate = require('./../util/validation');
// get organizationi controller
const organizationController = require('./../controllers/organizationController');



//initialize the router
const router = express.Router();






//routes ==>

//register new organisation
//POST => /api/organization/register
router.post('/register', validate('registerOrg'), organizationController.register);


//organization login => get organization key
//POST => /api/organization/login
router.post('/login', validate('login'), organizationController.login);


//requires a key, which is verified in the verifyKey middleware
//POST => /api/organization/checkin
router.post('/checkin', organizationController.verifyKey, validate('checkin'), organizationController.checkin);





module.exports = router;