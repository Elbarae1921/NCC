const mongoose = require('mongoose');


let staffSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});


let Staff = module.exports = mongoose.model('Staff', staffSchema, 'staff');