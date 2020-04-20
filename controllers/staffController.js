require('dotenv').config(); // to load environment variables

//package for encryption
const bcrypt = require('bcrypt');
//importing input validation module
const expressValidator = require('express-validator');
//package for authentication/authorization tokens
const jwt = require('jsonwebtoken');

//getting environment variables
const TOKEN_KEY = process.env.TOKEN_KEY; //token creation secret key



//importing MongoDB Model
const Staff = require('./../models/Staff');
const Person = require('./../models/Person');
const Organization = require("./../models/Organization");
const Contact = require("./../models/Contact");









//login middleware
const login = (req, res, next) => {
    //get the request body params
    const {email, password} = req.body;

    //get validation errors
    const errors = expressValidator.validationResult(req);

    //check errors
    if(errors.isEmpty()) {

        //check if staff member exists
        Staff.findOne({email}, (err, staff) => {
            if(err) {
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Error while retrieving account information."
                    }]
                });
            }
            else {
                if(staff) { //if there is a match
                    //check if the password is valid
                    bcrypt.compare(password, staff.password, (err, doesMatch) => {
                        if(err) { //send back errors
                            console.log(err);
                            res.json({
                                errors: [{
                                    msg: "Error while retrieving account information."
                                }]
                            });
                        }
                        else {
                            if(!doesMatch) { //if passwords do not match
                                res.json({
                                    errors: [{
                                        msg: "Email or password invalid."
                                    }]
                                });
                            }
                            else { // if the login was fine
                                //generate a token
                                jwt.sign({id: staff.id}, TOKEN_KEY, {expiresIn: '1h'}, (err, token) => {
                                    if(err) { //check for errors during token creation
                                        res.json({
                                            errors: [{
                                                msg: "Error while logging in."
                                            }]
                                        });
                                    }
                                    else {
                                        //send back the token
                                        res.json({
                                            token
                                        });
                                    }
                                });
                            }
                        }
                    })
                }
                else {
                    res.json({
                        errors: [{
                            msg: "Email or password invalid."
                        }]
                    });
                }
            }
        })
    }
    else { //if there were validation errors
        res.json(errors); //send back the errors
    }
}








const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];

    //check if it's undefined
    if(bearerHeader) {
        //split the bearer into array
        const bearer = bearerHeader.split(' ');

        //get key from array
        const bearerToken = bearer[1];

        if(bearerToken) { //check if it's valid

            //check if the token data is valid
            jwt.verify(bearerToken, TOKEN_KEY, (err, decoded) => {
                if(err) {
                    res.status(403).json({
                        errors: [{
                                msg: "Invalid token."
                            }]
                    });
                }
                else { //find if the data encoded inside the token corresponds to a staff member
                    Staff.findOne({_id: decoded.id}, (err, staff) => {
                        if(err) { //database errors
                            console.log(err);
                            res.status(403).json({
                                errors: [{
                                        msg: "Error while verifying token."
                                    }]
                            });
                        }
                        else {
                            if(staff) { //if a valid staff member was found
                                req.token = bearerToken; //set the token in the request object for future usage
                                req.user = decoded.id; //set the identity of the user
                                next(); // call next middleware
                            }
                            else {
                                //Forbidden
                                res.status(403).json({
                                    errors: [{
                                            msg: "Invalid token."
                                        }]
                                });
                            }
                        }
                    });
                }
            });
        }
        else {
            //Forbidden
            res.status(403).json({
                errors: [{
                        msg: "No token provided."
                    }]
            });
        }
    }
    else {
        //Forbidden
        res.status(403).json({
            errors: [{
                    msg: "No token provided."
                }]
        });
    }
}








const checkins = (req, res, next) => {
    //get request body params
    const match = req.query.match;

    //if the match parameter was given, return checkins that match the value
    if(match) {
        //find checkins that have a field that matches the keyword using regex
        Person.find({$or: [{firstName: {$regex: match, $options: "i"}}, {familyName: {$regex: match, $options: "i"}}, {city: {$regex: match, $options: "i"}}]}, (err, persons) => {
            if(err) { //database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Could not fetch checkins."
                    }]
                });
            }
            else {
                let response = [];
                //mapping the data in such a way that would be easier to manipulate on the client side by dividing it into three objects (available info | location info || name)
                response = persons.map(person => {
                    return {
                        available: {
                            firstName : person.firstName,
                            familyName : person.familyName,
                            familyMembers : person.familyMembers,
                            city : person.city,
                            status : person.status,
                            fromOrg: person.fromOrg,
                            org: person.org || ""
                        },
                        location: {
                            ip : person.ip,
                            timezone : person.timezone,
                            country : person.country,
                            city : person.cityL,
                            region : person.region,
                            latitude : person.latitude,
                            longitude : person.longitude
                        },
                        id: person.id,
                        name : `${person.familyName.toUpperCase()} ${person.firstName}`
                    }
                });
                res.json({
                    persons: response
                });
            }
        });
    }
    else { //if no param was given return all checkins
        Person.find({}, (err, persons) => {
            if(err) { //database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Could not fetch checkins."
                    }]
                });
            }
            else {
                let response = [];
                //mapping the data in such a way that would be easier to manipulate on the client side by dividing it into three objects (available info | location info || name)
                response = persons.map(person => {
                    return {
                        available: {
                            firstName : person.firstName,
                            familyName : person.familyName,
                            familyMembers : person.familyMembers,
                            city : person.city,
                            status : person.status,
                            fromOrg: person.fromOrg,
                            org: person.org || ""
                        },
                        location: {
                            ip : person.ip,
                            timezone : person.timezone,
                            country : person.country,
                            city : person.cityL,
                            region : person.region,
                            latitude : person.latitude,
                            longitude : person.longitude
                        },
                        id: person.id,
                        name : `${person.familyName.toUpperCase()} ${person.firstName}`
                    }
                });
                res.json({
                    persons: response
                });
            }
        })
    }
}








