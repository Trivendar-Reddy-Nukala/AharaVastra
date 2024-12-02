const mongoose = require('mongoose');
const { Schema } = mongoose;

const DonorSchema = new Schema({
    donationAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Donor = mongoose.model('Donor', DonorSchema);

module.exports = Donor;
