//package for encryption
const bcrypt = require('bcrypt');
//importing input validation module
const expressValidator = require('express-validator');



//importing MongoDB Models
const Organization = require('./../models/Organization');
const Person = require('./../models/Person');









// POST => /api/organization/register
const register = (req, res, next) => {

    //get all the params sent with the post request
    const {email, phone, name, password} = req.body;

    //get array of errors from previous validation middleware
    const errors = expressValidator.validationResult(req);

    //check if there are no errors
    if(errors.isEmpty()) {
        //check if the email corresponds to an already registered organization
        Organization.findOne({email}, (err, organization) => {

            if(err) { //handle database errors
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Error while registering organization."
                    }]
                });
            }
            else {
                if(organization) { //if there is an organization with the same email
                    //send back an error
                    res.json({
                        errors: [{
                            msg: "This email corresponds to an already registered organization."
                        }]
                    });
                }
                else { //if there is no organization with the same email

                    //hash the password first
                    bcrypt.hash(password, 10, (err, hash) => { //continue storing procedure after password is hashed

                        if(err) {
                            console.log(err);
                            res.json({ //handle any error during the hashing procedure
                                errors: [{
                                    msg: "Error while registering organization."
                                }]
                            });
                        }
                        else {
                            let org = new Organization({email, phone, name, password: hash}); //create new organization

                            org.save((err, orga) => { //save the new organization to the database
                                if(err) {
                                    console.log(err); //handle errors gracefully
                                    res.json({
                                        errors: [{
                                            msg: "Error while registering organization."
                                        }]
                                    });
                                }
                                else {
                                    res.json({
                                        key: orga.id  //send back the new organization's key
                                    });
                                }
                            });
                        }
                    });

                }
            }
        });
    }
    else {  //if one of the params was not valid
        res.json(errors);
    }
}









//POST => /api/login
const login = (req, res, next) => {
    
    //get request params
    const {email, password} = req.body;

    //get input validation errors
    const errors = expressValidator.validationResult(req);

    //check if there were no validation errors
    if(errors.isEmpty()) {
        //fetch organization with the emaill
        Organization.findOne({ email }, (err, organization) => {
            //handle database errors
            if(err) {
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Error while fetching organization."
                    }]
                });
            }
            else {
                //check if there is any organization with the same email
                if(organization) {
                    //if so check if the password matches the stored hash
                    bcrypt.compare(password, organization.password, (err, doesMatch) => {
                        //if the passwords do match
                        if(doesMatch) {
                            //send back the key
                            res.json({
                                key: organization.id
                            });
                        }
                        else {
                            //else send back incorrect password error
                            res.json({
                                errors: [{
                                    msg: "The password you provided is incorrect"
                                }]
                            })
                        }
                    });                    
                }
                else { //if no organzation with the same email was found
                    res.json({
                        errors: [{ //send back error
                            msg: "This email is not registered."
                        }]
                    });
                }
            }
        });
    }
    else { //if there were validation errors
        res.json(errors); //send back the errors
    }
}









//middleware to verify the login token/key
const verifyKey = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];

    //check if it's undefined
    if(bearerHeader) {
        //split the bearer into array
        const bearer = bearerHeader.split(' ');

        //get key from array
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

        //next middleware
        next();
    }
    else {
        //Forbidden
        res.status(403).json({
            errors: [{
                    msg: "You can't use this route without a key."
                }]
        });
    }
}









