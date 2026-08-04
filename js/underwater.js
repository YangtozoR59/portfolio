/* ==========================================
   ABYSSAL DEEP OCEAN EFFECTS — JavaScript
   Depth: ~4000m — Bioluminescent Zone
   ==========================================
   Canvas-based: plankton particles, bubbles,
   rare bioluminescent jellyfish, dive lamp
   ========================================== */

(function () {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    plankton: {
      count: 60,
      minSize: 1,
      maxSize: 3,
      minSpeed: 0.15,
      maxSpeed: 0.5,
      colors: [
        'rgba(0, 245, 212, 0.4)',
        'rgba(0, 191, 255, 0.3)',
        'rgba(155, 77, 255, 0.25)',
        'rgba(0, 245, 212, 0.2)',
        'rgba(0, 191, 255, 0.15)',
      ]
    },
    bubbles: {
      count: 12,
      minSize: 2,
      maxSize: 6,
      minSpeed: 0.3,
      maxSpeed: 0.8,
      wobbleAmount: 0.5
    },
    jellyfish: {
      maxActive: 2,
      spawnInterval: 25000, // ms between possible spawns
      minSize: 25,
      maxSize: 50,
      speed: 0.2
    },
    diveLamp: {
      enabled: true,
      radius: 280
    }
  };

  // ===== CANVAS SETUP =====
  const canvas = document.getElementById('abyssCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ===== MOUSE TRACKING FOR DIVE LAMP =====
  let mouseX = W / 2;
  let mouseY = H / 2;
  let lampX = W / 2;
  let lampY = H / 2;

  const diveLampEl = document.querySelector('.dive-lamp');

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // ===== PLANKTON PARTICLES =====
  class Plankton {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = CONFIG.plankton.minSize + Math.random() * (CONFIG.plankton.maxSize - CONFIG.plankton.minSize);
      this.speedY = -(CONFIG.plankton.minSpeed + Math.random() * (CONFIG.plankton.maxSpeed - CONFIG.plankton.minSpeed));
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.color = CONFIG.plankton.colors[Math.floor(Math.random() * CONFIG.plankton.colors.length)];
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.01 + Math.random() * 0.03;
      this.opacity = 0.2 + Math.random() * 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.pulse) * 0.1;
      this.pulse += this.pulseSpeed;

      if (this.y < -10 || this.x < -10 || this.x > W + 10) {
        this.reset();
      }
    }

    draw() {
      const glowSize = this.size * (1.5 + 0.5 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity * (0.5 + 0.5 * Math.sin(this.pulse));
      ctx.fill();

      // Bright core
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // ===== BUBBLES =====
  class Bubble {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 20;
      this.size = CONFIG.bubbles.minSize + Math.random() * (CONFIG.bubbles.maxSize - CONFIG.bubbles.minSize);
      this.speedY = -(CONFIG.bubbles.minSpeed + Math.random() * (CONFIG.bubbles.maxSpeed - CONFIG.bubbles.minSpeed));
      this.wobblePhase = Math.random() * Math.PI * 2;
      this.wobbleSpeed = 0.02 + Math.random() * 0.03;
      this.opacity = 0.08 + Math.random() * 0.15;
    }

    update() {
      this.y += this.speedY;
      this.wobblePhase += this.wobbleSpeed;
      this.x += Math.sin(this.wobblePhase) * CONFIG.bubbles.wobbleAmount;

      // Shrink as it rises
      this.size *= 0.9998;

      if (this.y < -20 || this.size < 0.5) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180, 220, 255, ${this.opacity})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Highlight reflection
      ctx.beginPath();
      ctx.arc(this.x - this.size * 0.25, this.y - this.size * 0.25, this.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
      ctx.fill();
    }
  }

  // ===== JELLYFISH =====
  class Jellyfish {
    constructor() {
      this.alive = true;
      this.size = CONFIG.jellyfish.minSize + Math.random() * (CONFIG.jellyfish.maxSize - CONFIG.jellyfish.minSize);
      
      // Spawn from left or right
      const fromLeft = Math.random() > 0.5;
      this.x = fromLeft ? -this.size * 2 : W + this.size * 2;
      this.y = 100 + Math.random() * (H - 200);
      this.dirX = fromLeft ? 1 : -1;
      this.speedX = (0.1 + Math.random() * 0.15) * this.dirX;
      this.speedY = (Math.random() - 0.5) * 0.1;
      
      this.pulsePhase = 0;
      this.pulseSpeed = 0.03 + Math.random() * 0.02;
      this.tentaclePhase = 0;
      
      // Color variants
      const colors = [
        { r: 0, g: 245, b: 212 },   // cyan
        { r: 155, g: 77, b: 255 },   // violet
        { r: 0, g: 191, b: 255 },    // blue
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = 0;
      this.maxOpacity = 0.15 + Math.random() * 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY + Math.sin(this.pulsePhase * 0.5) * 0.2;
      this.pulsePhase += this.pulseSpeed;
      this.tentaclePhase += 0.02;

      // Fade in
      if (this.opacity < this.maxOpacity) {
        this.opacity = Math.min(this.opacity + 0.001, this.maxOpacity);
      }

      // Check if off screen
      if ((this.dirX > 0 && this.x > W + this.size * 3) ||
          (this.dirX < 0 && this.x < -this.size * 3)) {
        this.alive = false;
      }
    }

    draw() {
      const { r, g, b } = this.color;
      const pulse = Math.sin(this.pulsePhase);
      const bellHeight = this.size * (0.6 + 0.1 * pulse);
      const bellWidth = this.size * (0.8 + 0.15 * pulse);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = this.opacity;

      // Outer glow
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 1.5);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.15)`);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Bell (dome)
      ctx.beginPath();
      ctx.ellipse(0, -bellHeight * 0.2, bellWidth, bellHeight, 0, Math.PI, 0);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.25)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.4)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tentacles
      const tentacleCount = 5;
      for (let i = 0; i < tentacleCount; i++) {
        const tx = (i - (tentacleCount - 1) / 2) * (bellWidth * 0.3);
        ctx.beginPath();
        ctx.moveTo(tx, bellHeight * 0.1);
        
        const len = this.size * (0.6 + 0.3 * Math.sin(this.tentaclePhase + i));
        const wave = Math.sin(this.tentaclePhase * 2 + i * 0.8) * 5;
        
        ctx.quadraticCurveTo(tx + wave, bellHeight * 0.3 + len * 0.5, tx + wave * 0.5, bellHeight * 0.1 + len);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Inner glow spot
      ctx.beginPath();
      ctx.arc(0, -bellHeight * 0.3, bellWidth * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // ===== INITIALIZE PARTICLES =====
  const planktons = [];
  const bubbles = [];
  const jellyfishList = [];

  for (let i = 0; i < CONFIG.plankton.count; i++) {
    planktons.push(new Plankton());
  }
  for (let i = 0; i < CONFIG.bubbles.count; i++) {
    bubbles.push(new Bubble());
  }

  // ===== JELLYFISH SPAWNER =====
  function trySpawnJellyfish() {
    // Remove dead ones
    for (let i = jellyfishList.length - 1; i >= 0; i--) {
      if (!jellyfishList[i].alive) {
        jellyfishList.splice(i, 1);
      }
    }

    if (jellyfishList.length < CONFIG.jellyfish.maxActive && Math.random() < 0.3) {
      jellyfishList.push(new Jellyfish());
    }
  }

  setInterval(trySpawnJellyfish, CONFIG.jellyfish.spawnInterval);
  // Spawn one initially after a short delay
  setTimeout(() => {
    jellyfishList.push(new Jellyfish());
  }, 3000);

  // ===== DIVE LAMP LIGHT (on canvas) =====
  function drawDiveLamp() {
    if (!CONFIG.diveLamp.enabled) return;
    
    // Smooth follow
    lampX += (mouseX - lampX) * 0.08;
    lampY += (mouseY - lampY) * 0.08;

    // Update CSS dive lamp element
    if (diveLampEl) {
      diveLampEl.style.left = lampX + 'px';
      diveLampEl.style.top = lampY + 'px';
    }

    // Canvas-based subtle light
    const gradient = ctx.createRadialGradient(lampX, lampY, 0, lampX, lampY, CONFIG.diveLamp.radius);
    gradient.addColorStop(0, 'rgba(0, 245, 212, 0.015)');
    gradient.addColorStop(0.3, 'rgba(0, 191, 255, 0.008)');
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(lampX, lampY, CONFIG.diveLamp.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  // ===== DEPTH INDICATOR =====
  const depthNumber = document.querySelector('.depth-number');
  const depthBarFill = document.querySelector('.depth-bar-fill');

  function updateDepthIndicator() {
    if (!depthNumber || !depthBarFill) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Map scroll to depth: 3800m to 4200m
    const depth = Math.round(3800 + scrollPercent * 400);
    depthNumber.textContent = depth + 'm';
    depthBarFill.style.height = (scrollPercent * 100) + '%';
  }

  window.addEventListener('scroll', updateDepthIndicator, { passive: true });
  updateDepthIndicator();

  // ===== CLICK RIPPLE EFFECT =====
  document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  });

  // ===== FLOATING EFFECT ON PANELS =====
  function addFloatingEffect() {
    const visibleCards = document.querySelectorAll('.reveal-card.visible');
    visibleCards.forEach(card => {
      if (!card.classList.contains('float-ready')) {
        // Add a small random delay before starting float
        setTimeout(() => {
          card.classList.add('float-ready');
        }, 500 + Math.random() * 1000);
      }
    });
  }

  // Check periodically for newly visible cards
  setInterval(addFloatingEffect, 2000);

  // ===== PARALLAX ON SCROLL (subtle) =====
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Move plankton layer slightly slower
        planktons.forEach(p => {
          p.y += scrollY * 0.0003;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ===== ANIMATION LOOP =====
  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Draw dive lamp light
    drawDiveLamp();

    // Update and draw plankton
    planktons.forEach(p => {
      p.update();
      p.draw();
    });

    // Update and draw bubbles
    bubbles.forEach(b => {
      b.update();
      b.draw();
    });

    // Update and draw jellyfish
    jellyfishList.forEach(j => {
      j.update();
      j.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  // ===== REDUCE MOTION PREFERENCE =====
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    CONFIG.plankton.count = 15;
    CONFIG.bubbles.count = 4;
    CONFIG.jellyfish.maxActive = 0;
    CONFIG.diveLamp.enabled = false;
    if (diveLampEl) diveLampEl.style.display = 'none';
  }

  // ===== MOBILE PERFORMANCE =====
  if (window.innerWidth <= 768) {
    CONFIG.plankton.count = 25;
    CONFIG.bubbles.count = 6;
    CONFIG.jellyfish.maxActive = 1;
    CONFIG.jellyfish.spawnInterval = 40000;
    CONFIG.diveLamp.enabled = false;
    if (diveLampEl) diveLampEl.style.display = 'none';
    
    // Reduce existing particles
    while (planktons.length > 25) planktons.pop();
    while (bubbles.length > 6) bubbles.pop();
  }

})();
