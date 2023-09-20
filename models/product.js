const mongoose = require('mongoose');

// Product schema
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

// Product model
const Product = mongoose.model('Product', productSchema,'product');

module.exports = Product;
