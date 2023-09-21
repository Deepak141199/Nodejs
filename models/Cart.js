class Cart {
    constructor() {
      this.items = []; // Array to store cart items
    }
  
    addItem(product, quantity) {
      // Check if the product is already in the cart
      const existingItem = this.items.find((item) => item.product.id === product.id);
  
      if (existingItem) {
        // If the product is already in the cart, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it as a new item
        this.items.push({ product, quantity });
      }
    }
  
    getItems() {
      return this.items;
    }
  }
  
  module.exports = Cart;
  