const checkinDelete = (req, res, next) => {
    
    //get request body params
    const id = req.body.id;

    //get validation errors
    const errors = expressValidator.validationResult(req);

    if(errors.isEmpty()) { //if there were no validation errors
        if(id) {
            Person.findById(id, (err, person) => { //find the checkin
                if(err) { //database errors
                    console.log(err);
                    res.json({
                        errors: [{
                            msg: "Could not find checkin"
                        }]
                    });
                }
                else {
                    if(person) { //if a checkin was found
                        //delete checkin
                        Person.findByIdAndDelete(id, (err, deleted) => {
                            if(err) { //database errors
                                onsole.log(err);
                                res.json({
                                    errors: [{
                                        msg: "Could not find checkin."
                                    }]
                                });
                            }
                            else {
                                res.json({ //return the deleted checkin
                                    deleted
                                });
                            }
                        })
                    }
                    else { //if person was not found return notification (not error)
                        res.json({
                            info: [{
                                msg: "Checkin does not exist."
                            }]
                        });
                    }
                }
            })
        }
        else { //if id was undefined
            res.json({
                errors: [{
                    msg: "Could not find checkin."
                }]
            });
        }
    }
    else { //validation errors
        res.json(errors);
    }
}








const changePassword = (req, res, next) => {
    //get Validation errors
    const errors = expressValidator.validationResult(req);
    //get request body params
    const {oldpass, newpass, confirmation} = req.body;

    // if there were no validation errors
    if(errors.isEmpty()) {
        Staff.findById(req.user, (err, staff) => {
            if(err) { //database errors
                res.json({
                    errors: [{
                        msg: "Could not change password."
                    }]
                });
            }
            else {
                if(staff) { //if a valid staff member was found with the id stored in the authentication token
                    bcrypt.compare(oldpass, staff.password, (err, doesMatch) => { //compare passwords
                        if(err) { //encryption error
                            res.json({
                                errors: [{
                                    msg: "Could not change password."
                                }]
                            });
                        }
                        else {
                            if(doesMatch) { //if passwords do match
                                if(newpass === confirmation) { //if new password matches new password confirmation
                                    //check if new password isn't the same old password
                                    bcrypt.compare(newpass, staff.password, (err, newMatchOld) => {
                                        if(err) {
                                            console.log(err)
                                            res.json({
                                                errors: [{
                                                    msg: "Could not change password."
                                                }]
                                            });
                                        }
                                        else {
                                            if(!newMatchOld) { //if new password is not the same as old password
                                                // change password
                                                bcrypt.hash(newpass, 10, (err, encpass) => { //encrypt the password
                                                    if(err) { //encryptions errors
                                                        console.log(err);
                                                        res.json({
                                                            errors: [{
                                                                msg: "Could not change password."
                                                            }]
                                                        });
                                                    }
                                                    else { //change password
                                                        staff.password = encpass;
                                                        staff.save((err, doc) => { //save changes
                                                            if(err) { //database errors
                                                                console.log(err);
                                                                res.json({
                                                                    errors: [{
                                                                        msg: "Could not change password."
                                                                    }]
                                                                });
                                                            }
                                                            else { //success
                                                                res.json({
                                                                    infos: [{
                                                                        msg: "Password changed successfully."
                                                                    }]
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            else {
                                                // if the new password is the same as the old one.
                                                res.json({
                                                    errors: [{
                                                        msg: "Please chose a new password."
                                                    }]
                                                });
                                            }
                                        }
                                    });
                                }
                                else { //if the confirmation doesn't match the new password
                                    res.json({
                                        errors: [{
                                            msg: "New password and confirmation don't match."
                                        }]
                                    });
                                }
                            }
                            else { //if the old password is incorrect
                                res.json({
                                    errors: [{
                                        msg: "The password is incorrect."
                                    }]
                                });
                            }
                        }
                    })
                }
                else { //if no valid staff member was found
                    res.json({
                        errors: [{
                            msg: "Could not change password."
                        }]
                    });
                }
            }
        })
    }
    else { //validation errors
        res.json(errors);
    }
}








const partners = (req, res, next) => {
    //get request body params
    const match = req.query.match;

    //if the match parameter was given, return partners that match the value
    if(match) {
        //find partners that have a field that matches the keyword using regex
        Organization.find({$or: [{email: {$regex: match, $options: "i"}}, {phone: {$regex: match, $options: "i"}}, {name: {$regex: match, $options: "i"}}]}, (err, partners) => {
            if(err) { //database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Could not fetch partners."
                    }]
                });
            }
            else {
                let response = [];
                //mapping the data in such a way that wouldn't send unecesssary data such as passwords to the client
                response = partners.map(partner => {
                    return {
                        name: partner.name,
                        email: partner.email,
                        phone: partner.phone,
                        id: partner.id
                    }
                });
                res.json({
                    partners: response
                });
            }
        });
    }
    else { //if no param was given return all partners
        Organization.find({}, (err, partners) => {
            if(err) { //database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Could not fetch partners."
                    }]
                });
            }
            else {
                let response = [];
                //mapping the data in such a way that wouldn't send unecesssary data such as passwords to the client
                response = partners.map(partner => {
                    return {
                        name: partner.name,
                        email: partner.email,
                        phone: partner.phone,
                        id: partner.id
                    }
                });
                res.json({
                    partners: response
                });
            }
        })
    }
}







const partnerDelete = (req, res, next) => {

    //get request body params
    const id = req.body.id;

    //get validation errors
    const errors = expressValidator.validationResult(req);

    if(errors.isEmpty()) { //if there were no validation errors
        if(id) {
            Organization.findById(id, (err, partner) => { //find the partner
                if(err) { //database errors
                    console.log(err);
                    res.json({
                        errors: [{
                            msg: "Could not find partner"
                        }]
                    });
                }
                else {
                    if(partner) { //if a partner was found
                        //delete partner
                        Organization.findByIdAndDelete(id, (err, deleted) => {
                            if(err) { //database errors
                                onsole.log(err);
                                res.json({
                                    errors: [{
                                        msg: "Could not find partner."
                                    }]
                                });
                            }
                            else {
                                res.json({ //return the deleted partner
                                    deleted
                                });
                            }
                        })
                    }
                    else { //if partner was not found return notification (not error)
                        res.json({
                            info: [{
                                msg: "Partner does not exist."
                            }]
                        });
                    }
                }
            })
        }
        else { //if id was undefined
            res.json({
                errors: [{
                    msg: "Could not find partner."
                }]
            });
        }
    }
    else { //validation errors
        res.json(errors);
    }
}








const contacts = (req, res, next) => {
    //get request body params
    const match = req.query.match;

    //if the match parameter was given, return contacts that match the value
    if(match) {
        //find contacts that have a field that matches the keyword using regex
        Contact.find({$or: [{email: {$regex: match, $options: "i"}}, {name: {$regex: match, $options: "i"}}]}, (err, contacts) => {
            if(err) { //database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Could not fetch contacts."
                    }]
                });
            }
            else {
                let response = [];
                //mapping the data 
                response = contacts.map(contact => {
                    return {
                        name: contact.name,
                        email: contact.email,
                        message: contact.message,
                        id: contact.id
                    }
                });
                res.json({
                    contacts: response
                });
            }
        });
    }
    else { //if no param was given return all contacts
        Contact.find({}, (err, contacts) => {
            if(err) { //database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Could not fetch contacts."
                    }]
                });
            }
            else {
                let response = [];
                //mapping the data 
                response = contacts.map(contact => {
                    return {
                        name: contact.name,
                        email: contact.email,
                        message: contact.message,
                        id: contact.id
                    }
                });
                res.json({
                    contacts: response
                });
            }
        })
    }
}







