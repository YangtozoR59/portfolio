/* ==========================================================================
   ⚡ CYD // NETRUNNER OS v2077 — MAIN INTERACTIVE ENGINE
   Skyline Canvas + Telemetry + Filters + CryptoLab + Conway + Dev Quest
   Caleb Yang Damakoa (@ItzCyd)
   ========================================================================== */

(function () {
  'use strict';

  function t(key, fallback) {
    return (window._i18n && window._i18n.t) ? window._i18n.t(key, fallback) : (fallback || key);
  }

  /* --------------------------------------------------------------------------
     1. CYBERPUNK NEON SKYLINE & DATA MATRIX CANVAS
  -------------------------------------------------------------------------- */
  function initCyberCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes = [];
    const rainDrops = [];
    const NODE_COUNT = Math.min(55, Math.floor(width / 28));
    const RAIN_COUNT = Math.min(40, Math.floor(width / 35));

    const COLORS = ['#05d9e8', '#ff2a6d', '#fcee0a', '#9169ff', '#00f5a0'];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.2 + Math.random() * 1.8,
        color: COLORS[i % COLORS.length]
      });
    }

    for (let i = 0; i < RAIN_COUNT; i++) {
      rainDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        len: 35 + Math.random() * 85,
        speed: 1.5 + Math.random() * 3.2,
        color: i % 3 === 0 ? 'rgba(255, 42, 109, 0.22)' : 'rgba(5, 217, 232, 0.18)'
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Perspective Cyber Grid at bottom
      ctx.save();
      ctx.strokeStyle = 'rgba(5, 217, 232, 0.05)';
      ctx.lineWidth = 1;
      const gridStep = 64;
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // Digital Neon Rain Streaks
      for (let i = 0; i < rainDrops.length; i++) {
        const d = rainDrops[i];
        ctx.strokeStyle = d.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        if (d.y > height) {
          d.y = -d.len;
          d.x = Math.random() * width;
        }
      }

      // Neural Constellation Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            ctx.strokeStyle = `rgba(5, 217, 232, ${(1 - dist / 135) * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    requestAnimationFrame(draw);
  }

  /* --------------------------------------------------------------------------
     2. HUD CLOCK, AVATAR SWITCHER, QUOTES & STAT COUNTERS
  -------------------------------------------------------------------------- */
  function initHUDAndHero() {
    const clockEl = document.getElementById('hudClock');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('hudNavLinks');

    function updateClock() {
      if (!clockEl) return;
      const now = new Date();
      const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      clockEl.textContent = `${time} UTC+1`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    mobileMenuBtn?.addEventListener('click', () => {
      navLinks?.classList.toggle('open');
    });

    document.querySelectorAll('.hud-nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('open');
      });
    });

    // Holographic Avatar Switcher (cycles between profil.png, profil2.jpg, profil.jpg)
    const avatarImg = document.getElementById('heroAvatarImg');
    const avatarBtn = document.getElementById('heroAvatarSwitch');
    const avatarModeTag = document.getElementById('avatarModeTag');
    const avatars = [
      { src: './source/profil.png', tag: 'MODE // COMIC_CYBER.PNG' },
      { src: './source/profil2.jpg', tag: 'MODE // NOIR_PROTOCOL.JPG' },
      { src: './source/profil.jpg', tag: 'MODE // EXEC_STUDIO.JPG' }
    ];
    let avatarIdx = 0;

    avatarBtn?.addEventListener('click', () => {
      avatarIdx = (avatarIdx + 1) % avatars.length;
      if (avatarImg) {
        avatarImg.classList.add('glitch-flash');
        setTimeout(() => {
          avatarImg.src = avatars[avatarIdx].src;
          if (avatarModeTag) avatarModeTag.textContent = avatars[avatarIdx].tag;
        }, 120);
        setTimeout(() => avatarImg.classList.remove('glitch-flash'), 350);
      }
    });

    // Animated Counters
    const counters = document.querySelectorAll('.cyber-stat-num');
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const start = performance.now();
      const dur = 1600;
      function step(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });

    // Neural Quote Rotator
    const quotes = [
      { text: "Quelle que soit la chose que vous fassiez, travaillez de toute votre âme, comme pour le Seigneur.", author: "Colossiens 3:23" },
      { text: "Commit your work to the Lord, and your plans will be established.", author: "Proverbes 16:3" },
      { text: "Le code est comme l'humour. Quand on doit l'expliquer, c'est mauvais.", author: "Cory House" },
      { text: "La simplicité est la sophistication suprême.", author: "Léonard de Vinci" },
      { text: "I can do all things through Christ who strengthens me.", author: "Philippiens 4:13" }
    ];
    let qIdx = 0;
    const qText = document.getElementById('cyberQuoteText');
    const qAuthor = document.getElementById('cyberQuoteAuthor');
    function rotateQuote() {
      if (!qText || !qAuthor) return;
      qText.style.opacity = '0';
      setTimeout(() => {
        qText.textContent = `« ${quotes[qIdx].text} »`;
        qAuthor.textContent = `// ${quotes[qIdx].author}`;
        qText.style.opacity = '1';
        qIdx = (qIdx + 1) % quotes.length;
      }, 250);
    }
    rotateQuote();
    setInterval(rotateQuote, 7500);
  }

  /* --------------------------------------------------------------------------
     3. FILTERS (ARSENAL SKILLS & MISSIONS PROJECTS) + HOLOGRAPHIC MODAL
  -------------------------------------------------------------------------- */
  function initFiltersAndModals() {
    // Skill Filters
    const skillBtns = document.querySelectorAll('[data-skill-filter]');
    const skillCards = document.querySelectorAll('.arsenal-card');
    skillBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        skillBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-skill-filter');
        skillCards.forEach((card) => {
          const cardCat = card.getAttribute('data-tech-cat') || '';
          card.style.display = (cat === 'all' || cardCat.includes(cat)) ? 'flex' : 'none';
        });
      });
    });

    // Project Filters
    const projBtns = document.querySelectorAll('[data-proj-filter]');
    const projCards = document.querySelectorAll('.project-card-cyber');
    projBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        projBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-proj-filter');
        projCards.forEach((card) => {
          const cats = (card.getAttribute('data-category') || '').split(' ');
          card.style.display = (cat === 'all' || cats.includes(cat)) ? 'flex' : 'none';
        });
      });
    });

    // Holographic Inspector Modal (for Projects & Certificates)
    const modal = document.getElementById('holoModal');
    const modalBody = document.getElementById('holoModalBody');
    const modalClose = document.getElementById('holoModalClose');

    function openHoloModal(html) {
      if (!modal || !modalBody) return;
      modalBody.innerHTML = html;
      if (typeof modal.showModal === 'function' && !modal.open) {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    }

    function closeHoloModal() {
      if (!modal) return;
      if (typeof modal.close === 'function' && modal.open) {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    }

    modalClose?.addEventListener('click', closeHoloModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeHoloModal();
    });

    // Project Card Inspect Click
    document.querySelectorAll('.project-card-cyber').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const img = card.querySelector('.proj-thumb img')?.src || '';
        const code = card.querySelector('.proj-index')?.textContent || 'SYS';
        const title = card.querySelector('h3')?.textContent || '';
        const role = card.querySelector('.proj-role')?.textContent || '';
        const desc = card.querySelector('.proj-desc')?.textContent || '';
        const date = card.querySelector('.proj-date')?.textContent || '';
        const tags = card.querySelector('.proj-stack-pills')?.innerHTML || '';
        const actions = card.querySelector('.proj-links')?.innerHTML || '';

        openHoloModal(`
          <div class="holo-modal-grid">
            <div class="holo-modal-visual">
              <img src="${img}" alt="${title}" />
              <span class="holo-badge">${code} // ${date}</span>
            </div>
            <div class="holo-modal-details">
              <div class="holo-role">${role}</div>
              <h2>${title}</h2>
              <p class="holo-desc">${desc}</p>
              <div class="proj-stack-pills">${tags}</div>
              <div class="holo-actions">${actions}</div>
            </div>
          </div>
        `);
      });
    });

    // Certificate Card Inspect Click
    document.querySelectorAll('.cert-card-cyber').forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img')?.src || '';
        const title = card.querySelector('h4')?.textContent || '';
        const meta = card.querySelector('.cert-meta')?.textContent || '';
        openHoloModal(`
          <div class="holo-cert-view">
            <img src="${img}" alt="${title}" />
            <div class="holo-cert-caption">
              <h3>${title}</h3>
              <p>${meta}</p>
            </div>
          </div>
        `);
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. CYBERDECK LAB TABS
  -------------------------------------------------------------------------- */
  function initCyberdeckTabs() {
    const tabBtns = document.querySelectorAll('.deck-tab-btn');
    const panes = document.querySelectorAll('.deck-pane');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        panes.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.getAttribute('data-deck-target'));
        target?.classList.add('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. CRYPTOLAB TERMINAL (CAESAR, BRUTE FORCE, VIGENÈRE, HILL 2x2 / 3x3)
  -------------------------------------------------------------------------- */
  function initCryptoLab() {
    const algoEl = document.getElementById('cryptoAlgo');
    const keyEl = document.getElementById('cryptoKey');
    const hintEl = document.getElementById('cryptoKeyHint');
    const inputEl = document.getElementById('cryptoInput');
    const outEl = document.getElementById('cryptoOutput');
    const termEl = document.getElementById('cryptoTerminal');
    const barEl = document.getElementById('cryptoProgress');
    const btnEnc = document.getElementById('cryptoBtnEnc');
    const btnDec = document.getElementById('cryptoBtnDec');
    const btnSample = document.getElementById('cryptoBtnSample');
    const btnClr = document.getElementById('cryptoBtnClr');

    if (!algoEl || !inputEl) return;

    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charToInt = (c) => ALPHABET.indexOf(c.toUpperCase());
    const intToChar = (n) => ALPHABET[((n % 26) + 26) % 26];
    const isLetter = (c) => /[a-zA-Z]/.test(c);

    algoEl.addEventListener('change', () => {
      const v = algoEl.value;
      if (v === 'caesar') {
        keyEl.value = '3';
        keyEl.placeholder = 'Ex: 3';
        hintEl.textContent = 'Décalage numérique (ex: 3). Vide en Déchiffrement = Attaque Force Brute.';
      } else if (v === 'vigenere') {
        keyEl.value = 'EVODEVS';
        keyEl.placeholder = 'Ex: EVODEVS';
        hintEl.textContent = 'Mot-clé alphabétique (ex: EVODEVS ou CAPRI).';
      } else {
        keyEl.value = '3, 3; 2, 5';
        keyEl.placeholder = 'Ex: 3, 3; 2, 5';
        hintEl.textContent = 'Matrice carrée inversible mod 26 (ex 2x2: 3,3; 2,5).';
      }
    });

    btnSample?.addEventListener('click', () => {
      inputEl.value = 'CALEB YANG // ARCHITECTE LOGICIEL @ EVODEVS 237';
      if (!keyEl.value) {
        keyEl.value = algoEl.value === 'caesar' ? '3' : algoEl.value === 'vigenere' ? 'EVODEVS' : '3, 3; 2, 5';
      }
    });

    btnClr?.addEventListener('click', () => {
      inputEl.value = '';
      outEl.value = '';
      if (barEl) barEl.style.width = '0%';
      termEl.innerHTML = `<span class="prompt">root@cyd-deck:~#</span> ${t('crypto_term_ready')}`;
    });

    function runCaesar(text, keyStr, mode) {
      if (!keyStr.trim() && mode === 'decrypt') {
        const steps = ['[BRUTE-FORCE] Test des 25 clés de César possibles :'];
        let all = '';
        for (let s = 1; s < 26; s++) {
          let line = '';
          for (const ch of text) {
            if (isLetter(ch)) {
              const up = ch === ch.toUpperCase();
              const c = intToChar(charToInt(ch) - s);
              line += up ? c : c.toLowerCase();
            } else line += ch;
          }
          steps.push(`Shift -${String(s).padStart(2, '0')} => ${line.slice(0, 48)}`);
          all += `[Clé ${s}] ${line}\n`;
        }
        return { final: all.trim(), steps };
      }
      const k = parseInt(keyStr, 10);
      if (isNaN(k)) return { error: 'Clé César invalide (entier requis).' };
      const shift = mode === 'encrypt' ? k : -k;
      const steps = [`[CAESAR // ${mode.toUpperCase()}] Décalage appliqué : ${shift} (mod 26)`];
      let final = '';
      for (const ch of text) {
        if (isLetter(ch)) {
          const up = ch === ch.toUpperCase();
          const p = charToInt(ch);
          const c = ((p + shift) % 26 + 26) % 26;
          const out = intToChar(c);
          final += up ? out : out.toLowerCase();
          if (steps.length < 18) steps.push(`  '${ch.toUpperCase()}' (${p}) -> (${p} + ${shift}) mod 26 = ${c} -> '${out}'`);
        } else final += ch;
      }
      return { final, steps };
    }

    function runVigenere(text, keyStr, mode) {
      const kClean = keyStr.toUpperCase().replace(/[^A-Z]/g, '');
      if (!kClean) return { error: 'La clé Vigenère doit contenir des lettres (ex: EVODEVS).' };
      const steps = [`[VIGENÈRE // ${mode.toUpperCase()}] Clé active : "${kClean}"`];
      let final = '';
      let ki = 0;
      for (const ch of text) {
        if (isLetter(ch)) {
          const up = ch === ch.toUpperCase();
          const p = charToInt(ch);
          const kc = kClean[ki % kClean.length];
          const k = charToInt(kc);
          const c = mode === 'encrypt' ? (p + k) % 26 : ((p - k) % 26 + 26) % 26;
          const out = intToChar(c);
          final += up ? out : out.toLowerCase();
          if (steps.length < 18) {
            const sym = mode === 'encrypt' ? '+' : '-';
            steps.push(`  '${ch.toUpperCase()}'(${p}) ${sym} '${kc}'(${k}) = ${c} mod 26 -> '${out}'`);
          }
          ki++;
        } else final += ch;
      }
      return { final, steps };
    }

    function runHill(text, keyStr, mode) {
      let matrix;
      try {
        matrix = keyStr.split(';').map((r) => r.split(',').map((n) => ((parseInt(n.trim(), 10) % 26) + 26) % 26));
        if (matrix.length !== 2 || matrix[0].length !== 2 || matrix[1].length !== 2) {
          return { error: 'Entrez une matrice 2x2 au format: 3, 3; 2, 5' };
        }
      } catch (_) {
        return { error: 'Format de matrice Hill invalide. Ex: 3, 3; 2, 5' };
      }

      const det = (((matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26) + 26) % 26;
      let detInv = -1;
      for (let x = 1; x < 26; x++) {
        if ((det * x) % 26 === 1) {
          detInv = x;
          break;
        }
      }

      let work = matrix;
      const steps = [`[HILL 2x2 // ${mode.toUpperCase()}] det(K) = ${det} mod 26`];
      if (mode === 'decrypt') {
        if (detInv === -1) return { error: `Matrice non inversible mod 26 (det=${det}). Essayez: 3, 3; 2, 5` };
        work = [
          [(matrix[1][1] * detInv) % 26, ((-matrix[0][1] * detInv) % 26 + 26) % 26],
          [((-matrix[1][0] * detInv) % 26 + 26) % 26, (matrix[0][0] * detInv) % 26]
        ];
        steps.push(`  det⁻¹ mod 26 = ${detInv} | K⁻¹ = [${work[0].join(', ')}; ${work[1].join(', ')}]`);
      }

      const letters = [];
      for (let i = 0; i < text.length; i++) {
        if (isLetter(text[i])) letters.push({ ch: text[i], up: text[i] === text[i].toUpperCase(), idx: i });
      }
      if (letters.length % 2 !== 0) {
        letters.push({ ch: 'X', up: true, idx: -1 });
        steps.push("  Padding: ajout de 'X' pour compléter le dernier bloc 2x1.");
      }

      const outArr = text.split('');
      let extra = '';
      for (let i = 0; i < letters.length; i += 2) {
        const v0 = charToInt(letters[i].ch);
        const v1 = charToInt(letters[i + 1].ch);
        const r0 = (work[0][0] * v0 + work[0][1] * v1) % 26;
        const r1 = (work[1][0] * v0 + work[1][1] * v1) % 26;
        const c0 = intToChar(r0);
        const c1 = intToChar(r1);
        if (steps.length < 18) {
          steps.push(`  Bloc [${letters[i].ch.toUpperCase()},${letters[i + 1].ch.toUpperCase()}] -> [${r0},${r1}] -> [${c0},${c1}]`);
        }
        if (letters[i].idx !== -1) outArr[letters[i].idx] = letters[i].up ? c0 : c0.toLowerCase();
        else extra += c0;
        if (letters[i + 1].idx !== -1) outArr[letters[i + 1].idx] = letters[i + 1].up ? c1 : c1.toLowerCase();
        else extra += c1;
      }
      return { final: outArr.join('') + extra, steps };
    }

    function execute(mode) {
      const text = inputEl.value.trim();
      if (!text) {
        termEl.innerHTML = `<span class="prompt err">ERR //</span> Saisissez un texte d'entrée ou cliquez sur EXEMPLE CYBER.`;
        return;
      }
      const algo = algoEl.value;
      const key = keyEl.value;
      const res =
        algo === 'caesar' ? runCaesar(text, key, mode) :
        algo === 'vigenere' ? runVigenere(text, key, mode) :
        runHill(text, key, mode);

      if (res.error) {
        termEl.innerHTML = `<span class="prompt err">ERR //</span> ${res.error}`;
        return;
      }

      outEl.value = res.final;
      if (barEl) barEl.style.width = '100%';
      termEl.innerHTML = res.steps.map((s) => `<div>${s}</div>`).join('') +
        `<div class="term-success">>> OPÉRATION TERMINÉE (${res.final.length} octets générés)</div>`;
    }

    btnEnc?.addEventListener('click', () => execute('encrypt'));
    btnDec?.addEventListener('click', () => execute('decrypt'));
  }

  /* --------------------------------------------------------------------------
     6. CONWAY'S GAME OF LIFE (NEON CYBER AUTOMATON)
  -------------------------------------------------------------------------- */
  function initGameOfLife() {
    const canvas = document.getElementById('golCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const CELL = 16;
    const cols = Math.floor(canvas.width / CELL);
    const rows = Math.floor(canvas.height / CELL);

    let grid = Array.from({ length: cols }, () => Array(rows).fill(0));
    let running = false;
    let gen = 0;
    let timer = null;

    const genEl = document.getElementById('golGenCount');
    const popEl = document.getElementById('golPopCount');
    const btnPlay = document.getElementById('golBtnPlay');
    const btnStep = document.getElementById('golBtnStep');
    const btnRand = document.getElementById('golBtnRandom');
    const btnGlider = document.getElementById('golBtnGlider');
    const btnClear = document.getElementById('golBtnClear');

    function render() {
      ctx.fillStyle = '#070913';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let pop = 0;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if (grid[x][y]) {
            pop++;
            ctx.fillStyle = (x + y) % 2 === 0 ? '#05d9e8' : '#ff2a6d';
            ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
          } else {
            ctx.strokeStyle = 'rgba(5, 217, 232, 0.08)';
            ctx.strokeRect(x * CELL, y * CELL, CELL, CELL);
          }
        }
      }
      if (genEl) genEl.textContent = String(gen);
      if (popEl) popEl.textContent = String(pop);
    }

    function step() {
      const next = Array.from({ length: cols }, () => Array(rows).fill(0));
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let neighbors = 0;
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + cols) % cols;
              const ny = (y + dy + rows) % rows;
              neighbors += grid[nx][ny];
            }
          }
          if (grid[x][y] === 1 && (neighbors === 2 || neighbors === 3)) next[x][y] = 1;
          else if (grid[x][y] === 0 && neighbors === 3) next[x][y] = 1;
        }
      }
      grid = next;
      gen++;
      render();
    }

    function seedRandom() {
      gen = 0;
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          grid[x][y] = Math.random() > 0.78 ? 1 : 0;
        }
      }
      render();
    }

    function seedGliders() {
      grid = Array.from({ length: cols }, () => Array(rows).fill(0));
      gen = 0;
      const patterns = [
        [2, 2], [3, 3], [4, 1], [4, 2], [4, 3],
        [14, 6], [15, 7], [16, 5], [16, 6], [16, 7],
        [26, 10], [27, 11], [28, 9], [28, 10], [28, 11]
      ];
      patterns.forEach(([x, y]) => {
        if (x < cols && y < rows) grid[x][y] = 1;
      });
      render();
    }

    btnPlay?.addEventListener('click', () => {
      running = !running;
      btnPlay.textContent = running ? t('gol_pause', 'PAUSE') : t('gol_play', 'DÉMARRER');
      if (running) {
        timer = setInterval(step, 120);
      } else if (timer) {
        clearInterval(timer);
      }
    });

    btnStep?.addEventListener('click', step);
    btnRand?.addEventListener('click', seedRandom);
    btnGlider?.addEventListener('click', seedGliders);
    btnClear?.addEventListener('click', () => {
      grid = Array.from({ length: cols }, () => Array(rows).fill(0));
      gen = 0;
      render();
    });

    // Click / drag on canvas to toggle cells
    let painting = false;
    function paintAt(e) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.floor(((e.clientX - rect.left) * scaleX) / CELL);
      const y = Math.floor(((e.clientY - rect.top) * scaleY) / CELL);
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        grid[x][y] = 1;
        render();
      }
    }
    canvas.addEventListener('pointerdown', (e) => {
      painting = true;
      paintAt(e);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (painting) paintAt(e);
    });
    window.addEventListener('pointerup', () => {
      painting = false;
    });

    seedRandom();
  }

  /* --------------------------------------------------------------------------
     7. DEV QUEST 2077 MINI-GAME (LEGACY PORTFOLIO HOMAGE)
  -------------------------------------------------------------------------- */
  function initDevQuest() {
    const gridEl = document.getElementById('questGrid');
    const statusEl = document.getElementById('questStatus');
    const movesEl = document.getElementById('questMoves');
    const resetBtn = document.getElementById('questResetBtn');
    if (!gridEl) return;

    const SIZE = 7;
    let player = { x: 0, y: 0 };
    let moves = 0;
    const firewalls = [
      { x: 2, y: 1 }, { x: 4, y: 2 }, { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 5 }
    ];
    const nodes = [
      { x: 6, y: 0, id: 'dossier', label: 'DOSSIER', hacked: false },
      { x: 0, y: 6, id: 'arsenal', label: 'ARSENAL', hacked: false },
      { x: 6, y: 3, id: 'missions', label: 'MISSIONS', hacked: false },
      { x: 6, y: 6, id: 'uplink', label: 'UPLINK', hacked: false }
    ];

    function renderGrid() {
      gridEl.innerHTML = '';
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const cell = document.createElement('div');
          cell.className = 'quest-cell';
          const isPlayer = player.x === x && player.y === y;
          const isWall = firewalls.some((w) => w.x === x && w.y === y);
          const node = nodes.find((n) => n.x === x && n.y === y);

          if (isPlayer) {
            cell.classList.add('player');
            cell.textContent = '⚡';
          } else if (isWall) {
            cell.classList.add('firewall');
            cell.textContent = '🧱';
          } else if (node) {
            cell.classList.add(node.hacked ? 'node-hacked' : 'node-target');
            cell.textContent = node.hacked ? '✓' : '💎';
            cell.title = node.label;
          }
          gridEl.appendChild(cell);
        }
      }
      if (movesEl) movesEl.textContent = `${moves} moves`;
    }

    function move(dx, dy) {
      const nx = player.x + dx;
      const ny = player.y + dy;
      if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) return;
      if (firewalls.some((w) => w.x === nx && w.y === ny)) {
        if (statusEl) statusEl.textContent = '⚠️ Pare-feu ICE détecté ! Contournez ce bloc.';
        return;
      }
      player.x = nx;
      player.y = ny;
      moves++;

      const hit = nodes.find((n) => n.x === nx && n.y === ny && !n.hacked);
      if (hit) {
        hit.hacked = true;
        const doneCount = nodes.filter((n) => n.hacked).length;
        if (statusEl) {
          statusEl.innerHTML = doneCount === nodes.length
            ? `🏆 <strong>SYSTÈME PIRATÉ !</strong> Les 4 nœuds de Caleb Yang sont déverrouillés en ${moves} mouvements !`
            : `🔓 Nœud <strong>${hit.label}</strong> piraté (${doneCount}/4) !`;
        }
      }
      renderGrid();
    }

    document.querySelectorAll('[data-quest-dir]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const d = btn.getAttribute('data-quest-dir');
        if (d === 'up') move(0, -1);
        if (d === 'down') move(0, 1);
        if (d === 'left') move(-1, 0);
        if (d === 'right') move(1, 0);
      });
    });

    resetBtn?.addEventListener('click', () => {
      player = { x: 0, y: 0 };
      moves = 0;
      nodes.forEach((n) => (n.hacked = false));
      if (statusEl) statusEl.textContent = 'Réseau réinitialisé. Piratez les 4 nœuds 💎 !';
      renderGrid();
    });

    renderGrid();
  }

  /* --------------------------------------------------------------------------
     8. CONTACT FORM UPLINK
  -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('cyberContactForm');
    const status = document.getElementById('cyberFormStatus');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const prev = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = t('form_sending', 'TRANSMISSION...');

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          status.textContent = t('form_ok');
          status.className = 'cyber-form-status ok';
          form.reset();
        } else {
          throw new Error('Network error');
        }
      } catch (_) {
        status.textContent = t('form_err');
        status.className = 'cyber-form-status err';
      } finally {
        btn.disabled = false;
        btn.innerHTML = prev;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initCyberCanvas();
    initHUDAndHero();
    initFiltersAndModals();
    initCyberdeckTabs();
    initCryptoLab();
    initGameOfLife();
    initDevQuest();
    initContactForm();
  });
})();
