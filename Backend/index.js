const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

const app = express();
const port = 5000;

connectToMongo();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/food', require('./routes/AddFoodttoDB')); 
app.use('/api/charity', require('./routes/charity')); 
app.use('/api/donors', require('./routes/donorsCount'));

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Server listening
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
