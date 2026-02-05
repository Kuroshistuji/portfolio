document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typing Animation for Hero Section ---
    const roles = [
        "Backend Architecture",
        "Frontend Engineering",
        "Cloud Infrastructure",
        "Secure Systems"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    const roleElement = document.querySelector('.role-text');

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 50; // Faster deleting
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 100; // Normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeDelay = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 500; // Small pause before typing next
        }

        setTimeout(typeEffect, typeDelay);
    }

    // Start typing animation
    if (roleElement) typeEffect();


    // --- 2. Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 3. Scroll Reveal Animation (Intersection Observer) ---
    // Select all sections/cards to reveal
    const revealElements = document.querySelectorAll(
        '.section-title, .about-content, .card, .contact-wrapper, .stat-item, .stack-card, .fit-card'
    );

    // Add 'reveal' class initially to hide them via CSS
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Slight delay for staggered effect feel if multiple enter
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Softer trigger for better feel
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits viewport center
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 4. Smooth Anchor Scrolling (Optional - for older browser support if CSS scroll-behavior fails) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for fixed navbar height if needed
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
