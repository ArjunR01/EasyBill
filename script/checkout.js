
import { items } from './products.js'; 
import { cart } from './cart.js'; 


const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const placeOrderButton = document.getElementById('place-order');

    let cartData = loadCart();

    const updateCartDisplay = () => {
        const totalPrice = cartData.reduce((total, item) => {
            const product = items.find(p => p.product_name === item.productName);
            if (product) {
                const itemPrice = parseFloat(product.price.replace('₹', '').replace('/', '').trim());
                return total + (itemPrice * item.quantity);
            } else {
                console.warn(`Product not found for ${item.productName}`);
                return total;
            }
        }, 0);

        cartItemsList.innerHTML = cartData.map(item => {
            const product = items.find(p => p.product_name === item.productName);
            if (product) {
                const itemPrice = parseFloat(product.price.replace('₹', '').replace('/', '').trim());
                const totalItemPrice = (itemPrice * item.quantity).toFixed(2);
                return `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.product_name}">
                        <div class="cart-item-details">
                            <p class="product-name">${product.product_name}</p>
                            <div class="quantity-controls">
                                <span class="product-total-price">₹${totalItemPrice}</span>
                                <button class="quantity-button decrease" data-product-name="${item.productName}">-</button>
                                <input type="number" value="${item.quantity}" min="1" data-product-name="${item.productName}" class="quantity-input">
                                <button class="quantity-button increase" data-product-name="${item.productName}">+</button>
                                <button class="remove-button" data-product-name="${item.productName}">Remove</button>
                            </div>
                        </div>
                    </div>`;
            } else {
                console.warn(`Product not found for ${item.productName}`);
                return '';
            }
        }).join('');

        cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;

        
        if (cartData.length > 0) {
            clearCartButton.style.display = 'block';
            placeOrderButton.style.display = 'block';
        } else {
            clearCartButton.style.display = 'none';
            placeOrderButton.style.display = 'none';
        }
    };

    updateCartDisplay();

    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-button')) {
            const productName = event.target.dataset.productName;
            const action = event.target.classList.contains('increase') ? 'increase' : 'decrease';
            const item = cartData.find(item => item.productName === productName);
            if (item) {
                if (action === 'increase') {
                    item.quantity += 1;
                } else if (action === 'decrease') {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        cartData = cartData.filter(item => item.productName !== productName);
                    }
                }
                saveCart(cartData);
                updateCartDisplay();
            }
        } else if (event.target.classList.contains('remove-button')) {
            const productName = event.target.dataset.productName;
            cartData = cartData.filter(item => item.productName !== productName);
            saveCart(cartData);
            updateCartDisplay();
        }
    });

    cartItemsList.addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const productName = event.target.dataset.productName;
            const newQuantity = parseInt(event.target.value, 10);
            const item = cartData.find(item => item.productName === productName);
            if (item) {
                item.quantity = newQuantity;
                if (item.quantity <= 0) {
                    cartData = cartData.filter(item => item.productName !== productName);
                }
                saveCart(cartData);
                updateCartDisplay();
            }
        }
    });

    clearCartButton.addEventListener('click', () => {
        cartData = [];
        saveCart(cartData);
        updateCartDisplay();
    });

    placeOrderButton.addEventListener('click', () => {
        // alert('Thank you for your order!');
        cartData = [];
        saveCart(cartData);
        updateCartDisplay();
        window.location.href = 'success.html'; 
    });
});
