const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const FoodDonation = require('../models/FoodDonation');

// Route to add a new food donation
router.post(
    '/addfood',
    [
        // Validation rules
        body('name', 'Name must be at least 2 characters long').isLength({ min: 2 }),
        body('email', 'Please enter a valid email address').isEmail(),
        body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        body('address', 'Address is required').notEmpty(),
        body('city', 'City is required').notEmpty(), // Validation for the city field
        body('description', 'Description must be at least 10 characters long').isLength({ min: 10 }),
        body('contactNumber', 'Please enter a valid contact number')
            .isLength({ min: 10 })
            .matches(/^\+?[1-9]\d{1,14}$/),
    ],
    async (req, res) => {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, address, city, description, contactNumber } = req.body;

            // Check if email already exists (optional based on requirements)
            const existingDonation = await FoodDonation.findOne({ email });
            if (existingDonation) {
                return res.status(400).json({ error: 'This email is already registered.' });
            }

            // Create and save the food donation entry
            const foodDonation = new FoodDonation({
                name,
                email,
                password,
                address,
                city,
                description,
                contactNumber,
            });

            const savedDonation = await foodDonation.save();

            res.status(201).json({
                message: 'Donation registered successfully',
                donation: savedDonation,
            });
        } catch (error) {
            console.error('Error saving food donation:', error.message);

            if (error.code === 11000) {
                return res.status(400).json({ error: 'Duplicate entry detected.' });
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);
// Fetch all food donations
router.get('/fetchallfoods', async (req, res) => {
    try {
        const donations = await FoodDonation.find();
        res.json(donations);
    } catch (error) {
        console.error('Error fetching donations:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
