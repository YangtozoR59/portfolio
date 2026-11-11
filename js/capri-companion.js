/* ==========================================================================
   🤖 CAPRI AI — CYBERPUNK DESKTOP CONSTRUCT COMPANION
   Inspired by https://github.com/lachydotmcg/capri-desktop
   Custom Web Engine for Caleb Yang Damakoa (@ItzCyd) Portfolio
   ========================================================================== */

(function () {
  'use strict';

  const SPRITES = {
    idle: './source/capri/idle.webp',
    talk: './source/capri/talk.webp',
    tossed: './source/capri/tossed.webp',
    dancing: './source/capri/dancing.gif',
    perch: './source/capri/perch.webp',
    music: './source/capri/perch-music.webp',
    glitch: './source/capri/glitch.webp',
    sleep: './source/capri/sleep.webp',
    clones: './source/capri/clones.gif',
    plugged: './source/capri/plugged.gif'
  };

  const INTEL_LINES = {
    fr: [
      "Yo Choom ! Moi c'est <strong>Capri AI</strong>, le construct Cyberpunk open-source (<a href='https://github.com/lachydotmcg/capri-desktop' target='_blank' rel='noreferrer'>lachydotmcg/capri-desktop</a>). Je patrouille sur le Mainframe de <strong>Caleb Yang (@ItzCyd)</strong> !",
      "Tu peux me <strong>glisser-déposer (Drag & Drop)</strong> n'importe où sur l'écran ! Si tu me lances vite, mon moteur physique prend le relais.",
      "Caleb Yang Damakoa prépare son <strong>Master 1 en Systèmes & Logiciels en Environnements Distribués</strong> à l'Université de Ngaoundéré après son DUT et sa Licence LITECH à l'IUT.",
      "Tu as vu <strong>Pulse (P.A.E.S.)</strong> ? C'est une simulation 3D d'écosystème proie-prédateur en temps réel codée par Caleb avec <strong>Three.js</strong> et un post-processing UnrealBloom !",
      "Caleb est Co-Fondateur et Lead Dev du collectif <strong>Evodevs 237</strong>. Ils développent des plateformes web, des mini-apps et le bot Telegram <strong>@EvodevsteamBot</strong>.",
      "Besoin d'un architecte Laravel ou Node.js ? Caleb a conçu le portail officiel de l'<strong>EGEM Meiganga</strong> et l'ERP interne + boutique e-commerce de la <strong>Mutuelle de l'IUT</strong>.",
      "Descends dans la section <strong>CYBERDECK (06)</strong> ! Tu peux tester en direct son <strong>CryptoLab</strong> (César, Vigenère, Matrices de Hill), l'<strong>Automate de Conway</strong> et même le mini-jeu <strong>Dev Quest</strong> !",
      "Caleb détient <strong>7 certifications IA & Machine Learning</strong> (Prompt Engineering, AI-Powered A/B Testing, Vibe Coding, ML for Beginners). Clique sur la section <strong>CERTIFS</strong> pour les inspecter !",
      "Dans mon application de bureau originale (<strong>Capri Desktop</strong>), je parle 80+ langues avec Kokoro-82M, je rejoins tes appels Discord et j'incarne Claude Code en mode <em>Code Husk</em> !",
      "Un projet freelance ou un poste CDI ? Connecte-toi à Caleb sur <strong>LinkedIn</strong> (caleb-yang-970b35387), <strong>Discord</strong> ou <strong>Telegram (@ItzCyd)</strong> !",
      "Astuce Netrunner : clique sur le bouton <strong>AVATAR HOLO</strong> dans le Hero pour basculer entre la version <em>Comic Cyber</em>, le portrait <em>Noir & Blanc</em> et la photo studio de Caleb !",
      "En stage chez <strong>SYGALIN SAS</strong> et comme Chef de Projet chez <strong>MATHS237</strong>, Caleb a livré des modules statistiques en production et l'annuaire national <em>Entreprise du Pays</em>."
    ],
    en: [
      "Yo Choom! I'm <strong>Capri AI</strong>, the open-source Cyberpunk desktop construct (<a href='https://github.com/lachydotmcg/capri-desktop' target='_blank' rel='noreferrer'>lachydotmcg/capri-desktop</a>). Currently patrolling <strong>Caleb Yang's (@ItzCyd)</strong> Mainframe!",
      "You can <strong>Drag & Drop</strong> me anywhere across the viewport! Throw me fast and watch my momentum physics kick in.",
      "Caleb Yang Damakoa is pursuing his <strong>Master's 1 in Distributed Systems & Software</strong> at the University of Ngaoundéré after earning his DUT and B.Tech (LITECH) in Computer Engineering.",
      "Checked out <strong>Pulse (P.A.E.S.)</strong> yet? It's a real-time 3D prey-predator cellular automaton built by Caleb with <strong>Three.js</strong> and UnrealBloom post-processing!",
      "Caleb is Co-Founder & Lead Dev of <strong>Evodevs 237</strong>, shipping web platforms, AI workflows, and the <strong>@EvodevsteamBot</strong> Telegram ordering bot.",
      "Need a Laravel or Node.js architect? Caleb built the official portal for <strong>EGEM Meiganga</strong> plus the internal ERP and e-commerce platform for the <strong>IUT Staff Mutual Insurance</strong>.",
      "Scroll down to the <strong>CYBERDECK (06)</strong>! You can run Caleb's <strong>CryptoLab</strong> (Caesar, Vigenère, 2x2/3x3 Hill Matrices), <strong>Conway's Game of Life</strong>, and <strong>Dev Quest</strong> live!",
      "Caleb holds <strong>7 AI & Machine Learning certificates</strong> (Prompt Engineering, AI-Powered A/B Testing, Vibe Coding, ML for Beginners). Check the <strong>CERTS</strong> section!",
      "In my native desktop app (<strong>Capri Desktop</strong>), I speak 80+ languages offline with Kokoro-82M, hop into Discord voice calls, and embody coding agents via <em>Code Husk Mode</em>!",
      "Got a freelance mission or full-time role? Ping Caleb on <strong>LinkedIn</strong> (caleb-yang-970b35387), <strong>Discord</strong>, or <strong>Telegram (@ItzCyd)</strong>!",
      "Netrunner Tip: click the <strong>HOLO AVATAR</strong> button in the Hero section to cycle between Caleb's <em>Cyber Comic</em> art, <em>Cinematic B&W</em> portrait, and studio photo!"
    ]
  };

  const SECTION_REACTIONS = {
    fr: {
      hud: "Bienvenue sur le <strong>HUD Principal</strong> de Caleb Yang ! Tout le système est nominal.",
      dossier: "Section <strong>DOSSIER (01)</strong> : Biométrie, vision d'architecte logiciel et télémétrie en direct.",
      arsenal: "Section <strong>ARSENAL (02)</strong> : Laravel, Express.js, Flutter, Three.js, Docker... Filtre les implants par catégorie !",
      missions: "Section <strong>MISSIONS (03)</strong> : 13 projets réels livrés ! Clique sur une carte pour ouvrir l'inspecteur holographique.",
      chronology: "Section <strong>CHRONOLOGIE (04)</strong> : Du DUT/LITECH au Master Systèmes Distribués, et de SYGALIN à Evodevs 237.",
      certs: "Section <strong>CERTIFICATIONS (05)</strong> : 7 accréditations en IA Générative, Prompt Engineering et Machine Learning.",
      cyberdeck: "Bienvenue dans le <strong>CYBERDECK (06)</strong> ! Chiffre un message avec Hill ou lance l'automate cellulaire de Conway.",
      uplink: "Section <strong>UPLINK (07)</strong> : Prêt à collaborer ? Envoie une transmission directe ou ajoute Caleb sur Discord / LinkedIn / Telegram !"
    },
    en: {
      hud: "Welcome to Caleb Yang's <strong>Mainframe HUD</strong>! All systems nominal.",
      dossier: "<strong>DOSSIER (01)</strong>: Biometrics, software architecture philosophy, and live status.",
      arsenal: "<strong>ARSENAL (02)</strong>: Laravel, Express.js, Flutter, Three.js, Docker... Filter the cyberware modules!",
      missions: "<strong>MISSIONS (03)</strong>: 13 shipped projects! Click any card to open the holographic quick-inspector.",
      chronology: "<strong>TIMELINE (04)</strong>: From Computer Engineering degrees to Master's in Distributed Systems & Lead Dev at Evodevs 237.",
      certs: "<strong>CERTIFICATIONS (05)</strong>: 7 credentials in Generative AI, Prompt Engineering, and Machine Learning.",
      cyberdeck: "Welcome to the <strong>CYBERDECK (06)</strong>! Encrypt streams with Hill matrices or run Conway's Game of Life.",
      uplink: "<strong>UPLINK (07)</strong>: Ready to build together? Transmit a packet or connect via LinkedIn, Discord, or Telegram!"
    }
  };

  function getLang() {
    return (window._i18n && window._i18n.getCurrentLang) ? window._i18n.getCurrentLang() : 'fr';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('capriWidget');
    const spriteImg = document.getElementById('capriSprite');
    const stateTag = document.getElementById('capriStateBadge');
    const bubble = document.getElementById('capriBubble');
    const bubbleText = document.getElementById('capriBubbleText');
    const bubbleClose = document.getElementById('capriBubbleClose');
    const btnFact = document.getElementById('capriBtnFact');
    const btnDance = document.getElementById('capriBtnDance');
    const btnRoam = document.getElementById('capriBtnRoam');
    const btnClone = document.getElementById('capriBtnClone');
    const hudSummonBtn = document.getElementById('hudCapriSummon');

    if (!widget || !spriteImg) return;

    // Preload key sprites so transitions are instant
    Object.values(SPRITES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Position & Physics State
    const W_SIZE = 128;
    let posX = Math.max(24, window.innerWidth - 180);
    let posY = Math.max(90, window.innerHeight - 210);
    let velX = 0;
    let velY = 0;
    let isDragging = false;
    let dragMoved = false;
    let startPointerX = 0;
    let startPointerY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastMoveTime = 0;

    // AI Behavior State
    let currentState = 'idle';
    let isRoaming = true;
    let targetX = posX;
    let targetY = posY;
    let facingLeft = false;
    let bubbleTimer = null;
    let stateRevertTimer = null;
    let lastFactIdx = -1;
    let lastInteractionTime = Date.now();

    function applyTransform() {
      const maxX = Math.max(16, window.innerWidth - W_SIZE - 16);
      const maxY = Math.max(72, window.innerHeight - W_SIZE - 16);
      posX = Math.max(12, Math.min(maxX, posX));
      posY = Math.max(72, Math.min(maxY, posY));

      widget.style.transform = `translate3d(${Math.round(posX)}px, ${Math.round(posY)}px, 0)`;

      // Flip sprite horizontally depending on movement direction
      spriteImg.style.transform = facingLeft ? 'scaleX(-1)' : 'scaleX(1)';

      // Keep speech bubble inside viewport
      if (posX < 280) {
        widget.classList.add('bubble-right');
      } else {
        widget.classList.remove('bubble-right');
      }
      if (posY < 220) {
        widget.classList.add('bubble-bottom');
      } else {
        widget.classList.remove('bubble-bottom');
      }
    }

    function setState(newState, durationMs = 0) {
      if (stateRevertTimer) {
        clearTimeout(stateRevertTimer);
        stateRevertTimer = null;
      }
      currentState = newState;
      const src = SPRITES[newState] || SPRITES.idle;
      if (!spriteImg.src.endsWith(src.replace('./', ''))) {
        spriteImg.src = src;
      }
      if (stateTag) {
        stateTag.textContent = `CAPRI // ${newState.toUpperCase()}`;
      }
      if (durationMs > 0) {
        stateRevertTimer = setTimeout(() => {
          setState('idle');
        }, durationMs);
      }
    }

    function speak(htmlMessage, spriteState = 'talk', durationMs = 9500) {
      lastInteractionTime = Date.now();
      if (bubbleTimer) clearTimeout(bubbleTimer);

      bubbleText.innerHTML = htmlMessage;
      bubble.classList.add('visible');
      setState(spriteState, Math.min(durationMs, 5500));

      bubbleTimer = setTimeout(() => {
        bubble.classList.remove('visible');
      }, durationMs);
    }

    function speakRandomIntel(customSprite) {
      const lang = getLang();
      const pool = INTEL_LINES[lang] || INTEL_LINES.fr;
      let idx = Math.floor(Math.random() * pool.length);
      if (idx === lastFactIdx && pool.length > 1) {
        idx = (idx + 1) % pool.length;
      }
      lastFactIdx = idx;
      speak(pool[idx], customSprite || 'talk', 10000);
    }

    // Pick a new autonomous waypoint on the screen edges or over UI panels
    function pickNewWaypoint() {
      const margin = 40;
      const maxX = Math.max(margin, window.innerWidth - W_SIZE - margin);
      const maxY = Math.max(90, window.innerHeight - W_SIZE - margin);

      // 65% chance to perch near a visible cyber-panel header
      const panels = Array.from(document.querySelectorAll('.cyber-panel, .project-card-cyber')).filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top > 90 && r.top < window.innerHeight - 160 && r.width > 200;
      });

      if (panels.length > 0 && Math.random() < 0.65) {
        const chosen = panels[Math.floor(Math.random() * panels.length)];
        const rect = chosen.getBoundingClientRect();
        targetX = Math.min(maxX, Math.max(margin, rect.right - 140 - Math.random() * 120));
        targetY = Math.min(maxY, Math.max(85, rect.top - 68));
      } else {
        targetX = margin + Math.random() * (maxX - margin);
        targetY = 90 + Math.random() * (maxY - 90);
      }

      if (targetX < posX - 10) facingLeft = true;
      else if (targetX > posX + 10) facingLeft = false;
    }

    // Main 60fps animation & physics loop
    function tick() {
      if (!isDragging) {
        // Momentum physics when tossed
        if (Math.abs(velX) > 0.25 || Math.abs(velY) > 0.25) {
          posX += velX;
          posY += velY;
          velX *= 0.92;
          velY *= 0.92;

          const maxX = window.innerWidth - W_SIZE - 16;
          const maxY = window.innerHeight - W_SIZE - 16;
          if (posX <= 12 || posX >= maxX) {
            velX = -velX * 0.7;
            facingLeft = velX < 0;
          }
          if (posY <= 72 || posY >= maxY) {
            velY = -velY * 0.7;
          }
          targetX = posX;
          targetY = posY;
          applyTransform();
        } else if (isRoaming && currentState !== 'sleep') {
          // Gentle autonomous floating toward target waypoint
          const dx = targetX - posX;
          const dy = targetY - posY;
          const dist = Math.hypot(dx, dy);
          if (dist > 4) {
            const speed = Math.min(1.35, Math.max(0.35, dist * 0.018));
            posX += (dx / dist) * speed;
            posY += (dy / dist) * speed;
            applyTransform();
          }
        }

        // Auto-sleep if user hasn't interacted with Capri for 75s
        if (Date.now() - lastInteractionTime > 75000 && currentState === 'idle') {
          setState('sleep');
        }
      }
      requestAnimationFrame(tick);
    }

    // Periodic roaming & random intel broadcast
    setInterval(() => {
      if (isDragging || !isRoaming || currentState === 'sleep') return;
      pickNewWaypoint();
      // Occasionally switch perch/music animation while roaming
      if (currentState === 'idle' && Math.random() < 0.35) {
        setState(Math.random() < 0.5 ? 'perch' : 'music', 5000);
      }
    }, 9000);

    setInterval(() => {
      if (isDragging || currentState === 'sleep') return;
      if (!bubble.classList.contains('visible') && Math.random() < 0.55) {
        speakRandomIntel();
      }
    }, 22000);

    // Pointer Events for Universal Drag & Drop (Mouse + Touch)
    const avatarHitbox = document.getElementById('capriAvatarHitbox');

    avatarHitbox.addEventListener('pointerdown', (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      isDragging = true;
      dragMoved = false;
      lastInteractionTime = Date.now();
      velX = 0;
      velY = 0;

      startPointerX = e.clientX;
      startPointerY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastMoveTime = performance.now();

      offsetX = e.clientX - posX;
      offsetY = e.clientY - posY;

      widget.classList.add('dragging');
      setState('tossed');
      avatarHitbox.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    avatarHitbox.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const moveDist = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY);
      if (moveDist > 6) dragMoved = true;

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime);
      velX = ((e.clientX - lastPointerX) / dt) * 14;
      velY = ((e.clientY - lastPointerY) / dt) * 14;
      velX = Math.max(-22, Math.min(22, velX));
      velY = Math.max(-22, Math.min(22, velY));

      if (e.clientX < lastPointerX - 2) facingLeft = true;
      else if (e.clientX > lastPointerX + 2) facingLeft = false;

      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastMoveTime = now;

      posX = e.clientX - offsetX;
      posY = e.clientY - offsetY;
      targetX = posX;
      targetY = posY;
      applyTransform();
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      widget.classList.remove('dragging');
      try {
        avatarHitbox.releasePointerCapture(e.pointerId);
      } catch (_) {}

      if (!dragMoved) {
        // Simple Click -> Tell a random piece of intel!
        velX = 0;
        velY = 0;
        speakRandomIntel('talk');
      } else {
        const speed = Math.hypot(velX, velY);
        if (speed > 8) {
          const lang = getLang();
          speak(
            lang === 'en'
              ? "WOOOH! Momentum physics engaged! Smooth throw, Netrunner ⚡"
              : "WOOOH ! Physique inertielle activée ! Beau lancer, Netrunner ⚡",
            'tossed',
            5000
          );
        } else {
          setState('perch', 3500);
        }
      }
    }

    avatarHitbox.addEventListener('pointerup', endDrag);
    avatarHitbox.addEventListener('pointercancel', endDrag);

    // Double-click -> Glitch / Code Husk Clone mode
    avatarHitbox.addEventListener('dblclick', () => {
      const lang = getLang();
      speak(
        lang === 'en'
          ? "<strong>CODE HUSK // MULTI-AGENT CLONES!</strong> Deploying sub-agent constructs across Caleb's workspace!"
          : "<strong>CODE HUSK // CLONES MULTI-AGENTS !</strong> Déploiement des sous-agents sur le bureau de Caleb !",
        'clones',
        6500
      );
    });

    // Control bar buttons inside Capri's HUD
    bubbleClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      bubble.classList.remove('visible');
      setState('idle');
    });

    btnFact?.addEventListener('click', (e) => {
      e.stopPropagation();
      speakRandomIntel('talk');
    });

    btnDance?.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = getLang();
      speak(
        lang === 'en'
          ? "🎵 Vibe Coding mode activated! Dancing on Caleb's Cyberpunk Mainframe!"
          : "🎵 Mode Vibe Coding activé ! Je danse sur le Mainframe Cyberpunk de Caleb !",
        'dancing',
        7500
      );
    });

    btnClone?.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = getLang();
      speak(
        lang === 'en'
          ? "⚡ Overclocking neural link! Direct connection to Night City established."
          : "⚡ Surcharge du lien neural ! Connexion directe établie avec le réseau d'Evodevs 237.",
        'plugged',
        6500
      );
    });

    btnRoam?.addEventListener('click', (e) => {
      e.stopPropagation();
      isRoaming = !isRoaming;
      btnRoam.classList.toggle('active', isRoaming);
      const lang = getLang();
      const labelKey = isRoaming ? 'capri_btn_roam' : 'capri_btn_roam_off';
      btnRoam.textContent = window._i18n ? window._i18n.t(labelKey) : (isRoaming ? 'ROAM: ON' : 'ROAM: OFF');
      if (isRoaming) {
        pickNewWaypoint();
        setState('perch', 3000);
      } else {
        targetX = posX;
        targetY = posY;
        setState('idle');
      }
    });

    // Summon button in Top Navbar
    hudSummonBtn?.addEventListener('click', () => {
      posX = Math.max(40, Math.min(window.innerWidth - 220, window.innerWidth / 2 + 120));
      posY = Math.max(95, Math.min(window.innerHeight - 220, 140));
      targetX = posX;
      targetY = posY;
      velX = 0;
      velY = 0;
      applyTransform();
      speakRandomIntel('glitch');
    });

    // React when user navigates to a section via HUD links
    document.querySelectorAll('[data-capri-section]').forEach((link) => {
      link.addEventListener('click', () => {
        const sec = link.getAttribute('data-capri-section');
        const lang = getLang();
        const msg = SECTION_REACTIONS[lang]?.[sec];
        if (msg) {
          setTimeout(() => speak(msg, 'talk', 7000), 400);
        }
      });
    });

    window.addEventListener('resize', () => {
      applyTransform();
    });

    // Initialize position & greet user after 1.2s
    applyTransform();
    requestAnimationFrame(tick);

    setTimeout(() => {
      speakRandomIntel('talk');
      pickNewWaypoint();
    }, 1200);
  });
})();
