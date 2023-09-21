const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
//const mongoose = require('./db'); // Import the database connection setup
//const User = require('./models/user'); // Import the User model
const Product = require('../models/product'); 

const cart = new Cart(); // Create a cart instance
const app = express();
const port = 3002;

// Middleware to parse JSON request bodies
router.use(express.json());

router.post('/add/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    // Check if 'quantity' is present in 'req.body'
    if ('quantity' in req.body) {
      const { quantity } = req.body;
  
      try {
        // Fetch the actual product from the database using Mongoose
        const product = await Product.findById(productId);
  
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        // Now you have the actual product details to add to the cart
        cart.addItem({
          id: productId,
          name: product.name,
          price: product.price,
        }, quantity);
  
        res.json({ message: 'Product added to cart successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      // Handle the case where 'quantity' is not present in 'req.body'
      res.status(400).json({ message: 'Missing or invalid quantity' });
    }
  });
  
  
// Route to view the cart
router.get('/view', (req, res) => {
  const cartItems = cart.getItems();
  res.json({ cartItems });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  

module.exports = router;
