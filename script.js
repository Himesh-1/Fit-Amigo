document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('hidden');
    });
});
