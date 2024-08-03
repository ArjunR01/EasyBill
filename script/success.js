// script.js

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Hide the loading screen and show the success screen
        document.getElementById('loading-screen').style.display = 'none';
        const successScreen = document.getElementById('success-screen');
        successScreen.style.display = 'flex';

        // Animate the checkmark
        const circle = successScreen.querySelector('.circle');
        const check = successScreen.querySelector('.check');

        // Apply animations after the success screen becomes visible
        setTimeout(() => {
            circle.style.strokeDashoffset = '0';
            check.style.strokeDashoffset = '0';
        }, 100);
    }, 3000); // Change this delay as needed
});
