// cart.js
export let cart = [];

// Function to load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
}

// Initialize cart from localStorage
cart = loadCart();

// Function to save cart to localStorage
export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
