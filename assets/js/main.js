document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.location.pathname !== '/') {
                window.location.href = '/' + this.getAttribute('href');
                e.preventDefault();
            }
        });
    });
    // --- Gestion de la barre de navigation au scroll ---
    const header = document.querySelector('header');
    const heroSection = document.getElementById('hero');

    if (heroSection) {
        const headerScrollObserver = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) {
                header.classList.add('bg-opacity-80', 'backdrop-blur-sm');
            } else {
                header.classList.remove('bg-opacity-80', 'backdrop-blur-sm');
            }
        }, {
            rootMargin: '-50px 0px 0px 0px'
        });
        headerScrollObserver.observe(heroSection);
    }


    // --- Animations de fade-in au scroll ---
    const fadeElements = document.querySelectorAll('[class*="animate-fade-in"]');
    if (fadeElements.length > 0) {
        fadeElements.forEach(el => {
            el.style.opacity = 0;
            // On peut aussi utiliser une classe CSS pour gérer l'état initial
            // el.classList.add('opacity-0');
        });

        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'opacity 1s ease-out';
                    entry.target.style.opacity = 1;
                    // On peut aussi gérer avec une classe CSS pour l'animation
                    // entry.target.classList.remove('opacity-0');
                    // entry.target.classList.add('opacity-100', 'transition-opacity', 'duration-1000');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        fadeElements.forEach(el => {
            fadeObserver.observe(el);
        });
    }

    // --- Parallax effect plus performant sur la section hero ---
    const parallaxHero = document.getElementById('hero');
    if (parallaxHero) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            parallaxHero.style.transform = `translateY(${offset * 0.5}px)`;
        });
    }

    // --- Gestion du menu hamburger ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                hamburgerButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Animations du portfolio pour mobile/desktop ---
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    if (portfolioCards.length > 0) {
        portfolioCards.forEach(card => {
            const figcaption = card.querySelector('figcaption');
            const image = card.querySelector('img');
            const link = card.querySelector('a');

            // On vérifie si l'appareil est tactile
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (isTouchDevice) {
                // Pour mobile (tactile)
                card.addEventListener('click', (e) => {
                    // Si l'utilisateur a cliqué sur l'image ou la figcaption elle-même,
                    // on gère l'animation. Si c'est le lien, on le laisse faire son travail.
                    if (e.target !== link && !link.contains(e.target)) {
                        e.preventDefault(); // Empêche le clic de suivre le lien par défaut

                        const isVisible = figcaption.classList.contains('opacity-100');

                        // On ferme toutes les autres cartes ouvertes
                        document.querySelectorAll('.portfolio-card .opacity-100').forEach(openOverlay => {
                            if (openOverlay !== figcaption) {
                                openOverlay.classList.remove('opacity-100');
                                openOverlay.previousElementSibling.classList.remove('scale-105');
                            }
                        });

                        // On bascule l'état de la carte actuelle
                        if (isVisible) {
                            figcaption.classList.remove('opacity-100');
                            image.classList.remove('scale-105');
                        } else {
                            figcaption.classList.add('opacity-100');
                            image.classList.add('scale-105');
                        }
                    }
                });
            }
        });
    }

    // --- Initialisation de Vanilla Tilt.js (pour desktop) ---
    // Je retire l'initialisation du tilt pour mobile, car ça peut entrer en conflit avec le clic
    // et n'est pas toujours pertinent sur les appareils tactiles.
    if (typeof VanillaTilt !== 'undefined' && !('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        VanillaTilt.init(document.querySelectorAll(".portfolio-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }
});