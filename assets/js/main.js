// Animation fade-in simple
document.querySelectorAll('[class*="animate-fade-in"]').forEach((el) => {
    el.style.opacity = 0;
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                el.style.transition = 'opacity 1s ease-out';
                el.style.opacity = 1;
                observer.unobserve(el);
            }
        },
        { threshold: 0.1 }
    );
    observer.observe(el);
});


// Parallax effect on scroll
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  hero.style.backgroundPositionY = `${offset * 0.5}px`;
});
