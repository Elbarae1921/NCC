//import express
const express = require('express');
//get validation utility
const validate = require('./../util/validation');
// get staff controller
const staffController = require('./../controllers/staffController');



//initialize the router
const router = express.Router();






//routes ==>

//login route
router.post('/login', validate('login'), staffController.login);

//get checkins /api/staff/checkins?match='Jack'
router.get('/checkin', staffController.verifyToken, staffController.checkins);

//delete checkin
router.delete('/checkin', validate("del"), staffController.verifyToken, staffController.checkinDelete);

//change password
router.post('/password', validate("changePass"), staffController.verifyToken, staffController.changePassword);

//get partner
router.get('/partner', staffController.verifyToken, staffController.partners);

//delete partner
router.delete('/partner', validate("del"), staffController.verifyToken, staffController.partnerDelete);

//get contact
router.get('/contact', staffController.verifyToken, staffController.contacts);

//delete contact
router.delete('/contact', validate("del"), staffController.verifyToken, staffController.contactDelete);





module.exports = router;