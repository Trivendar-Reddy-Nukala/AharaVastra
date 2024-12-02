const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharityInfoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    }
});

const CharityInfo = mongoose.model('CharityInfo', CharityInfoSchema);
module.exports = CharityInfo;
