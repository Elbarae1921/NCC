//import validation module
const expressValidator = require('express-validator');
 



//importing MongoDB Models
const Contact = require('./../models/Contact');





const contact = (req, res, next) => {
    // get request body params
    const {name, email, message} = req.body;
    // get validation errors
    const errors = expressValidator.validationResult(req);

    //check for validation errors
    if(errors.isEmpty()) { //if there are none
        //create new contact
        const contact = new Contact({email, name, message});
        //save contact
        contact.save((err, saved) => {
            if(err) {
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Error while saving contact."
                    }]
                })
            }
            else {
                res.json(contact);
            }
        });
    }
    else {
        res.json(errors);
    }
}

module.exports = {
    contact
}