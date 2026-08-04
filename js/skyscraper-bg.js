/* ==========================================
   🌆 SKYSCRAPER VERTIGO CANVAS BACKGROUND
   High-Altitude Penthouse View with Parallax Grid & City Lights
   ========================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('skylineCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let cityNodes = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initCityNodes();
  }

  function initCityNodes() {
    cityNodes = [];
    const count = Math.floor(width / 22);
    for (let i = 0; i < count; i++) {
      cityNodes.push({
        x: (i / count) * width,
        y: height * 0.72 + (Math.random() * 80 - 40),
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.4 ? '#00F5D4' : (Math.random() > 0.5 ? '#3B82F6' : '#FF8C42')
      });
    }
  }

  function handleMouseMove(e) {
    targetMouseX = (e.clientX / width - 0.5) * 2;
    targetMouseY = (e.clientY / height - 0.5) * 2;
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function render() {
    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    if (isDark) {
      // Dark Theme: Deep Vertigo Skyscraper Night Sky
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#060913');
      bgGrad.addColorStop(0.65, '#0B1120');
      bgGrad.addColorStop(1, '#040711');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Horizon Glow
      const horizonY = height * 0.7;
      const horizonGrad = ctx.createRadialGradient(
        width / 2 + mouseX * 60, horizonY + mouseY * 30, 10,
        width / 2 + mouseX * 60, horizonY + mouseY * 30, width * 0.7
      );
      horizonGrad.addColorStop(0, 'rgba(0, 245, 212, 0.12)');
      horizonGrad.addColorStop(0.4, 'rgba(59, 130, 246, 0.06)');
      horizonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height);

      // Vertigo Perspective Grid Lines (looking down from skyscraper window)
      ctx.lineWidth = 1;
      const vanishingX = width / 2 + mouseX * 80;
      const vanishingY = horizonY + mouseY * 40;
      const lineCount = 28;

      ctx.strokeStyle = 'rgba(0, 245, 212, 0.07)';
      ctx.beginPath();
      for (let i = -lineCount; i <= lineCount; i++) {
        const startX = (width / 2) + (i * (width / (lineCount * 0.7)));
        ctx.moveTo(startX, height);
        ctx.lineTo(vanishingX, vanishingY);
      }
      ctx.stroke();

      // Horizontal Floor Grid Lines (Perspective steps down)
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
      ctx.beginPath();
      for (let y = height; y > vanishingY; y -= Math.pow((y - vanishingY) / 18, 1.25) + 8) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // City Horizon Light Nodes (Twinkling skyscraper/city lights below)
      cityNodes.forEach(node => {
        node.alpha += Math.sin(Date.now() * node.pulseSpeed) * 0.015;
        const currentAlpha = Math.max(0.1, Math.min(0.9, node.alpha));
        const px = node.x + mouseX * (node.size * 8);
        const py = node.y + mouseY * 15;

        ctx.fillStyle = node.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(px, py, node.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

    } else {
      // Light Theme: High-Altitude Penthouse Day View
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(0.65, '#eef2f7');
      bgGrad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Day Perspective Grid
      const horizonY = height * 0.72;
      const vanishingX = width / 2 + mouseX * 50;
      const vanishingY = horizonY + mouseY * 25;
      const lineCount = 22;

      ctx.strokeStyle = 'rgba(37, 99, 235, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = -lineCount; i <= lineCount; i++) {
        const startX = (width / 2) + (i * (width / (lineCount * 0.7)));
        ctx.moveTo(startX, height);
        ctx.lineTo(vanishingX, vanishingY);
      }
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
