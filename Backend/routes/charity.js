const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const CharityInfo = require('../models/CharityInfo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

// Route to add/register a new charity
router.post(
    '/addcharity',
    [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('address').notEmpty().withMessage('Address is required'),
        body('contactNumber').isLength({ min: 10, max: 15 }).withMessage('Contact number must be valid'),
        body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, address, contactNumber, description } = req.body;

            // Check if charity already exists
            let charity = await CharityInfo.findOne({ email });
            if (charity) {
                return res.status(400).json({ error: "Charity with this email is already registered" });
            }

            // Hash the password before saving
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new charity entry
            charity = new CharityInfo({
                name,
                email,
                password: hashedPassword,
                address,
                contactNumber,
                description
            });

            const savedCharity = await charity.save();
            res.json({ message: 'Charity registered successfully!', charity: savedCharity });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// Route for charity login
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').exists().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const charity = await CharityInfo.findOne({ email });
            if (!charity) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const isMatch = await bcrypt.compare(password, charity.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            const payload = {
                charity: {
                    id: charity.id
                }
            };

            const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

            res.json({
                message: 'Login successful',
                authToken,
                redirectUrl: '/donation-data' // Include the redirection target
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


// Route to fetch all registered charities (Optional, for testing or display)
router.get('/fetchallcharities', async (req, res) => {
    try {
        const charities = await CharityInfo.find();
        res.json(charities);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
