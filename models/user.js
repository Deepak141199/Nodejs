// Import Mongoose
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

// Add a field to store the JWT token
token: String,
  // You can add more fields for user profile information
});

const User = mongoose.model('User', userSchema);

module.exports = User;

