//importing input validation module
const expressValidator = require('express-validator');
 



//importing MongoDB Models
const Person = require('./../models/Person');









// GET => /api/person?firstName=Jack&familyName=Sparrow middleware

const getPerson = (req, res, next) => {

    //get params values from query e.g : ?firstName=value&familyName=value&city=value
    const familyName = req.query.familyName ? req.query.familyName.trim() : undefined;
    const firstName = req.query.firstName ? req.query.firstName.trim() : undefined;
    const city = req.query.city ? req.query.city.trim() : undefined;

    //initialize the person object we're using for comparison
    const personMatch = {}; 

    //checking if at least one field is set
    if(firstName || familyName || city) {

        //adding only defined values to the object to avoid any errors during comparison (undefined values WILL mess the comparison)
        if(firstName)
            personMatch.firstName = firstName;
        if(familyName)
            personMatch.familyName = familyName;
        if(city)
            personMatch.city = city;

        //searching for people that match our object
        Person.find(personMatch, (err, persons) => {
            if(err) { //handlind database errors
                console.log(err);
                res.json({   //send back error
                    errors: [{
                        msg: "Error while fetching persons."
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
                        name : `${person.familyName.toUpperCase()} ${person.firstName}`
                    }
                });
                res.json({
                    persons: response
                });
            }
                
        })
    }
    else { //if none of the params is set
        res.json({   //send back error
            errors: [{
                msg: "Please provide at least one field."
            }]
        });
    }
}













// POST => /api/checkin middleware

const checkIn = (req, res, next) => {

    //get validation errors
    const errors = expressValidator.validationResult(req);

    //check if there is any validation error
    if(!errors.isEmpty()) 
        res.json(errors); //send back the errors
    else {
        //get all the params sent with the post request
        const {firstName, familyName,city} = req.body;

        //check if the familyMembers is an array (more than one), if it's not push it inside a new array, and if it's undefined create a new empty array (familyMembers must always be an array)
        const familyMembers = Array.isArray(req.body.familyMembers) ? req.body.familyMembers.includes("undefined") || req.body.familyMembers.includes("") ? req.body.familyMembers.filter(fm => fm != "undefined" && fm != "").map(fm => {return fm.trim()}) : req.body.familyMembers.map(fm => {return fm.trim()}) : req.body.familyMembers === undefined || req.body.familyMembers === "" || req.body.familyMembers === "undefined" ? [] : [req.body.familyMembers.trim()];
        
        
        //create a new Person
        //IP informations are commented out because this won't work on localhost, must uncomment on production server
        let person = new Person({
                firstName,
                familyName,
                familyMembers,
                city,
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

        //save the new person to the database
        person.save((err, person) => {

            if(err) { //check for error, and send it back as a response
                console.log(err);
                res.json({
                    errors: [{
                        msg: "Error while registering person."
                    }]
                })
            }
            else { //if the save was successful send back the person object as a response
                res.json({//restructure the object in such a way to be easier to manipulate in the client side
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
                });
            }
        });
    }
}

module.exports = {
    getPerson,
    checkIn
}