const contactDelete = (req, res, next) => {

    //get request body params
    const id = req.body.id;

    //get validation errors
    const errors = expressValidator.validationResult(req);

    if(errors.isEmpty()) { //if there were no validation errors
        if(id) {
            Contact.findById(id, (err, partner) => { //find the contact
                if(err) { //database errors
                    console.log(err);
                    res.json({
                        errors: [{
                            msg: "Could not find contact."
                        }]
                    });
                }
                else {
                    if(partner) { //if a contact was found
                        //delete contact
                        Contact.findByIdAndDelete(id, (err, deleted) => {
                            if(err) { //database errors
                                onsole.log(err);
                                res.json({
                                    errors: [{
                                        msg: "Could not find contact."
                                    }]
                                });
                            }
                            else {
                                res.json({ //return the deleted contact
                                    deleted
                                });
                            }
                        })
                    }
                    else { //if contact was not found return notification (not error)
                        res.json({
                            info: [{
                                msg: "Contact does not exist."
                            }]
                        });
                    }
                }
            })
        }
        else { //if id was undefined
            res.json({
                errors: [{
                    msg: "Could not find contact."
                }]
            });
        }
    }
    else { //validation errors
        res.json(errors);
    }
}

module.exports = {
    login,
    verifyToken,
    checkins,
    checkinDelete,
    partners,
    partnerDelete,
    contacts, 
    contactDelete,
    changePassword
};