import { cart, saveCart } from './cart.js';
import { items } from './products.js';

var addHtml = ``;

items.forEach((product) => {
    addHtml += `
    <div class="product-item">
        <img src="${product.image}" alt="${product.product_name}">
        <p>${product.product_name}</p>
        <h2>&#8377;${product.price}</h2>
        <button class="js-add-to-cart" data-product-name="${product.product_name}">Add to Cart</button>
    </div>`;
});

const final = document.querySelector('.product-list');
if (final) {
    final.innerHTML += addHtml;
}

function updateCartQuantity() {
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const quantityElement = document.getElementById('cart-quantity');
    if (quantityElement) {
        if (cartQuantity > 0) {
            quantityElement.textContent = cartQuantity; // Update the displayed quantity
            quantityElement.classList.add('show'); // Show the badge
        } else {
            quantityElement.classList.remove('show'); // Hide the badge
        }
    }
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.dataset.productName;
        const match = cart.find(item => item.productName === productName);

        if (match) {
            match.quantity += 1;
        } else {
            cart.push({
                productName: productName,
                quantity: 1
            });
        }

        saveCart(); // Save cart to localStorage
        updateCartQuantity(); // Update the quantity display
    });
});

updateCartQuantity(); // Initialize the cart quantity on page load
