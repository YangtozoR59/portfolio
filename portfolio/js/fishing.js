/* ================================================
   🎣 FISHING GAME ENGINE
   Portfolio de Caleb Yang
   Pêchez dans les abysses pour découvrir mon profil
   ================================================ */

(function () {
  'use strict';

  /* ====== i18n HELPER ====== */
  function t(key, fallback) {
    return (window._i18n && window._i18n.t) ? window._i18n.t(key) : (fallback || key);
  }

  /* ====== CONSTANTS ====== */
  const WATER_LINE_RATIO = 0.18;
  const CAST_POWER_SPEED = 0.015;
  const BITE_WINDOW = 2500;
  const REEL_CLICKS_NEEDED = 8;
  const FISH_RESPAWN_DELAY = 4000;

  const STATES = {
    INTRO: 'intro', IDLE: 'idle', CASTING: 'casting',
    FLYING: 'flying', WAITING: 'waiting', NIBBLE: 'nibble',
    BITE: 'bite', REELING: 'reeling', CAUGHT: 'caught', DISPLAYING: 'displaying'
  };

  /* ====== SPECIES CONFIG ====== */
  const SPECIES_DATA = {
    stats:    { id:'stats',    nameKey:'fish_stats_name',    labelKey:'fish_stats_label',    icon:'⚡', c1:'#00F5D4', c2:'#00A896', glow:'#00F5D4', bW:1.0, bH:0.5, sz:[18,24], spd:[1.2,1.8], depth:[0.22,0.40], reelN:4, section:'.row-stats' },
    about:    { id:'about',    nameKey:'fish_about_name',    labelKey:'fish_about_label',    icon:'🐡', c1:'#33f7dd', c2:'#00897B', glow:'#00F5D4', bW:1.1, bH:0.65,sz:[28,36], spd:[0.6,1.0], depth:[0.30,0.55], reelN:5, section:'.row-bio' },
    skills:   { id:'skills',   nameKey:'fish_skills_name',   labelKey:'fish_skills_label',   icon:'🐠', c1:'#00BFFF', c2:'#0077B6', glow:'#00BFFF', bW:0.8, bH:0.9, sz:[30,40], spd:[0.7,1.1], depth:[0.35,0.60], reelN:6, section:'.row-skills' },
    projects: { id:'projects', nameKey:'fish_projects_name', labelKey:'fish_projects_label', icon:'🦈', c1:'#9BA8C0', c2:'#5A6B85', glow:'#9B4DFF', bW:1.4, bH:0.45,sz:[45,60], spd:[1.0,1.5], depth:[0.45,0.75], reelN:9, section:'.row-projects' },
    services: { id:'services', nameKey:'fish_services_name', labelKey:'fish_services_label', icon:'🐙', c1:'#9B4DFF', c2:'#6A1B9A', glow:'#9B4DFF', bW:0.7, bH:0.7, sz:[35,48], spd:[0.4,0.8], depth:[0.50,0.70], reelN:7, section:'.row-services', isOctopus:true },
    contact:  { id:'contact',  nameKey:'fish_contact_name',  labelKey:'fish_contact_label',  icon:'🐋', c1:'#4FC3F7', c2:'#0288D1', glow:'#00BFFF', bW:1.6, bH:0.55,sz:[55,75], spd:[0.3,0.6], depth:[0.60,0.85], reelN:10,section:'.row-contact', isWhale:true },
    cv:       { id:'cv',       nameKey:'fish_cv_name',       labelKey:'fish_cv_label',       icon:'⭐', c1:'#FFD54F', c2:'#FF8F00', glow:'#FFD54F', bW:0.6, bH:0.6, sz:[22,30], spd:[0.2,0.4], depth:[0.82,0.95], reelN:6, section:null, isStarfish:true }
  };

  function getSpecies() {
    return Object.values(SPECIES_DATA).map(sp => ({
      ...sp,
      name: t(sp.nameKey, sp.nameKey),
      label: t(sp.labelKey, sp.labelKey)
    }));
  }

  /* ====== SOUND FX (Web Audio API) ====== */
  class SoundFX {
    constructor() { this.ctx = null; this.enabled = true; this.initialized = false; }

    init() {
      if (this.initialized) return;
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
      } catch(e) { this.enabled = false; }
    }

    _tone(freq, dur, type, vol) {
      if (!this.ctx || !this.enabled) return;
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      o.start(); o.stop(this.ctx.currentTime + dur);
    }

    _noise(dur, vol, filterFreq) {
      if (!this.ctx || !this.enabled) return;
      const n = this.ctx.sampleRate * dur;
      const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (n * 0.15));
      const s = this.ctx.createBufferSource(); s.buffer = buf;
      const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filterFreq || 2000;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(vol, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      s.connect(f); f.connect(g); g.connect(this.ctx.destination); s.start();
    }

    cast()    { this._tone(600, 0.25, 'sine', 0.12); this._tone(300, 0.3, 'sine', 0.08); }
    splash()  { this._noise(0.35, 0.3, 1800); this._tone(120, 0.15, 'sine', 0.08); }
    nibble()  { this._tone(500, 0.06, 'square', 0.08); setTimeout(() => this._tone(520, 0.06, 'square', 0.08), 100); }
    bite()    { this._tone(880, 0.12, 'square', 0.18); setTimeout(() => this._tone(1100, 0.15, 'square', 0.22), 100); }
    reel()    { this._tone(180 + Math.random()*40, 0.04, 'square', 0.06); }
    catchFish() {
      [523,659,784,1047].forEach((f,i) => setTimeout(() => this._tone(f, 0.35, 'sine', 0.18), i*100));
      setTimeout(() => this._noise(0.3, 0.15, 3000), 50);
    }
    miss()    { this._tone(300, 0.2, 'sawtooth', 0.08); this._tone(150, 0.3, 'sawtooth', 0.06); }
  }

  /* ====== SPLASH PARTICLE ====== */
  class SplashParticle {
    constructor(x, y) {
      this.x = x; this.y = y;
      this.vx = (Math.random() - 0.5) * 6;
      this.vy = -2 - Math.random() * 5;
      this.size = 1.5 + Math.random() * 3;
      this.life = 1; this.decay = 0.015 + Math.random() * 0.02;
      this.color = Math.random() > 0.5 ? '180,230,255' : '0,245,212';
    }
    update() { this.vy += 0.12; this.x += this.vx; this.y += this.vy; this.life -= this.decay; }
    draw(ctx) {
      if (this.life <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.life * 0.7})`;
      ctx.fill();
    }
  }

  /* ====== FISH CLASS ====== */
  class Fish {
    constructor(species, W, H, waterY) {
      this.sp = species;
      this.W = W; this.H = H; this.waterY = waterY;
      const sz = species.sz;
      this.size = sz[0] + Math.random() * (sz[1] - sz[0]);
      const spd = species.spd;
      this.baseSpeed = spd[0] + Math.random() * (spd[1] - spd[0]);
      const depthMin = waterY + (H - waterY) * species.depth[0];
      const depthMax = waterY + (H - waterY) * species.depth[1];
      this.y = depthMin + Math.random() * (depthMax - depthMin);
      this.fromLeft = Math.random() > 0.5;
      this.x = this.fromLeft ? -this.size * 2 : W + this.size * 2;
      this.dir = this.fromLeft ? 1 : -1;
      this.vx = this.baseSpeed * this.dir;
      this.vy = 0;
      this.state = 'swimming'; // swimming, curious, approaching, biting, caught, fleeing
      this.tailPhase = Math.random() * Math.PI * 2;
      this.wobblePhase = Math.random() * Math.PI * 2;
      this.curiosityTimer = 0;
      this.alive = true;
      this.caught = false;
      this.opacity = 0;
      this.tentaclePhase = 0;
    }

    update(dt, hookX, hookY, hookInWater, hasBite) {
      this.tailPhase += 0.08 * this.baseSpeed;
      this.wobblePhase += 0.02;
      this.tentaclePhase += 0.04;
      if (this.opacity < 1) this.opacity = Math.min(1, this.opacity + 0.01);

      if (this.state === 'swimming') {
        this.vx = this.baseSpeed * this.dir;
        this.vy = Math.sin(this.wobblePhase) * 0.3;
        // Only become curious if no other fish is already biting
        if (hookInWater && !hasBite) {
          const dx = hookX - this.x, dy = hookY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && Math.random() < 0.005) { this.state = 'curious'; this.curiosityTimer = 0; }
        }
      } else if (this.state === 'curious') {
        // If another fish is biting, flee immediately
        if (hasBite) { this.state = 'fleeing'; }
        else {
          const dx = hookX - this.x, dy = hookY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          // Circle around hook
          const circleAngle = angle + Math.PI / 2;
          this.vx = Math.cos(circleAngle) * this.baseSpeed * 0.7 + Math.cos(angle) * 0.2;
          this.vy = Math.sin(circleAngle) * this.baseSpeed * 0.7 + Math.sin(angle) * 0.2;
          this.dir = this.vx > 0 ? 1 : -1;
          this.curiosityTimer += dt;
          if (dist < 60 && this.curiosityTimer > 1500) {
            this.state = 'approaching';
            this.curiosityTimer = 0;
          }
          if (dist > 200 || this.curiosityTimer > 6000) {
            this.state = 'swimming';
            this.dir = this.x < this.W / 2 ? 1 : -1;
          }
        }
      } else if (this.state === 'approaching') {
        // If another fish is biting, flee immediately
        if (hasBite) { this.state = 'fleeing'; }
        else {
          const dx = hookX - this.x, dy = hookY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          this.vx = Math.cos(angle) * this.baseSpeed * 0.5;
          this.vy = Math.sin(angle) * this.baseSpeed * 0.5;
          this.dir = this.vx > 0 ? 1 : -1;
          if (dist < 20) { this.state = 'biting'; return 'bite'; }
          this.curiosityTimer += dt;
          if (this.curiosityTimer > 3000) { this.state = 'fleeing'; }
        }
      } else if (this.state === 'biting') {
        this.vx = 0; this.vy = 0;
        this.x += (hookX - this.x) * 0.1;
        this.y += (hookY - this.y) * 0.1;
      } else if (this.state === 'caught') {
        // Will be moved by the game
      } else if (this.state === 'fleeing') {
        this.dir = this.x < hookX ? -1 : 1;
        this.vx = this.baseSpeed * this.dir * 2;
        this.vy = (Math.random() - 0.5) * 2;
        if (this.x < -100 || this.x > this.W + 100) this.alive = false;
      }

      this.x += this.vx;
      this.y += this.vy;
      // Boundary (stay in water)
      const depthMin = this.waterY + 20;
      const depthMax = this.H - 20;
      if (this.y < depthMin) { this.y = depthMin; this.vy = Math.abs(this.vy); }
      if (this.y > depthMax) { this.y = depthMax; this.vy = -Math.abs(this.vy); }
      // Off screen check for swimming fish
      if (this.state === 'swimming' && ((this.dir > 0 && this.x > this.W + this.size * 3) || (this.dir < 0 && this.x < -this.size * 3))) {
        this.alive = false;
      }
      return null;
    }

    draw(ctx) {
      if (!this.alive) return;
      ctx.save();
      ctx.translate(this.x, this.y);
      // Negative scale = flip horizontally so fish always face their movement direction
      // Fish body is drawn facing LEFT by default (eye at -bw*0.5)
      // dir=1 (moving right) → flip to face right; dir=-1 (moving left) → no flip
      ctx.scale(-this.dir, 1);
      ctx.globalAlpha = this.opacity;

      const s = this.size;
      const tail = Math.sin(this.tailPhase) * 0.3;

      // Glow
      const glowG = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.2);
      glowG.addColorStop(0, this.sp.glow + '25');
      glowG.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(0, 0, s * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glowG; ctx.fill();

      if (this.sp.isOctopus) {
        this._drawOctopus(ctx, s);
      } else if (this.sp.isStarfish) {
        this._drawStarfish(ctx, s);
      } else if (this.sp.isWhale) {
        this._drawWhale(ctx, s, tail);
      } else {
        this._drawFish(ctx, s, tail);
      }

      ctx.globalAlpha = 1;
      ctx.restore();

      // Label
      this._drawLabel(ctx);
    }

    _drawFish(ctx, s, tail) {
      const bw = s * this.sp.bW, bh = s * this.sp.bH;
      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, bw, bh, 0, 0, Math.PI * 2);
      const bg = ctx.createLinearGradient(0, -bh, 0, bh);
      bg.addColorStop(0, this.sp.c1); bg.addColorStop(1, this.sp.c2);
      ctx.fillStyle = bg; ctx.fill();
      ctx.strokeStyle = this.sp.c1 + '60'; ctx.lineWidth = 0.8; ctx.stroke();
      // Tail
      ctx.beginPath(); ctx.moveTo(bw * 0.8, 0);
      ctx.lineTo(bw * 1.4, -bh * 0.7 + tail * s);
      ctx.lineTo(bw * 1.4, bh * 0.7 + tail * s);
      ctx.closePath();
      ctx.fillStyle = this.sp.c2; ctx.fill();
      // Dorsal fin
      ctx.beginPath(); ctx.moveTo(-bw * 0.2, -bh);
      ctx.quadraticCurveTo(0, -bh - s * 0.4, bw * 0.3, -bh * 0.6);
      ctx.lineTo(-bw * 0.1, -bh * 0.85);
      ctx.closePath();
      ctx.fillStyle = this.sp.c1 + 'AA'; ctx.fill();
      // Eye
      ctx.beginPath(); ctx.arc(-bw * 0.5, -bh * 0.15, s * 0.13, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(-bw * 0.48, -bh * 0.15, s * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      // Pectoral fin
      ctx.beginPath(); ctx.moveTo(-bw * 0.1, bh * 0.4);
      ctx.quadraticCurveTo(-bw * 0.3, bh + s * 0.2, 0, bh * 0.7);
      ctx.strokeStyle = this.sp.c2 + 'AA'; ctx.lineWidth = 1; ctx.stroke();
      // Lantern glow for lanternfish
      if (this.sp.id === 'about') {
        const pulse = 0.6 + 0.4 * Math.sin(this.tailPhase * 2);
        const lg = ctx.createRadialGradient(-bw * 0.8, -bh * 0.3, 0, -bw * 0.8, -bh * 0.3, s * 0.5);
        lg.addColorStop(0, `rgba(0,245,212,${0.6 * pulse})`);
        lg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(-bw * 0.8, -bh * 0.3, s * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = lg; ctx.fill();
        ctx.beginPath(); ctx.arc(-bw * 0.8, -bh * 0.3, s * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
      }
    }

    _drawOctopus(ctx, s) {
      const r = s * 0.5;
      // Head
      ctx.beginPath(); ctx.ellipse(0, -r * 0.3, r, r * 1.1, 0, 0, Math.PI * 2);
      const bg = ctx.createRadialGradient(0, -r * 0.3, 0, 0, -r * 0.3, r * 1.2);
      bg.addColorStop(0, this.sp.c1); bg.addColorStop(1, this.sp.c2);
      ctx.fillStyle = bg; ctx.fill();
      // Eyes
      ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.4, s * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(-r * 0.33, -r * 0.4, s * 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      ctx.beginPath(); ctx.arc(r * 0.35, -r * 0.4, s * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(r * 0.37, -r * 0.4, s * 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      // Tentacles
      for (let i = 0; i < 8; i++) {
        const baseX = (i - 3.5) * (r * 0.28);
        const phase = this.tentaclePhase + i * 0.7;
        ctx.beginPath(); ctx.moveTo(baseX, r * 0.5);
        const len = s * (0.7 + 0.2 * Math.sin(phase));
        const wave = Math.sin(phase * 2) * s * 0.15;
        ctx.quadraticCurveTo(baseX + wave, r * 0.5 + len * 0.5, baseX + wave * 0.5, r * 0.5 + len);
        ctx.strokeStyle = this.sp.c1 + '80'; ctx.lineWidth = 2; ctx.stroke();
      }
    }

    _drawWhale(ctx, s, tail) {
      const bw = s * this.sp.bW, bh = s * this.sp.bH;
      // Body
      ctx.beginPath();
      ctx.moveTo(-bw, 0);
      ctx.quadraticCurveTo(-bw * 0.5, -bh * 1.2, bw * 0.3, -bh * 0.4);
      ctx.quadraticCurveTo(bw * 0.7, 0, bw * 0.3, bh * 0.5);
      ctx.quadraticCurveTo(-bw * 0.3, bh * 1.1, -bw, 0);
      const bg = ctx.createLinearGradient(0, -bh, 0, bh);
      bg.addColorStop(0, this.sp.c1); bg.addColorStop(1, this.sp.c2);
      ctx.fillStyle = bg; ctx.fill();
      // Tail fluke
      ctx.beginPath(); ctx.moveTo(bw * 0.5, 0);
      ctx.lineTo(bw * 1.1, -bh * 0.8 + tail * s);
      ctx.quadraticCurveTo(bw * 0.8, 0, bw * 1.1, bh * 0.8 + tail * s);
      ctx.closePath();
      ctx.fillStyle = this.sp.c2; ctx.fill();
      // Eye
      ctx.beginPath(); ctx.arc(-bw * 0.6, -bh * 0.1, s * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(-bw * 0.58, -bh * 0.1, s * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = '#111'; ctx.fill();
      // Belly gradient
      ctx.beginPath();
      ctx.ellipse(-bw * 0.1, bh * 0.2, bw * 0.6, bh * 0.3, 0, 0, Math.PI);
      ctx.fillStyle = this.sp.c1 + '30'; ctx.fill();
    }

    _drawStarfish(ctx, s) {
      const arms = 5, outerR = s * 0.8, innerR = s * 0.35;
      ctx.beginPath();
      for (let i = 0; i < arms * 2; i++) {
        const angle = (i * Math.PI / arms) - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        const wobble = Math.sin(this.tentaclePhase + i) * s * 0.05;
        ctx.lineTo(Math.cos(angle) * (r + wobble), Math.sin(angle) * (r + wobble));
      }
      ctx.closePath();
      const bg = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR);
      bg.addColorStop(0, this.sp.c1); bg.addColorStop(1, this.sp.c2);
      ctx.fillStyle = bg; ctx.fill();
      ctx.strokeStyle = this.sp.c1 + '80'; ctx.lineWidth = 1; ctx.stroke();
      // Center eye
      ctx.beginPath(); ctx.arc(0, 0, s * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
    }

    _drawLabel(ctx) {
      const labelY = this.y - this.size - 14;
      const alpha = this.state === 'curious' || this.state === 'approaching' ? 0.9 : 0.45;
      ctx.save();
      ctx.globalAlpha = alpha * this.opacity;
      ctx.font = '600 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = this.sp.glow;
      ctx.shadowColor = this.sp.glow;
      ctx.shadowBlur = 8;
      const label = t(this.sp.labelKey, this.sp.label);
      ctx.fillText(this.sp.icon + ' ' + label, this.x, labelY);
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }

  /* ====== MAIN FISHING GAME ====== */
  class FishingGame {
    constructor() {
      this.canvas = document.getElementById('fishingCanvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.sound = new SoundFX();
      this.active = false;
      this.state = STATES.INTRO;
      this.W = 0; this.H = 0; this.waterY = 0;
      // Rod
      this.rodBaseX = 0; this.rodBaseY = 0;
      this.rodTipX = 0; this.rodTipY = 0;
      this.mouseX = 0; this.mouseY = 0;
      this.rodBend = 0; this.targetBend = 0;
      // Line & hook
      this.hookX = 0; this.hookY = 0;
      this.hookTargetY = 0; this.hookInWater = false;
      // Cast
      this.castPower = 0; this.casting = false;
      // Fish
      this.fish = [];
      this.currentBiteFish = null;
      this.biteTimer = 0;
      // Reel
      this.reelProgress = 0;
      // Particles
      this.splashes = [];
      // Catch book
      this.catches = new Set();
      // Timers
      this.lastSpawnTime = 0;
      this.spawnInterval = 3000;
      this.hintTimer = 0;
      this.time = 0;
      this.lastTime = 0;
      // Wave
      this.waveOffset = 0;
      // Species (refreshed for i18n)
      this.SPECIES = getSpecies();

      this._resize();
      this._bind();
      this._spawnInitialFish();
    }

    _resize() {
      this.W = this.canvas.width = window.innerWidth;
      this.H = this.canvas.height = window.innerHeight;
      this.waterY = this.H * WATER_LINE_RATIO;
      this.rodBaseX = this.W / 2;
      this.rodBaseY = this.waterY - 60;
      this.mouseX = this.W / 2;
    }

    _bind() {
      window.addEventListener('resize', () => this._resize());
      this.canvas.addEventListener('mousedown', (e) => this._onDown(e.clientX, e.clientY));
      this.canvas.addEventListener('mouseup', () => this._onUp());
      this.canvas.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY; });
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const t = e.touches[0];
        this._onDown(t.clientX, t.clientY);
      }, { passive: false });
      this.canvas.addEventListener('touchend', (e) => { e.preventDefault(); this._onUp(); }, { passive: false });
      this.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const t = e.touches[0];
        this.mouseX = t.clientX; this.mouseY = t.clientY;
      }, { passive: false });

      // Fix: intro button is above canvas (z-index 30) so canvas mousedown never fires.
      // Bind directly to the button as well as the overlay div.
      const introBtn = document.getElementById('introStart');
      const introOverlay = document.getElementById('fishingIntro');
      const dismissIntro = (e) => {
        e.stopPropagation();
        this.sound.init();
        this.startFromIntro();
      };
      if (introBtn) introBtn.addEventListener('click', dismissIntro);
      if (introOverlay) introOverlay.addEventListener('click', dismissIntro);
    }

    /* Public: transition out of INTRO state */
    startFromIntro() {
      if (this.state !== STATES.INTRO) return;
      this.state = STATES.IDLE;
      const intro = document.getElementById('fishingIntro');
      if (intro) intro.classList.add('hidden');
    }

    _onDown(x, y) {
      this.sound.init();
      if (this.state === STATES.INTRO) {
        this.state = STATES.IDLE;
        const intro = document.getElementById('fishingIntro');
        if (intro) intro.classList.add('hidden');
        return;
      }
      if (this.state === STATES.IDLE) {
        this.state = STATES.CASTING;
        this.castPower = 0;
        this.casting = true;
        return;
      }
      if (this.state === STATES.BITE) {
        this._startReeling();
        return;
      }
      if (this.state === STATES.REELING) {
        this.reelProgress += (1 / (this.currentBiteFish?.sp.reelN || REEL_CLICKS_NEEDED));
        this.sound.reel();
        this.targetBend = 0.5;
        return;
      }
      if (this.state === STATES.WAITING) {
        // Reel back empty
        this.state = STATES.IDLE;
        this.hookInWater = false;
        this.hookY = this.rodTipY;
        return;
      }
    }

    _onUp() {
      if (this.state === STATES.CASTING && this.casting) {
        this.casting = false;
        this._releaseCast();
      }
    }

    _releaseCast() {
      this.sound.cast();
      this.state = STATES.FLYING;
      const maxDepth = this.waterY + (this.H - this.waterY) * (0.3 + this.castPower * 0.65);
      this.hookTargetY = maxDepth;
      this.hookX = this.rodTipX;
      this.hookY = this.rodTipY;
      this.hookInWater = false;
    }

    _startReeling() {
      this.state = STATES.REELING;
      this.reelProgress = 0;
      this.sound.reel();
    }

    _spawnInitialFish() {
      this.SPECIES.forEach(sp => {
        if (!this.catches.has(sp.id)) {
          this._spawnFish(sp, true);
        }
      });
    }

    _spawnFish(species, initial) {
      const f = new Fish(species, this.W, this.H, this.waterY);
      if (initial) {
        f.x = this.W * 0.1 + Math.random() * this.W * 0.8;
        f.opacity = 1;
      }
      this.fish.push(f);
    }

    _trySpawnFish() {
      const now = performance.now();
      if (now - this.lastSpawnTime < this.spawnInterval) return;
      this.lastSpawnTime = now;
      // Find species not currently on screen and not caught
      const onScreen = new Set(this.fish.filter(f => f.alive).map(f => f.sp.id));
      const missing = this.SPECIES.filter(sp => !onScreen.has(sp.id) && !this.catches.has(sp.id));
      if (missing.length > 0) {
        const sp = missing[Math.floor(Math.random() * missing.length)];
        this._spawnFish(sp, false);
      }
    }

    _splash(x, y, count) {
      for (let i = 0; i < count; i++) this.splashes.push(new SplashParticle(x, y));
    }

    /* ====== CATCH REVEAL ====== */
    _showCatch(fish) {
      this.catches.add(fish.sp.id);
      this.state = STATES.DISPLAYING;

      const reveal = document.getElementById('catchReveal');
      const badge = document.getElementById('catchBadge');
      const content = document.getElementById('catchContent');
      const nameEl = document.getElementById('catchSpeciesName');
      const titleEl = document.querySelector('.catch-title');
      const continueBtn = document.getElementById('catchContinue');

      const fishName = t(fish.sp.nameKey, fish.sp.name || fish.sp.nameKey);
      const fishLabel = t(fish.sp.labelKey, fish.sp.label || fish.sp.labelKey);

      if (badge) badge.innerHTML = `<span class="catch-icon">${fish.sp.icon}</span>`;
      if (nameEl) nameEl.textContent = fishName + ' — ' + fishLabel;
      if (titleEl) titleEl.textContent = t('catch_title', 'PRISE !');
      if (continueBtn) continueBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i> ${t('catch_continue', 'Pêcher encore')}`;

      if (fish.sp.section) {
        const source = document.querySelector(fish.sp.section);
        if (source && content) {
          content.innerHTML = '';
          const clone = source.cloneNode(true);
          clone.style.display = '';
          clone.querySelectorAll('.reveal-card').forEach(c => c.classList.add('visible'));
          clone.querySelectorAll('.skill-fill').forEach(f => { f.style.width = f.dataset.width + '%'; });
          content.appendChild(clone);
        }
      } else if (fish.sp.id === 'cv') {
        if (content) {
          content.innerHTML = `<div class="cv-catch-content"><h3>📄 ${t('cv_download_title', 'Télécharger mon CV')}</h3><p>${t('cv_catch_text', "Vous avez attrapé l'Étoile de Mer ! Récupérez mon CV.")}</p><div class="cv-btns"><a href="./source/CV_Caleb_Yang FR.pdf" download="CV_Caleb_Yang_FR.pdf" class="btn-download-cv" aria-label="${t('btn_download_cv_fr', 'CV Français')}"><i class="bi bi-file-earmark-arrow-down"></i> ${t('btn_download_cv_fr', 'CV Français')}</a><a href="./source/CV_Caleb_Yang en-US.pdf" download="CV_Caleb_Yang_EN.pdf" class="btn-download-cv" aria-label="${t('btn_download_cv_en', 'CV English')}"><i class="bi bi-file-earmark-arrow-down"></i> ${t('btn_download_cv_en', 'CV English')}</a></div></div>`;
        }
      }

      if (reveal) reveal.classList.add('active');

      // Update journal
      this._updateJournal();
      // Update catch counter
      const counter = document.getElementById('catchCount');
      if (counter) counter.textContent = this.catches.size;
    }

    closeCatchReveal() {
      const reveal = document.getElementById('catchReveal');
      if (reveal) reveal.classList.remove('active');
      this.state = STATES.IDLE;
      this.hookInWater = false;
      this.hookY = this.rodTipY;
      this.currentBiteFish = null;
    }

    _updateJournal() {
      const grid = document.getElementById('journalGrid');
      if (!grid) return;
      grid.innerHTML = '';
      const journalTitle = document.querySelector('.journal-panel h3');
      if (journalTitle) journalTitle.innerHTML = `<i class="bi bi-journal-bookmark"></i> ${t('journal_title', 'Journal de prises')}`;
      this.SPECIES.forEach(sp => {
        const label = t(sp.labelKey, sp.label || sp.labelKey);
        const item = document.createElement('div');
        item.className = 'journal-item' + (this.catches.has(sp.id) ? ' caught' : '');
        item.innerHTML = `<span class="journal-icon">${this.catches.has(sp.id) ? sp.icon : '❓'}</span><span class="journal-name">${this.catches.has(sp.id) ? label : '???'}</span>`;
        if (this.catches.has(sp.id)) {
          item.addEventListener('click', () => {
            this._showCatchById(sp.id);
          });
        }
        grid.appendChild(item);
      });
      const jCount = document.getElementById('journalCount');
      if (jCount) jCount.textContent = this.catches.size + '/' + this.SPECIES.length;
    }

    _showCatchById(id) {
      const sp = this.SPECIES.find(s => s.id === id);
      if (sp) this._showCatch({ sp });
    }

    /* ====== UPDATE ====== */
    update(dt) {
      this.time += dt * 0.001;
      this.waveOffset += dt * 0.002;

      // Rod tip follows mouse horizontally
      const targetTipX = Math.max(80, Math.min(this.W - 80, this.mouseX));
      this.rodTipX += (targetTipX - this.rodTipX) * 0.08;
      this.rodTipY = this.waterY - 20;
      this.rodBaseX = this.W / 2;
      this.rodBaseY = 20;

      // Rod bend
      this.rodBend += (this.targetBend - this.rodBend) * 0.1;
      this.targetBend *= 0.95;

      // Cast power
      if (this.state === STATES.CASTING && this.casting) {
        this.castPower = Math.min(1, this.castPower + CAST_POWER_SPEED);
        const meter = document.getElementById('castMeterFill');
        if (meter) meter.style.height = (this.castPower * 100) + '%';
        const meterEl = document.getElementById('castMeter');
        if (meterEl) meterEl.classList.add('active');
      } else {
        const meterEl = document.getElementById('castMeter');
        if (meterEl) meterEl.classList.remove('active');
      }

      // Flying (hook dropping)
      if (this.state === STATES.FLYING) {
        this.hookY += 4 + this.castPower * 3;
        this.hookX += (this.rodTipX - this.hookX) * 0.02;
        if (!this.hookInWater && this.hookY > this.waterY) {
          this.hookInWater = true;
          this.sound.splash();
          this._splash(this.hookX, this.waterY, 15);
        }
        if (this.hookY >= this.hookTargetY) {
          this.hookY = this.hookTargetY;
          this.state = STATES.WAITING;
          this.hintTimer = 0;
        }
      }

      // Waiting
      if (this.state === STATES.WAITING) {
        // Hook sways
        this.hookX += Math.sin(this.time * 2) * 0.3;
        this.hintTimer += dt;
      }

      // Bite timer
      if (this.state === STATES.BITE) {
        this.biteTimer -= dt;
        this.targetBend = 0.8 + Math.sin(this.time * 15) * 0.2;
        if (this.biteTimer <= 0) {
          // Missed!
          this.sound.miss();
          if (this.currentBiteFish) this.currentBiteFish.state = 'fleeing';
          this.currentBiteFish = null;
          this.state = STATES.WAITING;
          this._setHint(t('hint_missed', 'Raté ! Le poisson s\'est enfui...'));
          setTimeout(() => this._setHint(t('hint_reel_back', 'Cliquez pour remonter la ligne')), 2000);
        }
      }

      // Reeling
      if (this.state === STATES.REELING) {
        if (this.reelProgress >= 1) {
          // Caught!
          this.sound.catchFish();
          this._splash(this.hookX, this.waterY, 25);
          if (this.currentBiteFish) {
            this.currentBiteFish.state = 'caught';
            this.currentBiteFish.alive = false;
            this._showCatch(this.currentBiteFish);
          }
          this.hookInWater = false;
          this.targetBend = 0;
        } else {
          // Fish pulls back slightly
          this.reelProgress -= 0.001;
          this.reelProgress = Math.max(0, this.reelProgress);
          // Move hook up
          const surfaceY = this.waterY + 10;
          this.hookY = this.hookTargetY - (this.hookTargetY - surfaceY) * this.reelProgress;
          if (this.currentBiteFish) {
            this.currentBiteFish.x += (this.hookX - this.currentBiteFish.x) * 0.2;
            this.currentBiteFish.y += (this.hookY - this.currentBiteFish.y) * 0.2;
          }
        }
      }

      // Determine if a fish is currently biting/being reeled
      const hasBite = this.state === STATES.BITE || this.state === STATES.REELING;

      // Update fish
      for (let i = this.fish.length - 1; i >= 0; i--) {
        const f = this.fish[i];
        const result = f.update(dt, this.hookX, this.hookY, this.hookInWater && (this.state === STATES.WAITING), hasBite);
        if (result === 'bite' && this.state === STATES.WAITING) {
          this.state = STATES.BITE;
          this.currentBiteFish = f;
          this.biteTimer = BITE_WINDOW;
          this.sound.bite();
          this.targetBend = 1;
          this._setHint(t('hint_bite', '🎣 ÇA MORD ! Cliquez vite !'));
        }
        if (!f.alive) this.fish.splice(i, 1);
      }

      // Spawn fish
      this._trySpawnFish();

      // Splashes
      for (let i = this.splashes.length - 1; i >= 0; i--) {
        this.splashes[i].update();
        if (this.splashes[i].life <= 0) this.splashes.splice(i, 1);
      }

      // Hint timer (skip in INTRO state)
      if (this.state !== STATES.INTRO) {
        if (this.state === STATES.IDLE) {
          this._setHint(t('hint_cast', 'Cliquez et maintenez pour lancer votre ligne'));
        }
        if (this.state === STATES.WAITING && this.hintTimer > 8000 && this.hintTimer < 8100) {
          this._setHint(t('hint_patience', 'Un poisson rôde... patience !'));
        }
      }
    }

    _setHint(text) {
      const el = document.getElementById('gameHint');
      if (el) el.textContent = text;
    }

    /* ====== RENDER ====== */
    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);

      // Sky / above water
      const skyGrad = ctx.createLinearGradient(0, 0, 0, this.waterY);
      skyGrad.addColorStop(0, '#050510');
      skyGrad.addColorStop(1, '#0a1628');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, this.W, this.waterY);

      // Pier silhouette
      ctx.fillStyle = '#0a0a12';
      ctx.fillRect(this.W / 2 - 120, 0, 240, this.waterY - 50);
      ctx.fillRect(this.W / 2 - 150, this.waterY - 55, 300, 12);

      // Water body
      ctx.beginPath();
      ctx.moveTo(0, this.H);
      for (let x = 0; x <= this.W; x += 3) {
        const y = this.waterY +
          Math.sin(x * 0.015 + this.waveOffset * 2) * 4 +
          Math.sin(x * 0.008 + this.waveOffset * 1.3) * 6 +
          Math.sin(x * 0.003 + this.waveOffset * 0.7) * 3;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.lineTo(this.W, this.H); ctx.lineTo(0, this.H); ctx.closePath();
      const waterGrad = ctx.createLinearGradient(0, this.waterY, 0, this.H);
      waterGrad.addColorStop(0, 'rgba(0,50,100,0.55)');
      waterGrad.addColorStop(0.3, 'rgba(0,25,60,0.65)');
      waterGrad.addColorStop(1, 'rgba(5,5,25,0.75)');
      ctx.fillStyle = waterGrad; ctx.fill();

      // Caustics near surface
      for (let i = 0; i < 6; i++) {
        const cx = (this.W * 0.1 + i * this.W * 0.15 + Math.sin(this.time + i) * 40) % this.W;
        const cy = this.waterY + 30 + Math.sin(this.time * 0.5 + i * 2) * 15;
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50 + Math.sin(this.time + i) * 20);
        cg.addColorStop(0, 'rgba(0,245,212,0.04)');
        cg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2);
        ctx.fillStyle = cg; ctx.fill();
      }

      // Fish (behind line)
      this.fish.forEach(f => f.draw(ctx));

      // Fishing line + hook
      if (this.state !== STATES.IDLE && this.state !== STATES.INTRO && this.state !== STATES.DISPLAYING) {
        this._drawLine(ctx);
      }

      // Rod
      this._drawRod(ctx);

      // Splashes (above water surface)
      this.splashes.forEach(s => s.draw(ctx));

      // Water surface highlight
      ctx.beginPath();
      for (let x = 0; x <= this.W; x += 3) {
        const y = this.waterY +
          Math.sin(x * 0.015 + this.waveOffset * 2) * 4 +
          Math.sin(x * 0.008 + this.waveOffset * 1.3) * 6 +
          Math.sin(x * 0.003 + this.waveOffset * 0.7) * 3;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(180,230,255,0.25)';
      ctx.lineWidth = 2; ctx.stroke();

      // Reel progress bar
      if (this.state === STATES.REELING) {
        const bw = 200, bh = 12, bx = this.W / 2 - bw / 2, by = this.H - 60;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.roundRect(bx - 2, by - 2, bw + 4, bh + 4, 8); ctx.fill();
        ctx.fillStyle = 'rgba(0,245,212,0.15)';
        ctx.roundRect(bx, by, bw, bh, 6); ctx.fill();
        ctx.fillStyle = '#00F5D4';
        ctx.roundRect(bx, by, bw * Math.min(1, this.reelProgress), bh, 6); ctx.fill();
        ctx.font = '600 12px Inter, sans-serif';
        ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
        ctx.fillText(t('hint_reel', '🎣 Cliquez pour mouliner !'), this.W / 2, by - 10);
      }
    }

    _drawRod(ctx) {
      const bend = this.rodBend;
      const tipX = this.rodTipX;
      const tipY = this.rodTipY + bend * 25;
      const baseX = this.rodBaseX;
      const baseY = this.rodBaseY;
      // Rod shaft
      const cp1x = baseX + (tipX - baseX) * 0.4;
      const cp1y = baseY + (tipY - baseY) * 0.3 + bend * 15;
      const cp2x = baseX + (tipX - baseX) * 0.7;
      const cp2y = baseY + (tipY - baseY) * 0.7 + bend * 30;

      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, tipX, tipY);
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();
      // Thinner tip
      ctx.beginPath();
      ctx.moveTo(cp2x, cp2y);
      ctx.lineTo(tipX, tipY);
      ctx.strokeStyle = '#C9A84C';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Reel
      const reelX = baseX + (tipX - baseX) * 0.2;
      const reelY = baseY + (tipY - baseY) * 0.2 + 5;
      ctx.beginPath(); ctx.arc(reelX, reelY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#888'; ctx.fill();
      ctx.strokeStyle = '#aaa'; ctx.lineWidth = 1.5; ctx.stroke();
      // Handle
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(baseX, baseY - 12);
      ctx.strokeStyle = '#5C4400'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke();
      // Rod tip glow
      ctx.beginPath(); ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00F5D4'; ctx.fill();
      ctx.shadowColor = '#00F5D4'; ctx.shadowBlur = 8;
      ctx.fill(); ctx.shadowBlur = 0;

      this._actualTipX = tipX;
      this._actualTipY = tipY;
    }

    _drawLine(ctx) {
      const tipX = this._actualTipX || this.rodTipX;
      const tipY = this._actualTipY || this.rodTipY;
      const segments = 20;
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const x = tipX + (this.hookX - tipX) * t + Math.sin(t * Math.PI * 2 + this.time * 3) * (1 - t) * 3;
        const y = tipY + (this.hookY - tipY) * t + Math.sin(t * Math.PI + this.time * 2) * (1 - t) * 8;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(200,220,240,0.6)';
      ctx.lineWidth = 1;
      ctx.stroke();
      // Hook
      const hx = this.hookX, hy = this.hookY;
      ctx.beginPath();
      ctx.moveTo(hx, hy - 4);
      ctx.lineTo(hx, hy + 6);
      ctx.quadraticCurveTo(hx + 8, hy + 10, hx + 6, hy + 2);
      ctx.strokeStyle = '#ccc'; ctx.lineWidth = 1.5; ctx.stroke();
      // Bait glow
      const pulse = 0.5 + 0.5 * Math.sin(this.time * 4);
      const bg = ctx.createRadialGradient(hx, hy + 6, 0, hx, hy + 6, 12);
      bg.addColorStop(0, `rgba(0,245,212,${0.3 * pulse})`);
      bg.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(hx, hy + 6, 12, 0, Math.PI * 2);
      ctx.fillStyle = bg; ctx.fill();
      ctx.beginPath(); ctx.arc(hx, hy + 6, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,212,${0.6 * pulse})`; ctx.fill();
    }

    /* ====== GAME LOOP ====== */
    start() {
      this.active = true;
      this.SPECIES = getSpecies();
      this.lastTime = performance.now();
      this._loop();
    }

    stop() {
      this.active = false;
    }

    /** Refresh all translated labels (called when language changes) */
    refreshLanguage() {
      this.SPECIES = getSpecies();
      this._updateJournal();
    }

    _loop() {
      if (!this.active) return;
      const now = performance.now();
      const dt = Math.min(now - this.lastTime, 50);
      this.lastTime = now;

      // Run update always (fish swim during intro too), skip only while displaying catch
      if (this.state !== STATES.DISPLAYING) {
        this.update(dt);
      }
      this.render();
      requestAnimationFrame(() => this._loop());
    }
  }

  /* ====== EXPOSE GLOBALLY ====== */
  window.FishingGame = FishingGame;

})();
