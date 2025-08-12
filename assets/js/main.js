document.addEventListener('DOMContentLoaded', () => {

    // --- Gestion de la barre de navigation au scroll ---
    const header = document.querySelector('header');
    const headerScrollObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
            header.classList.add('bg-opacity-80', 'backdrop-blur-sm');
        } else {
            header.classList.remove('bg-opacity-80', 'backdrop-blur-sm');
        }
    }, {
        rootMargin: '-50px 0px 0px 0px' // Change la classe dès que le haut de la page sort de la vue
    });
    headerScrollObserver.observe(document.getElementById('hero'));


    // --- Animations de fade-in au scroll (réalisé avec l'Intersection Observer) ---
    const fadeElements = document.querySelectorAll('[class*="animate-fade-in"]');
    fadeElements.forEach(el => {
        el.style.opacity = 0;
    });

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 1s ease-out';
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // --- Parallax effect plus performant ---
    const parallaxHero = document.getElementById('hero');
    if (parallaxHero) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            // Utilise 'transform' au lieu de 'background-position' pour une meilleure performance.
            parallaxHero.style.transform = `translateY(${offset * 0.5}px)`;
        });
    }


    // --- Initialisation de Vanilla Tilt.js ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

});