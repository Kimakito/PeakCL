document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;

  const fontSize = 16;
  const characters = '0123456789';
  let columns = 0;
  let drops = [];
  let rafId;

  // Vitesse : on saute une frame sur deux pour ralentir la chute
  let frame = 0;

  function setSize() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    const h = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(w / fontSize) + 1;
    // Initialise les gouttes à des positions aléatoires pour éviter le démarrage synchronisé
    drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -(h / fontSize)));
  }

  function draw() {
    frame++;
    // On ne dessine qu'une frame sur cinq (pluie lente et lisible)
    if (frame % 5 !== 0) {
      rafId = requestAnimationFrame(draw);
      return;
    }

    const w = parseInt(canvas.style.width);
    const h = parseInt(canvas.style.height);

    // Fondu sombre pour créer la traînée — efface plus vite pour moins interférer avec le texte
    ctx.fillStyle = 'rgba(7, 15, 25, 0.30)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
      const y = drops[i] * fontSize;
      const text = characters[Math.floor(Math.random() * characters.length)];

      // Tête de colonne : doré chaud
      ctx.fillStyle = '#f0c040';
      ctx.shadowColor = '#e8a020';
      ctx.shadowBlur = 10;
      ctx.fillText(text, i * fontSize, y);

      // Corps de la colonne (chiffre précédent en doré)
      ctx.fillStyle = '#c8a96b';
      ctx.shadowColor = '#c8a96b';
      ctx.shadowBlur = 4;
      ctx.fillText(
        characters[Math.floor(Math.random() * characters.length)],
        i * fontSize,
        y - fontSize
      );

      // Queue estompée
      ctx.fillStyle = 'rgba(180, 140, 60, 0.4)';
      ctx.shadowBlur = 0;
      ctx.fillText(
        characters[Math.floor(Math.random() * characters.length)],
        i * fontSize,
        y - fontSize * 2
      );

      // Reset quand la colonne sort du bas
      if (y > h && Math.random() > 0.97) {
        drops[i] = Math.floor(Math.random() * -20);
      }
      drops[i]++;
    }

    // Réinitialise le shadow pour ne pas affecter d'autres éléments
    ctx.shadowBlur = 0;

    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (!rafId) rafId = requestAnimationFrame(draw);
  }
  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  setSize();
  start();

  window.addEventListener('resize', () => { setSize(); });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
});
