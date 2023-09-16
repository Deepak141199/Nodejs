const express = require('express');
const mongoose = require('./db'); // Import the database connection setup
const User = require('./models/user'); // Import the User model
const Product = require('./models/product'); // Import the Product model

const app = express();
const port = 3001;

// Middleware
app.use(express.json());

// Authenticate a user
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Here, you can generate a token for authentication
    // For simplicity, we'll just send a success message
    res.status(200).json({ message: 'Authentication successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to retrieve and display products
app.get('/products', async (req, res) => {
    try {
      // Retrieve all products from the database
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Retrieve an individual product by ID
app.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    
    // Find the product by ID
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    
    // Create a new product document
    const product = new Product({ name, price });
    
    // Save the product to the database
    await product.save();
    
    res.status(201).json(product); // Respond with the created product
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
