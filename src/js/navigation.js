// Navigation & Burger Menu
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    
    if (!burger || !navLinks) {
        console.error('Burger ou navLinks introuvable');
        console.log('burger:', burger);
        console.log('navLinks:', navLinks);
        return;
    }
    
    console.log('Navigation chargée avec succès');
    
    // Toggle menu
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        console.log('Menu toggled - active:', navLinks.classList.contains('active'));
    });
    
    // Fermer au clic sur lien
    const links = navLinks.querySelectorAll('a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
            console.log('Menu fermé');
        });
    });
    
    // Fermer au clic dehors
    document.addEventListener('click', function(e) {
        if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
            burger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
