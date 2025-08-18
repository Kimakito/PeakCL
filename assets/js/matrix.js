document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return; // quitte si pas de canvas sur la page

  const ctx = (canvas.getContext && canvas.getContext('2d'));
  if (!ctx) return;

  const fontSize = 20;
  const characters = '01';
  let columns = 0;
  let drops = [];
  let rafId;

  function setSize() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(w / fontSize) + 1;
    drops = new Array(columns).fill(0);
  }

  function draw() {
    // traînée
    ctx.fillStyle = 'rgba(26,35,126,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#65a30d';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

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

  window.addEventListener('resize', () => {
    setSize();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
});
