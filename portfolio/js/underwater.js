/* ==========================================
   Underwater Effects — Deep Ocean Engine
   Bubbles, fish, ripples, depth, floating
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
    scrollDisturbDuration: 800,
    fishIntervalMin: 4000,
    fishIntervalMax: 10000,
    schoolIntervalMin: 12000,
    schoolIntervalMax: 25000,
    maxFish: 6,
  };

  // ===== STATE =====
  let activeBubbles = 0;
  let activeFish = 0;
  let lastRippleTime = 0;
  let scrollTimeout = null;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  // ==========================================
  //  FISH SVG TEMPLATES — Different species
  // ==========================================

  const fishTemplates = [
    // Tropical fish (blue/yellow)
    (w) => `<svg width="${w}" height="${w*0.6}" viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M45,18 C45,8 35,2 22,4 C12,6 4,12 2,18 C4,24 12,30 22,32 C35,34 45,28 45,18 Z" fill="rgba(60,160,220,.6)" stroke="rgba(40,130,200,.3)" stroke-width=".5"/>
      <path d="M45,18 L58,8 L58,28 Z" fill="rgba(60,160,220,.5)"/>
      <circle cx="14" cy="16" r="2.5" fill="rgba(255,255,255,.8)"/>
      <circle cx="14.5" cy="16" r="1.2" fill="rgba(20,40,60,.7)"/>
      <path d="M20,10 C25,8 32,9 38,12" stroke="rgba(255,200,60,.4)" stroke-width="2" fill="none"/>
      <path d="M20,14 C25,12 32,13 40,16" stroke="rgba(255,200,60,.25)" stroke-width="1.5" fill="none"/>
      <path d="M18,24 Q25,28 35,24" stroke="rgba(100,200,255,.3)" stroke-width="1" fill="none"/>
    </svg>`,

    // Clownfish (orange/white)
    (w) => `<svg width="${w}" height="${w*0.55}" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42,16 C42,7 33,2 20,4 C10,6 3,11 2,16 C3,21 10,26 20,28 C33,30 42,25 42,16 Z" fill="rgba(240,130,40,.55)" stroke="rgba(220,100,20,.3)" stroke-width=".5"/>
      <path d="M42,16 L54,7 L54,25 Z" fill="rgba(240,130,40,.45)"/>
      <path d="M15,4 C15,4 15,28 15,28" stroke="rgba(255,255,255,.5)" stroke-width="3"/>
      <path d="M28,6 C28,6 28,26 28,26" stroke="rgba(255,255,255,.5)" stroke-width="3"/>
      <circle cx="10" cy="14" r="2.2" fill="rgba(255,255,255,.8)"/>
      <circle cx="10.4" cy="14" r="1" fill="rgba(20,20,20,.7)"/>
    </svg>`,

    // Angelfish (purple/silver)
    (w) => `<svg width="${w}" height="${w*0.9}" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35,20 C35,10 28,2 20,2 C12,2 4,10 3,20 C4,30 12,38 20,38 C28,38 35,30 35,20 Z" fill="rgba(140,100,200,.45)" stroke="rgba(120,80,180,.25)" stroke-width=".5"/>
      <path d="M35,20 L43,14 L43,26 Z" fill="rgba(140,100,200,.35)"/>
      <path d="M20,2 L18,0 L22,0 Z" fill="rgba(140,100,200,.3)"/>
      <path d="M20,38 L18,40 L22,40 Z" fill="rgba(140,100,200,.3)"/>
      <circle cx="12" cy="18" r="2" fill="rgba(255,255,255,.8)"/>
      <circle cx="12.4" cy="18" r="1" fill="rgba(20,20,40,.7)"/>
      <path d="M15,12 C20,10 28,11 33,14" stroke="rgba(200,180,240,.3)" stroke-width="1" fill="none"/>
      <path d="M15,16 C20,14 28,15 33,18" stroke="rgba(200,180,240,.2)" stroke-width="1" fill="none"/>
      <path d="M15,24 C20,26 28,25 33,22" stroke="rgba(200,180,240,.2)" stroke-width="1" fill="none"/>
    </svg>`,

    // Small silver fish (simple)
    (w) => `<svg width="${w}" height="${w*0.45}" viewBox="0 0 40 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30,9 C30,4 24,1 15,2 C8,3 3,6 2,9 C3,12 8,15 15,16 C24,17 30,14 30,9 Z" fill="rgba(180,200,220,.45)" stroke="rgba(160,180,200,.2)" stroke-width=".5"/>
      <path d="M30,9 L39,4 L39,14 Z" fill="rgba(180,200,220,.35)"/>
      <circle cx="9" cy="8" r="1.5" fill="rgba(255,255,255,.7)"/>
      <circle cx="9.3" cy="8" r=".7" fill="rgba(20,30,40,.6)"/>
      <path d="M12,5 C18,4 24,5 29,7" stroke="rgba(200,220,240,.2)" stroke-width=".8" fill="none"/>
    </svg>`,

    // Pufferfish (round, spotted)
    (w) => `<svg width="${w}" height="${w*0.85}" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="21" rx="18" ry="16" fill="rgba(180,210,140,.45)" stroke="rgba(150,190,120,.25)" stroke-width=".5"/>
      <path d="M38,21 L47,15 L46,21 L47,27 Z" fill="rgba(180,210,140,.35)"/>
      <circle cx="14" cy="17" r="3" fill="rgba(255,255,255,.8)"/>
      <circle cx="14.5" cy="17" r="1.5" fill="rgba(20,40,20,.6)"/>
      <circle cx="25" cy="14" r="1.5" fill="rgba(160,190,120,.3)"/>
      <circle cx="30" cy="20" r="1.2" fill="rgba(160,190,120,.25)"/>
      <circle cx="22" cy="27" r="1.3" fill="rgba(160,190,120,.25)"/>
      <circle cx="28" cy="27" r="1" fill="rgba(160,190,120,.2)"/>
      <circle cx="18" cy="12" r="1" fill="rgba(160,190,120,.2)"/>
      <path d="M10,22 Q12,25 10,26" stroke="rgba(180,210,140,.3)" stroke-width=".8" fill="none"/>
    </svg>`,

    // Jellyfish
    (w) => `<svg width="${w}" height="${w*1.4}" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,20 C4,8 12,2 20,2 C28,2 36,8 36,20 C36,22 32,24 20,24 C8,24 4,22 4,20 Z" fill="rgba(200,150,240,.3)" stroke="rgba(180,130,220,.15)" stroke-width=".5"/>
      <path d="M10,24 Q8,34 12,44 Q10,48 14,54" stroke="rgba(200,150,240,.2)" stroke-width="1.2" fill="none">
        <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M10,24 Q8,34 12,44 Q10,48 14,54;M10,24 Q14,34 10,44 Q14,48 12,54;M10,24 Q8,34 12,44 Q10,48 14,54"/>
      </path>
      <path d="M16,24 Q14,36 18,46 Q16,50 19,56" stroke="rgba(200,150,240,.18)" stroke-width="1" fill="none">
        <animate attributeName="d" dur="2.5s" repeatCount="indefinite" values="M16,24 Q14,36 18,46 Q16,50 19,56;M16,24 Q18,36 15,46 Q18,50 17,56;M16,24 Q14,36 18,46 Q16,50 19,56"/>
      </path>
      <path d="M24,24 Q26,36 22,46 Q24,50 21,56" stroke="rgba(200,150,240,.18)" stroke-width="1" fill="none">
        <animate attributeName="d" dur="2.8s" repeatCount="indefinite" values="M24,24 Q26,36 22,46 Q24,50 21,56;M24,24 Q22,36 26,46 Q22,50 24,56;M24,24 Q26,36 22,46 Q24,50 21,56"/>
      </path>
      <path d="M30,24 Q32,34 28,44 Q30,48 26,54" stroke="rgba(200,150,240,.2)" stroke-width="1.2" fill="none">
        <animate attributeName="d" dur="3.2s" repeatCount="indefinite" values="M30,24 Q32,34 28,44 Q30,48 26,54;M30,24 Q26,34 30,44 Q26,48 28,54;M30,24 Q32,34 28,44 Q30,48 26,54"/>
      </path>
      <ellipse cx="20" cy="14" rx="6" ry="4" fill="rgba(240,210,255,.15)"/>
    </svg>`
  ];

  // Small fish for schools
  const schoolFishSvg = (w) => `<svg width="${w}" height="${w*0.5}" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18,6 C18,3 14,1 9,2 C5,3 2,5 1,6 C2,7 5,9 9,10 C14,11 18,9 18,6 Z" fill="rgba(180,210,230,.4)"/>
    <path d="M18,6 L23,3 L23,9 Z" fill="rgba(180,210,230,.3)"/>
    <circle cx="6" cy="5.5" r="1" fill="rgba(255,255,255,.6)"/>
    <circle cx="6.3" cy="5.5" r=".5" fill="rgba(20,30,40,.5)"/>
  </svg>`;

  // ==========================================
  //  FISH SPAWNER
  // ==========================================

  function spawnFish() {
    if (activeFish >= CONFIG.maxFish) return;

    const goingRight = Math.random() < 0.5;
    const templateIdx = randInt(0, fishTemplates.length - 1);
    const size = rand(30, 70);
    const duration = rand(10, 20);
    const yPos = rand(8, 85); // % from top
    const bob1 = rand(-20, -5);
    const bob2 = rand(5, 15);
    const opacity = rand(0.35, 0.65);
    const tailSpeed = rand(0.4, 0.8);

    const fish = document.createElement('div');
    fish.className = 'ocean-fish' + (goingRight ? '' : ' rtl');
    fish.innerHTML = fishTemplates[templateIdx](size);
    fish.style.cssText = `
      top: ${yPos}%;
      left: 0;
      --fish-duration: ${duration}s;
      --fish-bob1: ${bob1}px;
      --fish-bob2: ${bob2}px;
      --fish-opacity: ${opacity};
      --tail-speed: ${tailSpeed}s;
    `;

    document.body.appendChild(fish);
    activeFish++;

    const cleanup = () => {
      if (fish.parentNode) {
        fish.remove();
        activeFish--;
      }
    };

    fish.addEventListener('animationend', cleanup);
    setTimeout(cleanup, (duration + 2) * 1000);
  }

  function spawnFishSchool() {
    if (activeFish >= CONFIG.maxFish - 2) return;

    const goingRight = Math.random() < 0.5;
    const count = randInt(3, 6);
    const yPos = rand(15, 75);
    const duration = rand(12, 18);
    const opacity = rand(0.3, 0.5);

    const school = document.createElement('div');
    school.className = 'fish-school' + (goingRight ? '' : ' rtl');
    school.style.cssText = `
      top: ${yPos}%;
      left: 0;
      --fish-duration: ${duration}s;
      --fish-bob1: ${rand(-15, -5)}px;
      --fish-bob2: ${rand(5, 12)}px;
      --fish-opacity: ${opacity};
    `;

    const fishSize = rand(14, 22);
    for (let i = 0; i < count; i++) {
      const member = document.createElement('div');
      member.className = 'school-member';
      member.innerHTML = schoolFishSvg(fishSize);
      member.style.cssText = `
        left: ${i * rand(18, 30)}px;
        top: ${rand(-15, 15)}px;
        --tail-speed: ${rand(0.3, 0.5)}s;
        opacity: ${rand(0.6, 1)};
      `;
      school.appendChild(member);
    }

    document.body.appendChild(school);
    activeFish += 2;

    const cleanup = () => {
      if (school.parentNode) {
        school.remove();
        activeFish -= 2;
      }
    };

    school.addEventListener('animationend', cleanup);
    setTimeout(cleanup, (duration + 2) * 1000);
  }

  function scheduleFish() {
    const delay = rand(CONFIG.fishIntervalMin, CONFIG.fishIntervalMax);
    setTimeout(() => {
      spawnFish();
      scheduleFish();
    }, delay);
  }

  function scheduleSchool() {
    const delay = rand(CONFIG.schoolIntervalMin, CONFIG.schoolIntervalMax);
    setTimeout(() => {
      spawnFishSchool();
      scheduleSchool();
    }, delay);
  }

  // ==========================================
  //  BUBBLE SPAWNER
  // ==========================================

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
      if (Math.random() < 0.3) {
        setTimeout(spawnBubble, 150);
        if (Math.random() < 0.5) {
          setTimeout(spawnBubble, 300);
        }
      }
      scheduleBubble();
    }, delay);
  }

  // ==========================================
  //  RIPPLE ON CLICK / TOUCH
  // ==========================================

  function createRipple(x, y) {
    const now = Date.now();
    if (now - lastRippleTime < CONFIG.rippleDebounce) return;
    lastRippleTime = now;

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    document.body.appendChild(ripple);

    const surface = document.getElementById('water-surface');
    if (surface) {
      surface.classList.remove('shake');
      void surface.offsetWidth;
      surface.classList.add('shake');
    }

    ripple.addEventListener('animationend', () => ripple.remove());
    setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 2000);
  }

  document.addEventListener('click', (e) => createRipple(e.clientX, e.clientY));

  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      createRipple(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // ==========================================
  //  SCROLL DISTURBANCE
  // ==========================================

  const waterSurface = document.getElementById('water-surface');

  window.addEventListener('scroll', () => {
    if (!waterSurface) return;
    waterSurface.classList.add('scroll-disturb');
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      waterSurface.classList.remove('scroll-disturb');
    }, CONFIG.scrollDisturbDuration);
  }, { passive: true });

  // ==========================================
  //  LIGHT SWEEP RANDOMIZER
  // ==========================================

  const glassOverlay = document.getElementById('glass-overlay');

  function randomizeLightSweep() {
    if (!glassOverlay) return;
    glassOverlay.classList.remove('sweep-active');
    void glassOverlay.offsetWidth;
    glassOverlay.classList.add('sweep-active');
    setTimeout(randomizeLightSweep, rand(6000, 12000));
  }

  // ==========================================
  //  MOUSE — caustic shift
  // ==========================================

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

  // ==========================================
  //  DEPTH & FLOATING — apply to panels
  // ==========================================

  function applyDepthAndFloating() {
    // Near depth — stats, quote (hero row)
    const nearEls = document.querySelectorAll('.panel-stats, .panel-quote, .dash-header');
    nearEls.forEach((el, i) => {
      el.classList.add('underwater-float', 'depth-near');
      el.style.setProperty('--float-delay', (i * 0.5) + 's');
    });

    // Mid depth — bio, situation, skills
    const midEls = document.querySelectorAll('.panel-bio, .panel-situation, .panel-skills');
    midEls.forEach((el, i) => {
      el.classList.add('underwater-float', 'depth-mid');
      el.style.setProperty('--float-delay', (i * 0.7 + 0.3) + 's');
    });

    // Far depth — projects, services, contact (deeper in the ocean)
    const farEls = document.querySelectorAll('.panel-projects, .panel-services, .panel-contact');
    farEls.forEach((el, i) => {
      el.classList.add('underwater-float', 'depth-far');
      el.style.setProperty('--float-delay', (i * 0.6 + 0.5) + 's');
    });

    // Individual project cards get mid-depth floating with varied timing
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, i) => {
      card.classList.add('underwater-float');
      card.style.setProperty('--float-range', rand(-4, -8) + 'px');
      card.style.setProperty('--float-duration', rand(3.5, 5.5) + 's');
      card.style.setProperty('--float-delay', (i * 0.3) + 's');
    });

    // Service cards also float
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, i) => {
      card.classList.add('underwater-float');
      card.style.setProperty('--float-range', rand(-3, -6) + 'px');
      card.style.setProperty('--float-duration', rand(4, 6) + 's');
      card.style.setProperty('--float-delay', (i * 0.4 + 0.2) + 's');
    });

    // Stat cards float independently
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, i) => {
      card.classList.add('underwater-float');
      card.style.setProperty('--float-range', rand(-5, -10) + 'px');
      card.style.setProperty('--float-duration', rand(3, 4.5) + 's');
      card.style.setProperty('--float-delay', (i * 0.25) + 's');
    });

    // Sidebar avatar floats gently
    const avatar = document.querySelector('.sidebar-avatar');
    if (avatar) {
      avatar.classList.add('underwater-float');
      avatar.style.setProperty('--float-range', '-5px');
      avatar.style.setProperty('--float-duration', '4s');
    }

    // Tech icons float
    const techIcons = document.querySelectorAll('.tech-icons-row img');
    techIcons.forEach((icon, i) => {
      icon.classList.add('underwater-float');
      icon.style.setProperty('--float-range', rand(-3, -6) + 'px');
      icon.style.setProperty('--float-duration', rand(2.5, 4) + 's');
      icon.style.setProperty('--float-delay', (i * 0.15) + 's');
    });
  }

  // ==========================================
  //  SEAWEED — add decorative elements
  // ==========================================

  function addSeaweed() {
    const leftSvg = `<svg width="30" height="200" viewBox="0 0 30 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,200 Q5,160 15,130 Q25,100 12,70 Q5,50 15,20 Q20,5 18,0" stroke="rgba(60,140,80,.6)" stroke-width="3" fill="none"/>
      <path d="M15,200 Q20,170 10,145 Q5,120 18,90 Q25,65 12,35 Q8,15 14,0" stroke="rgba(40,120,60,.4)" stroke-width="2" fill="none"/>
    </svg>`;

    const rightSvg = `<svg width="30" height="180" viewBox="0 0 30 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,180 Q22,150 10,120 Q2,95 15,65 Q25,40 12,10" stroke="rgba(60,140,80,.6)" stroke-width="3" fill="none"/>
      <path d="M18,180 Q8,155 20,125 Q28,100 13,70 Q5,45 18,15" stroke="rgba(40,120,60,.4)" stroke-width="2" fill="none"/>
    </svg>`;

    const left = document.createElement('div');
    left.className = 'seaweed left';
    left.innerHTML = leftSvg;

    const right = document.createElement('div');
    right.className = 'seaweed right';
    right.innerHTML = rightSvg;
    right.style.animationDelay = '1.5s';

    document.body.appendChild(left);
    document.body.appendChild(right);
  }

  // ==========================================
  //  INIT
  // ==========================================

  function init() {
    // Apply depth & floating to panels
    applyDepthAndFloating();

    // Add seaweed
    addSeaweed();

    // Start bubble spawner
    scheduleBubble();
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnBubble, i * 600);
    }

    // Start fish spawner
    setTimeout(scheduleFish, 2000);
    setTimeout(scheduleSchool, 5000);

    // Spawn initial fish with stagger
    setTimeout(spawnFish, 1000);
    setTimeout(spawnFish, 3500);

    // Start light sweep
    setTimeout(randomizeLightSweep, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
