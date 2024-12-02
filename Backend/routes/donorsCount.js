// routes/donors.js
const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const mongoose = require('mongoose');
const User = require('../models/User');

// Define the schema for storing the donor count if not already defined in a separate model file
const donorCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    }
});
const DonorCount = mongoose.model('DonorCount', donorCountSchema);

// Route to add a donor and increment the count
router.post('/adddonor', async (req, res) => {
    try {
        const { name, donationAmount } = req.body;

        // Create a new donor entry
        const newDonor = new Donor({ name, donationAmount });
        await newDonor.save();

        // Update the donor count
        let donorCountDoc = await DonorCount.findOne();
        if (!donorCountDoc) {
            donorCountDoc = new DonorCount({ count: 1 });
        } else {
            donorCountDoc.count += 1;
        }
        await donorCountDoc.save();

        res.status(201).json({ message: 'Donor added!', count: donorCountDoc.count });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route to get the current donor count
// Route to get the current donor count and total donation amount
router.get('/count', async (req, res) => {
    try {
        // Fetch donor count
        const donorCountDoc = await DonorCount.findOne();
        const donorCount = donorCountDoc ? donorCountDoc.count : 0;

        // Fetch registered user count
        const donationCount = await User.countDocuments();

        res.json({ count: donorCount, donationCount });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
