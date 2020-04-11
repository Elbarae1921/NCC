const mongoose = require('mongoose');


let organizationSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});


let Organization = module.exports = mongoose.model('Organization', organizationSchema, 'organization');