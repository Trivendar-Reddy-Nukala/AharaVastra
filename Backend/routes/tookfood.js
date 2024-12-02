const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const FoodDonation = require('../models/FoodDonation');
const CharityHistory = require('../models/CharityHistory'); // New model for saving history

// Save donation to charity history
router.post('/tookfood', async (req, res) => {
    try {
        const { donationId } = req.body;
        const charityId = req.user.id; // Assuming authentication middleware adds user info to req

        // Fetch the donation details
        const donation = await FoodDonation.findById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }

        // Save to history
        const history = new CharityHistory({
            charityId,
            donationId,
            details: donation
        });
        await history.save();

        // Optionally delete the donation from the active list
        await FoodDonation.findByIdAndDelete(donationId);

        res.json({ message: 'Donation saved to history successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
