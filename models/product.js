// Import Mongoose
const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

});

// Create the Product model
const Product = mongoose.model('Product', productSchema,'product');

module.exports = Product;
