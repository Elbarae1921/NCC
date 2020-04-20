//package to validate input fields
const expressValidator = require('express-validator');



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
        case 'login' : {  // organization/staff login validation
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
        case 'del' : { // checkin delete validation
            return [
                expressValidator.body('id', 'ID is required.').exists().trim().isString()
            ]
        }
        case 'changePass': { // password change validation
          return [
              expressValidator.body('oldpass', 'Old password is required.').exists().trim(),
              expressValidator.body('newpass', 'New password is required.').exists().trim(),
              expressValidator.body('newpass', 'Password must be at least 6 characters long.').isLength({min: 6}),
              expressValidator.body('confirmation', 'New password confirmation is required.').exists().isLength({min: 6}).trim()
          ]
        } 
        case 'contact' : { // contact validation
            return [
                expressValidator.body('name', 'The name must be at least 2 characters long.').exists().trim().isString().isLength({min: 2}),
                expressValidator.body('email', 'The email is required.').exists().trim().isEmail(),
                expressValidator.body('message', 'The message must be at least 50 characters long.').isLength({min: 50}),
            ]
        }    
    }
}

module.exports = validate;