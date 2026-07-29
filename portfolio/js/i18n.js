/* ==========================================
   🌐 INTERNATIONALIZATION (i18n)
   FR / EN language support
   ========================================== */

(function () {
  'use strict';

  const translations = {
    fr: {
      // === META ===
      lang_code: 'fr',
      lang_label: '🇫🇷 FR',
      lang_switch_label: '🇬🇧 EN',

      // === NAV ===
      nav_dashboard: 'Tableau de bord',
      nav_about: 'À propos',
      nav_skills: 'Compétences',
      nav_projects: 'Projets',
      nav_services: 'Services',
      nav_contact: 'Contact',

      // === SIDEBAR ===
      sidebar_role: 'Ingénieur logiciel',
      sidebar_location: 'Ngaoundéré, Cameroun',

      // === DASHBOARD HEADER ===
      dash_greeting: 'Portfolio professionnel',
      btn_download_cv: 'Télécharger mon CV',
      btn_download_cv_fr: 'CV Français',
      btn_download_cv_en: 'CV Anglais',

      // === STATS ===
      stats_title: "Vue d'ensemble",
      stat_projects: 'Projets livrés',
      stat_technologies: 'Technologies',
      stat_years: "Années d'exp.",
      stat_clients: 'Clients satisfaits',

      // === QUOTE ===
      quote_title: 'Inspiration',

      // === BIO ===
      bio_title: 'À propos de moi',
      bio_p1: "Ingénieur logiciel Full-Stack junior orienté produit, spécialisé en <strong>Laravel</strong>, <strong>Express.js</strong> et <strong>Flutter</strong>. Je maîtrise CI/CD, Docker et les bonnes pratiques de versioning.",
      bio_p2: "J'ai piloté le développement de solutions de gestion interne et d'un site vitrine pour la <strong>Mutuelle de l'IUT de Ngaoundéré</strong>, et mené un projet chez <strong>MATHS237</strong>, avec un fort souci de performance, qualité et UX.",
      bio_p3: "Compétences en SQL et NoSQL, statistiques et visualisation. Communicant efficace, bilingue <strong>français/anglais</strong>.",

      // === SITUATION ===
      situation_title: 'Situation actuelle',
      situation_status: 'Etudiant',
      situation_status_desc: 'Ouvert aux opportunités freelance et CDI',
      situation_education: 'Formation',
      situation_education_desc: "Master en Systèmes et Logiciels en Environnements Distribués — Université de Ngaoundéré",
      situation_experience: 'Expérience récente',
      situation_experience_desc: 'Lead Engineer chez Evodevs 237 — Projets Maths237 & Mutuelle IUT',
      situation_location: 'Localisation',
      situation_location_desc: 'Ngaoundéré, Cameroun — Remote-friendly',

      // === SKILLS ===
      skills_title: 'Compétences techniques',

      // === PROJECTS ===
      projects_title: 'Projets sélectionnés',
      project_1_desc: "Plateforme académique pour la recherche et la gestion d'hébergements étudiants.",
      project_1_date: 'Janvier 2026',
      project_2_title: 'EGEM — Site institutionnel',
      project_2_desc: "Site institutionnel pour l'École de Géologie et d'Exploitation des Mines.",
      project_2_date: 'Octobre 2025',
      project_3_title: 'Entreprise du Pays — Maths237',
      project_3_desc: "Application web pour rechercher des entreprises et des opportunités au Cameroun.",
      project_3_date: 'Août 2025',
      project_4_title: 'App de gestion — Mutuelle IUT',
      project_4_desc: "Application web pour centraliser les activités internes de la mutuelle.",
      project_4_date: 'Mai — Juil. 2025',
      project_5_title: 'Site vitrine & e‑commerce — MUIT',
      project_5_desc: "Site web présentant la mutuelle, ses formations et produits avec e‑commerce.",
      project_5_date: 'Mai — Juil. 2025',
      project_6_title: 'MATHS237 — Plateforme éducative',
      project_6_desc: "Plateforme en ligne dédiée à la vulgarisation et l'apprentissage des maths.",
      project_6_date: 'Septembre 2024',
      project_7_title: 'AEFCA — Cartes membres',
      project_7_desc: "Application web pour générer et gérer des cartes de membre d'association.",
      project_7_date: 'Août 2024',
      project_8_title: 'Module statistique — SYGALIN',
      project_8_desc: "Module de reporting et suivi statistique des tickets sur plateformes internes.",
      project_8_date: 'Mars — Mai 2024',
      project_9_title: 'Grace Oil Gold — Site vitrine',
      project_9_desc: "Site vitrine pour la startup Grace Oil Gold, produits et services.",
      project_9_date: 'Septembre 2024',
      project_10_title: 'Cryptographic Tool — Application web',
      project_10_desc: "Application de chiffrement et de cryptanalyse.",
      project_10_date: 'Juin 2026',
      project_11_title: 'Pulse — P.A.E.S.',
      project_11_desc: "Simulation 3D interactive d'écosystème proie-prédateur basée sur un automate cellulaire, rendue en temps réel via Three.js avec post-processing Bloom.",
      project_11_date: 'Juin 2026',
      project_12_title: 'Evodevs Team — Site vitrine',
      project_12_desc: "Site vitrine du collectif Evodevs Team — présentation des services, tarifs et processus de collaboration.",
      project_12_date: 'Juin 2026',
      project_13_title: 'Evodevs Store — Bot Telegram',
      project_13_desc: "Bot Telegram de commande pour l'équipe Evodevs — catalogue de services, prise de commande et suivi client.",
      project_13_date: 'Juin 2026',
      project_view: 'Voir',
      
      // === SERVICES ===
      services_title: 'Ce que je peux apporter',
      service_1_title: 'Conception & Backend',
      service_1_desc: "Architectures backend robustes, modélisation des données et développement d'APIs RESTful performantes.",
      service_2_title: 'Interfaces Web modernes',
      service_2_desc: "Création d'interfaces réactives, accessibles et centrées utilisateur avec les frameworks CSS/JS modernes.",
      service_3_title: 'Applications Mobiles',
      service_3_desc: "Développement cross‑platform avec Flutter, du prototype au déploiement sur Android et iOS.",

      // === CONTACT ===
      contact_title: 'Me contacter',
      contact_name_label: 'Nom',
      contact_name_placeholder: 'Votre nom',
      contact_email_label: 'Email',
      contact_email_placeholder: 'Votre email',
      contact_message_label: 'Message',
      contact_message_placeholder: 'Votre message',
      contact_send: 'Envoyer',
      contact_sending: 'Envoi...',
      contact_success: '✅ Message envoyé avec succès ! Je vous répondrai rapidement.',
      contact_error: "❌ Erreur lors de l'envoi. Veuillez réessayer.",

      // === FOOTER ===
      footer_text: 'Tous droits réservés.',

      // === DEPTH ===
      depth_label: 'Profondeur',

      // === FISHING GAME ===
      fishing_intro_title: 'Les Abysses de Caleb',
      fishing_intro_desc: 'Pêchez dans les profondeurs pour découvrir mon portfolio',
      fishing_intro_btn: 'Cliquez pour commencer',
      fishing_intro_hint_prefix: 'ou passez en mode classique avec le bouton',
      hud_catches_suffix: 'prises',
      hint_cast: 'Cliquez et maintenez pour lancer votre ligne',
      hint_patience: 'Un poisson rôde... patience !',
      hint_bite: '🎣 ÇA MORD ! Cliquez vite !',
      hint_missed: "Raté ! Le poisson s'est enfui...",
      hint_reel_back: 'Cliquez pour remonter la ligne',
      hint_reel: '🎣 Cliquez pour mouliner !',
      catch_title: 'PRISE !',
      catch_continue: 'Pêcher encore',
      journal_title: 'Journal de prises',
      cv_download_title: 'Télécharger mon CV',
      cv_catch_text: "Vous avez attrapé l'Étoile de Mer ! Récupérez mon CV.",
      mode_toggle_fishing: 'Passer en mode pêche',
      mode_toggle_classic: 'Passer en mode classique',
      cast_meter_label: 'Force',

      // === FISH SPECIES ===
      fish_stats_name: 'Poisson-Éclair',
      fish_stats_label: "Vue d'ensemble",
      fish_about_name: 'Poisson-Lanterne',
      fish_about_label: 'À propos',
      fish_skills_name: 'Poisson-Ange',
      fish_skills_label: 'Compétences',
      fish_projects_name: 'Requin Abyssal',
      fish_projects_label: 'Projets',
      fish_services_name: 'Pieuvre Brillante',
      fish_services_label: 'Services',
      fish_contact_name: 'Baleine Céleste',
      fish_contact_label: 'Contact',
      fish_cv_name: 'Étoile de Mer',
      fish_cv_label: 'Télécharger CV',
      mode_toggle_fishing: 'Passer en mode pêche',
      mode_toggle_classic: 'Passer en mode classique',
      mode_name_fishing: 'Passer en mode pêche',
      mode_name_classic: 'Passer en mode classique',

      // === CRYPTOLAB ===
      crypto_title: 'CryptoLab',
      crypto_subtitle: 'Apprenez la cryptographie classique étape par étape',
      crypto_algo: 'Algorithme',
      crypto_key: 'Clé',
      crypto_key_hint: 'Décalage numérique (ex: 3)',
      crypto_source: "Texte d'entrée",
      crypto_btn_encrypt: 'Chiffrer',
      crypto_btn_decrypt: 'Déchiffrer',
      crypto_btn_clear: 'Effacer',
      crypto_result: 'Résultat',
      crypto_ready: "Prêt. En attente d'une opération...",
      crypto_init: "Initialisation des calculs...",
      crypto_done: "Opération terminée avec succès.",
      crypto_err_empty: "Erreur : Le texte source est vide.",
      crypto_hint_caesar: "Décalage numérique (ex: 3). Laissez vide pour Force Brute.",
      crypto_hint_vigenere: "Mot-clé alphabétique (ex: SECRET)",
      crypto_hint_hill: "Matrice 2x2 ou 3x3 séparée par ; et ,",

      // === GAME OF LIFE ===
      gol_title: 'Jeu de la Vie',
      gol_subtitle: 'Expérimentez avec les automates cellulaires',
      gol_btn_play: 'Lecture',
      gol_btn_pause: 'Pause',
      gol_btn_next: 'Suivant',
      gol_btn_prev: 'Précédent',
      gol_btn_clear: 'Effacer',
      gol_btn_random: 'Aléatoire',
      gol_rules_title: 'Règles du Jeu (Conway)',
      gol_rules_desc: "Le Jeu de la Vie est un automate cellulaire. Chaque cellule de la grille est soit vivante, soit morte.<br><strong>1. Sous-population :</strong> Une cellule vivante avec moins de 2 voisins meurt.<br><strong>2. Surpopulation :</strong> Une cellule vivante avec plus de 3 voisins meurt.<br><strong>3. Survie :</strong> Une cellule vivante avec 2 ou 3 voisins survit.<br><strong>4. Reproduction :</strong> Une cellule morte avec exactement 3 voisins devient vivante.<br><br><em>Cliquez sur la grille pour modifier les cellules.</em>",
    },

    en: {
      // === META ===
      lang_code: 'en',
      lang_label: '🇬🇧 EN',
      lang_switch_label: '🇫🇷 FR',

      // === NAV ===
      nav_dashboard: 'Dashboard',
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_projects: 'Projects',
      nav_services: 'Services',
      nav_contact: 'Contact',

      // === SIDEBAR ===
      sidebar_role: 'Software engineer',
      sidebar_location: 'Ngaoundéré, Cameroon',

      // === DASHBOARD HEADER ===
      dash_greeting: 'Professional portfolio',
      btn_download_cv: 'Download my CV',
      btn_download_cv_fr: 'CV French',
      btn_download_cv_en: 'CV English',

      // === STATS ===
      stats_title: 'Overview',
      stat_projects: 'Projects delivered',
      stat_technologies: 'Technologies',
      stat_years: 'Years of exp.',
      stat_clients: 'Satisfied clients',

      // === QUOTE ===
      quote_title: 'Inspiration',

      // === BIO ===
      bio_title: 'About me',
      bio_p1: "Product-oriented Junior Full-Stack Software Engineer, specialized in <strong>Laravel</strong>, <strong>Express.js</strong> and <strong>Flutter</strong>. Proficient in CI/CD, Docker and version control best practices.",
      bio_p2: "Led the development of internal management solutions and a showcase website for the <strong>IUT Ngaoundéré Mutual Fund</strong>, and spearheaded a project at <strong>MATHS237</strong>, with strong focus on performance, quality and UX.",
      bio_p3: "Skilled in SQL and NoSQL, statistics and data visualization. Effective communicator, bilingual <strong>French/English</strong>.",

      // === SITUATION ===
      situation_title: 'Current status',
      situation_status: 'Student',
      situation_status_desc: 'Open to freelance and full-time opportunities',
      situation_education: 'Education',
      situation_education_desc: "Master's in Distributed Systems & Software — University of Ngaoundéré",
      situation_experience: 'Recent experience',
      situation_experience_desc: 'Lead Engineer at Evodevs 237 — Maths237 & Mutuelle IUT projects',
      situation_location: 'Location',
      situation_location_desc: 'Ngaoundéré, Cameroon — Remote-friendly',

      // === SKILLS ===
      skills_title: 'Technical skills',

      // === PROJECTS ===
      projects_title: 'Selected projects',
      project_1_desc: 'Academic platform for student accommodation search and management.',
      project_1_date: 'January 2026',
      project_2_title: 'EGEM — Institutional website',
      project_2_desc: 'Institutional website for the School of Geology and Mining Engineering.',
      project_2_date: 'October 2025',
      project_3_title: 'Entreprise du Pays — Maths237',
      project_3_desc: 'Web application to search for businesses and opportunities in Cameroon.',
      project_3_date: 'August 2025',
      project_4_title: 'Management App — Mutuelle IUT',
      project_4_desc: "Web application to centralize the mutual fund's internal activities.",
      project_4_date: 'May — Jul. 2025',
      project_5_title: 'Showcase & e‑commerce — MUIT',
      project_5_desc: 'Website showcasing the mutual fund, its training programs and products with e‑commerce.',
      project_5_date: 'May — Jul. 2025',
      project_6_title: 'MATHS237 — Educational platform',
      project_6_desc: 'Online platform dedicated to math education and popularization.',
      project_6_date: 'September 2024',
      project_7_title: 'AEFCA — Member cards',
      project_7_desc: 'Web application to generate and manage association membership cards.',
      project_7_date: 'August 2024',
      project_8_title: 'Statistics Module — SYGALIN',
      project_8_desc: 'Reporting and statistical tracking module for tickets on internal platforms.',
      project_8_date: 'March — May 2024',
      project_9_title: 'Grace Oil Gold — Showcase website',
      project_9_desc: 'Showcase website for Grace Oil Gold startup, products and services.',
      project_9_date: 'September 2024',
      project_10_title: 'Cryptographic Tool — Web application',
      project_10_desc: 'Web application for cryptography.',
      project_10_date: 'June 2026',
      project_11_title: 'Pulse — P.A.E.S.',
      project_11_desc: 'Interactive 3D prey-predator ecosystem simulation based on cellular automata, rendered in real-time with Three.js and Bloom post-processing.',
      project_11_date: 'June 2026',
      project_12_title: 'Evodevs Team — Showcase Website',
      project_12_desc: 'Showcase website for the Evodevs Team collective — services, pricing and collaboration workflow.',
      project_12_date: 'June 2026',
      project_13_title: 'Evodevs Store — Telegram Bot',
      project_13_desc: 'Telegram ordering bot for the Evodevs team — service catalog, order placement and client tracking.',
      project_13_date: 'June 2026',
      project_view: 'View',

      // === SERVICES ===
      services_title: 'What I can bring',
      service_1_title: 'Design & Backend',
      service_1_desc: 'Robust backend architectures, data modeling and high-performance RESTful API development.',
      service_2_title: 'Modern Web Interfaces',
      service_2_desc: 'Building responsive, accessible and user-centered interfaces with modern CSS/JS frameworks.',
      service_3_title: 'Mobile Applications',
      service_3_desc: 'Cross-platform development with Flutter, from prototype to deployment on Android and iOS.',

      // === CONTACT ===
      contact_title: 'Get in touch',
      contact_name_label: 'Name',
      contact_name_placeholder: 'Your name',
      contact_email_label: 'Email',
      contact_email_placeholder: 'Your email',
      contact_message_label: 'Message',
      contact_message_placeholder: 'Your message',
      contact_send: 'Send',
      contact_sending: 'Sending...',
      contact_success: '✅ Message sent successfully! I will get back to you soon.',
      contact_error: '❌ Error sending message. Please try again.',

      // === FOOTER ===
      footer_text: 'All rights reserved.',

      // === DEPTH ===
      depth_label: 'Depth',

      // === FISHING GAME ===
      fishing_intro_title: "Caleb's Abyss",
      fishing_intro_desc: 'Fish in the depths to discover my portfolio',
      fishing_intro_btn: 'Click to start',
      fishing_intro_hint_prefix: 'or switch to classic mode with the',
      hud_catches_suffix: 'catches',
      hint_cast: 'Click and hold to cast your line',
      hint_patience: 'A fish is lurking... be patient!',
      hint_bite: '🎣 IT\'S BITING! Click fast!',
      hint_missed: 'Missed! The fish got away...',
      hint_reel_back: 'Click to reel back in',
      hint_reel: '🎣 Click to reel in!',
      catch_title: 'CATCH!',
      catch_continue: 'Fish again',
      journal_title: 'Catch journal',
      cv_download_title: 'Download my CV',
      cv_catch_text: 'You caught the Starfish! Get my CV.',
      mode_toggle_fishing: 'Switch to fishing mode',
      mode_toggle_classic: 'Switch to classic mode',
      cast_meter_label: 'Power',

      // === FISH SPECIES ===
      fish_stats_name: 'Lightning Fish',
      fish_stats_label: 'Overview',
      fish_about_name: 'Lantern Fish',
      fish_about_label: 'About',
      fish_skills_name: 'Angel Fish',
      fish_skills_label: 'Skills',
      fish_projects_name: 'Abyssal Shark',
      fish_projects_label: 'Projects',
      fish_services_name: 'Brilliant Octopus',
      fish_services_label: 'Services',
      fish_contact_name: 'Celestial Whale',
      fish_contact_label: 'Contact',
      fish_cv_name: 'Starfish',
      fish_cv_label: 'Download CV',
      mode_toggle_fishing: 'Switch to fishing mode',
      mode_toggle_classic: 'Switch to classic mode',
      mode_name_fishing: 'Switch to fishing mode',
      mode_name_classic: 'Switch to classic mode',

      // === CRYPTOLAB ===
      crypto_title: 'CryptoLab',
      crypto_subtitle: 'Learn classic cryptography step by step',
      crypto_algo: 'Algorithm',
      crypto_key: 'Key',
      crypto_key_hint: 'Numeric shift (e.g. 3)',
      crypto_source: 'Input text',
      crypto_btn_encrypt: 'Encrypt',
      crypto_btn_decrypt: 'Decrypt',
      crypto_btn_clear: 'Clear',
      crypto_result: 'Result',
      crypto_ready: 'Ready. Waiting for an operation...',
      crypto_init: 'Initializing calculations...',
      crypto_done: 'Operation successfully completed.',
      crypto_err_empty: 'Error: Source text is empty.',
      crypto_hint_caesar: 'Numeric shift (e.g. 3). Leave empty for Brute Force.',
      crypto_hint_vigenere: 'Alphabetic keyword (e.g. SECRET)',
      crypto_hint_hill: '2x2 or 3x3 matrix separated by ; and ,',

      // === GAME OF LIFE ===
      gol_title: 'Game of Life',
      gol_subtitle: 'Experiment with cellular automata',
      gol_btn_play: 'Play',
      gol_btn_pause: 'Pause',
      gol_btn_next: 'Next',
      gol_btn_prev: 'Prev',
      gol_btn_clear: 'Clear',
      gol_btn_random: 'Random',
      gol_rules_title: 'Rules of the Game (Conway)',
      gol_rules_desc: "The Game of Life is a cellular automaton. Every cell is either alive or dead.<br><strong>1. Underpopulation:</strong> A live cell with fewer than 2 neighbors dies.<br><strong>2. Overpopulation:</strong> A live cell with more than 3 neighbors dies.<br><strong>3. Survival:</strong> A live cell with 2 or 3 neighbors lives on.<br><strong>4. Reproduction:</strong> A dead cell with exactly 3 neighbors becomes alive.<br><br><em>Click on the grid to toggle cells.</em>",
    }
  };

  let currentLang = localStorage.getItem('portfolioLang') || 'fr';

  function t(key, fallback) {
    return translations[currentLang]?.[key] || translations['fr']?.[key] || fallback || key;
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('portfolioLang', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) {
        // Check if value contains HTML
        if (val.includes('<strong>') || val.includes('<')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Update elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val) el.placeholder = val;
    });

    // Update elements with data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key);
      if (val) el.title = val;
    });

    // Update elements with data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const val = t(key);
      if (val) el.setAttribute('aria-label', val);
    });

    // Update the language toggle button
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      const switchLabel = t('lang_switch_label');
      langBtn.querySelector('.lang-label').textContent = switchLabel;
    }

    // Refresh fishing game labels if game exists
    if (window._fishingGame && window._fishingGame.refreshLanguage) {
      window._fishingGame.refreshLanguage();
    }

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function getCurrentLang() {
    return currentLang;
  }

  function toggle() {
    setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  }

  // Expose globally
  window._i18n = { t, setLanguage, getCurrentLang, toggle, translations };

  // Auto-apply on load
  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
  });

})();
