document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let columns = Math.floor(width / 20) + 1;
    let drops = [];
    for (let i = 0; i < columns; i++) {
        drops.push(0);
    }

    const characters = '01';
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(26, 35, 126, 0.05)'; // Couleur semi-transparente pour l'effet de traînée
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#65a30d'; // Couleur verte (daltonien-friendly)
        ctx.font = '20px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * 20, drops[i] * 20);

            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function handleResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / 20) + 1;
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops.push(0);
        }
    }
    window.addEventListener('resize', handleResize);

    setInterval(drawMatrix, 50); // Ajuste la vitesse de l'animation ici (50ms = 20 images/seconde)
});