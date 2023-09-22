const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoDBUrl = 'mongodb://127.0.0.1:27017/admin';

// Establish the MongoDB connection
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notifications of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export the database connection
module.exports = db;
