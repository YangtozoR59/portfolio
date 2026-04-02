/* ==========================================
   Underwater Effects — Interaction Engine
   Bubbles, ripples, scroll disturbance, light
   ========================================== */

(function () {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    bubbleIntervalMin: 1800,
    bubbleIntervalMax: 4000,
    bubbleSizeMin: 4,
    bubbleSizeMax: 14,
    bubbleDurationMin: 4,
    bubbleDurationMax: 8,
    maxBubbles: 25,
    rippleDebounce: 80,
    scrollDebounce: 150,
    scrollDisturbDuration: 800,
    lightSweepMin: 6000,
    lightSweepMax: 12000,
  };

  // ===== STATE =====
  let activeBubbles = 0;
  let lastRippleTime = 0;
  let scrollTimeout = null;

  // ===== HELPER =====
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // ===== BUBBLE SPAWNER =====
  function getTextPositions() {
    const main = document.querySelector('.dashboard');
    if (!main) return [];

    const textEls = main.querySelectorAll('h1, h2, h3, h4, p, span, blockquote, strong, .stat-number, .stat-label');
    const positions = [];

    textEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
        positions.push({
          x: rect.left + rect.width * Math.random(),
          y: rect.top + rect.height * 0.5,
        });
      }
    });

    return positions;
  }

  function spawnBubble() {
    if (activeBubbles >= CONFIG.maxBubbles) return;

    const positions = getTextPositions();
    if (positions.length === 0) return;

    const pos = positions[Math.floor(Math.random() * positions.length)];
    const size = rand(CONFIG.bubbleSizeMin, CONFIG.bubbleSizeMax);
    const duration = rand(CONFIG.bubbleDurationMin, CONFIG.bubbleDurationMax);
    const wobble = rand(-30, 30);

    const bubble = document.createElement('div');
    bubble.className = size < 7 ? 'bubble sm' : 'bubble';
    bubble.style.cssText = `
      left: ${pos.x}px;
      top: ${pos.y}px;
      width: ${size}px;
      height: ${size}px;
      --bubble-duration: ${duration}s;
      --bubble-wobble: ${wobble}px;
    `;

    document.body.appendChild(bubble);
    activeBubbles++;

    bubble.addEventListener('animationend', () => {
      bubble.remove();
      activeBubbles--;
    });

    // Safety removal
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.remove();
        activeBubbles--;
      }
    }, (duration + 1) * 1000);
  }

  function scheduleBubble() {
    const delay = rand(CONFIG.bubbleIntervalMin, CONFIG.bubbleIntervalMax);
    setTimeout(() => {
      spawnBubble();
      // Sometimes spawn a cluster (2-3 bubbles together)
      if (Math.random() < 0.3) {
        setTimeout(spawnBubble, 150);
        if (Math.random() < 0.5) {
          setTimeout(spawnBubble, 300);
        }
      }
      scheduleBubble();
    }, delay);
  }

  // ===== RIPPLE ON CLICK / TOUCH =====
  function createRipple(x, y) {
    const now = Date.now();
    if (now - lastRippleTime < CONFIG.rippleDebounce) return;
    lastRippleTime = now;

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    document.body.appendChild(ripple);

    // Shake the water surface
    const surface = document.getElementById('water-surface');
    if (surface) {
      surface.classList.remove('shake');
      // Force reflow to restart animation
      void surface.offsetWidth;
      surface.classList.add('shake');
    }

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });

    // Safety removal
    setTimeout(() => {
      if (ripple.parentNode) ripple.remove();
    }, 2000);
  }

  document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });

  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      createRipple(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  // ===== SCROLL DISTURBANCE =====
  const waterSurface = document.getElementById('water-surface');

  function onScroll() {
    if (!waterSurface) return;

    waterSurface.classList.add('scroll-disturb');

    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      waterSurface.classList.remove('scroll-disturb');
    }, CONFIG.scrollDisturbDuration);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== LIGHT SWEEP RANDOMIZER =====
  const glassOverlay = document.getElementById('glass-overlay');

  function randomizeLightSweep() {
    if (!glassOverlay) return;

    const duration = rand(CONFIG.lightSweepMin, CONFIG.lightSweepMax);

    // Re-trigger the animation by removing and re-adding the after pseudo via a class
    glassOverlay.classList.remove('sweep-active');
    void glassOverlay.offsetWidth;
    glassOverlay.classList.add('sweep-active');

    setTimeout(randomizeLightSweep, duration);
  }

  // ===== MOUSE MOVE — subtle caustic shift =====
  let mouseRafId = null;

  document.addEventListener('mousemove', (e) => {
    if (mouseRafId) return;
    mouseRafId = requestAnimationFrame(() => {
      const causticCells = document.querySelector('.caustic-cells');
      if (causticCells) {
        const xShift = (e.clientX / window.innerWidth - 0.5) * 20;
        const yShift = (e.clientY / window.innerHeight - 0.5) * 15;
        causticCells.style.transform = `translate(${xShift}px, ${yShift}px)`;
      }
      mouseRafId = null;
    });
  });

  // ===== INIT =====
  function init() {
    // Start bubble spawner
    scheduleBubble();
    // Start initial bubbles with stagger
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnBubble, i * 600);
    }
    // Start light sweep randomizer
    setTimeout(randomizeLightSweep, 3000);
  }

  // Wait for DOM + initial render
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
