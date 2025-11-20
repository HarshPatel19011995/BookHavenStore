document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector(".main-header");
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    // Shrink header on scroll
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    });

    // Open / Close side menu
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });

});
