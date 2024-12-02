const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodDonationSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: true
    },
    city: { // Added city field
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid contact number']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const FoodDonation = mongoose.model('FoodDonation', FoodDonationSchema);
module.exports = FoodDonation;
