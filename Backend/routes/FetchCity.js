const express = require('express');
const router = express.Router();
const FoodDonation = require('../models/FoodDonation');

// Route to fetch food donations by city
router.get('/donations/:city', async (req, res) => {
    const { city } = req.params;

    try {
        // Find all donations matching the city name (case insensitive)
        const donations = await FoodDonation.find({ city: { $regex: new RegExp(city, "i") } });

        if (donations.length === 0) {
            return res.status(404).json({ message: "No donations found for the specified city." });
        }

        res.json(donations);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