// POST => /api/organization/checkin middleware
const checkin = (req, res, next) => {
    
    //check if the request body is an array
    if(req.body && Array.isArray(req.body)) {
        // check if the array has any elements
        if(req.body.length) {
            // validate the array
            const valid = req.body.every(x => {
                // check if it has firstName, familyName and city properties and their types are string
                let basic = typeof x.firstName === "string" & typeof x.familyName === "string" & typeof x.city === "string";

                let fm = true;
                // check if there is a familyMembers prop
                if(x.hasOwnProperty("familyMembers")) {
                    // check if it's just a string
                    if(typeof x.familyMembers === "string") {
                        x.familyMembers = [x.familyMembers];
                        fm = true;
                    } // or if it's an array
                    else if(Array.isArray(x.familyMembers)) {
                        // check if the familyMembers array is not empty
                        if(x.familyMembers.length !== 0)
                            fm = x.familyMembers.every(x => typeof x === "string");// if not check if all the elements are strings
                    }
                    else {
                        x.familyMembers = [];
                    }
                }
                else {
                    x.familyMembers = [];
                }

                return fm && basic;
            });
            if(!valid) { // send back error and exit if the array was not valid
                return res.json({
                    errors:[{
                        msg: "Please send a valid array of checkins."
                    }]
                });
            }
        }
        else { // send back error and exit
            return res.json({
                errors:[{
                    msg: "Please send a valid array of checkins."
                }]
            });
        }
    }
    else { // send back error and exit
        return res.json({
            errors:[{
                msg: "Please send a valid array of checkins."
            }]
        });
    }

    // if the array of checkins is valid, 
    // sanitize the array from other properties (if there is) and save it to a constant
    const checkins = req.body.map(x => {
        return {
            firstName: x.firstName,
            familyName: x.familyName,
            city: x.city,
            familyMembers: x.familyMembers
        };
    });
    // proceed to saving to database
    // check if there is an organization with the same token/id
    Organization.findById(req.token, (err, organization) => {
        if(err) { //handle database errors
            console.log(err);
            res.json({
                errors: [{
                    msg: "Error while fetching informatin info."
                }]
            });
        }
        else {

            if(organization) { //check if the key belons to an organization
                //create a new Person array
                //IP informations are commented out because this won't work on localhost, must uncomment on production server
                let persons = checkins.map(x => {
                    return new Person({
                        ...x, // spread the previous information (firstName, familyN...etc)
                        fromOrg: true,
                        org: organization.name, // current organization name
                        // ip: req.ipInfo.ip,
                        ip: "13.56.310.35",
                        //timezone: req.ipInfo ? req.ipInfo.timezone || "N/A" : "N/A",
                        timezone: "Africa/Casablance",
                        //country: req.ipInfo ? req.ipInfo.country || "N/A" : "N/A",
                        country: "MA",
                        //city: req.ipInfo ? req.ipInfo.city || "N/A" : "N/A",
                        cityL: "Agadir",
                        //region: req.ipInfo ? req.ipInfo.region || "N/A" : "N/A",
                        region: "06",
                        //latitude: req.ipInfo ? req.ipInfo.ll ? req.ipInfo.ll[0] || "N/A" : "N/A" : "N/A",
                        latitude: "30.213",
                        //longitude: req.ipInfo ? req.ipInfo.ll ? req.ipInfo.ll[1] || "N/A" : "N/A" : "N/A",
                        longitude: "-7.467"
                    });
                });
                //save the new person to the database
                Person.insertMany(persons, (err, docs) => {

                    if(err) { //check for error, and send it back as a response
                        console.log(err);
                        res.json({
                            errors: [{
                                msg: "Error while saving persons."
                            }]
                        });
                    }
                    else { //if the save was successful send back the person object as a response
                        //restructure the object in such a way to be easier to manipulate in the client side
                        res.json(docs.map(person => {
                            return {
                                available: {//available info
                                    firstName : person.firstName,
                                    familyName : person.familyName,
                                    familyMembers : person.familyMembers,
                                    city : person.city,
                                    status : person.status,
                                    fromOrg: person.fromOrg,
                                    org: person.org || ""
                                },
                                location: {//locations info
                                    ip : person.ip,
                                    timezone : person.timezone,
                                    country : person.country,
                                    city : person.cityL,
                                    region : person.region,
                                    latitude : person.latitude,
                                    longitude : person.longitude
                                }
                            }
                        }));
                    }

                });
            }
            else { //if there's no organization with the given key
            res.json({
                errors: [{
                    msg: "Invalid key."
                }]
            });
            }
        }
    });
    
}






module.exports = {
    register,
    login,
    verifyKey,
    checkin
}