const mongoose = require('mongoose');


let contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    message : {
        type: String,
        required: true
    }
});


let Contact = module.exports = mongoose.model('Contact', contactSchema, 'contact');