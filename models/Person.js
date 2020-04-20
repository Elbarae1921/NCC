const mongoose = require('mongoose');


let personSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    familyMembers: {
        type: [String],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "safe",
        required: true
    },
    fromOrg: {
        type: Boolean,
        required: true,
        default: false
    },
    org: {
        type: String,
        required: false
    },
    ip: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    cityL: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
});

let Person = module.exports = mongoose.model('Person', personSchema, 'person');