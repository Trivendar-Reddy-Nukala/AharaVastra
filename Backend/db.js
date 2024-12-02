const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017'); 
    console.log('Successfully connected to MongoDB!');
    console.log('Mongoose connection state:', mongoose.connection.readyState);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = connectToMongo;