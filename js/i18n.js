/* ==========================================================================
   🌐 CYD // NETRUNNER OS v2077 — INTERNATIONALIZATION (FR / EN)
   Caleb Yang Damakoa (@ItzCyd) — Bilingual Matrix Dictionary
   ========================================================================== */

(function () {
  'use strict';

  const translations = {
    fr: {
      // === HUD / NAVIGATION ===
      nav_hud: 'HUD',
      nav_dossier: 'DOSSIER',
      nav_arsenal: 'ARSENAL',
      nav_missions: 'MISSIONS',
      nav_chronology: 'CHRONOLOGIE',
      nav_certs: 'CERTIFS',
      nav_deck: 'CYBERDECK',
      nav_uplink: 'UPLINK',
      hud_sys_online: 'SYS.ONLINE // NGAOUNDÉRÉ_NODE',
      hud_capri_btn: 'CAPRI AI',
      lang_switch: 'EN',

      // === HERO / MAINFRAME ===
      hero_badge: '🟢 NETRUNNER ACTIF // DISPONIBLE FREELANCE & CDI',
      hero_subtitle: 'ARCHITECTE LOGICIEL • FULL-STACK WEB, MOBILE, BOTS & IA',
      hero_bio: "Ingénieur logiciel orienté produit et Co-Fondateur d'<strong>Evodevs 237</strong>. J'architecte et déploie des systèmes distribués, plateformes <strong>Laravel</strong> & <strong>Node.js</strong>, applications mobiles <strong>Flutter</strong>, bots <strong>Telegram</strong> et expériences <strong>3D / IA</strong> haute performance.",
      hero_cta_missions: 'EXPLORER LES MISSIONS',
      hero_cta_deck: 'OUVRIR LE CYBERDECK',
      hero_cta_cv_fr: 'CV_FR.PDF',
      hero_cta_cv_en: 'CV_EN.PDF',
      hero_cta_uplink: 'UPLINK DIRECT',
      hero_avatar_caption: 'CALEB YANG DAMAKOA // ALIAS: @ItzCyd',
      hero_avatar_toggle: 'CHANGER L\'AVATAR HOLO',

      // === TELEMETRY / STATS ===
      stat_1_label: 'SYSTÈMES & PROJETS LIVRÉS',
      stat_2_label: 'TECHNOLOGIES MAÎTRISÉES',
      stat_3_label: 'CERTIFICATIONS IA & ML',
      stat_4_label: 'CLIENTS & PARTENAIRES',

      // === DOSSIER / BIO ===
      sec_dossier_tag: '01 // BIOMÉTRIE & PROFIL',
      sec_dossier_title: 'DOSSIER NETRUNNER',
      sec_dossier_sub: 'Architecture logicielle, vision produit et exécution de bout en bout',
      bio_card_title: 'SYNTHÈSE OPÉRATIONNELLE',
      bio_p1: "Architecte logiciel focalisé sur la conception et la livraison de produits web et mobiles scalables et maintenables. J'accompagne les équipes de la définition produit au déploiement (architecture MVC, modélisation UML/MERISE), en automatisant les pipelines (CI/CD, Docker, DevOps, Cloud).",
      bio_p2: "J'ai piloté le développement de solutions de gestion interne et e-commerce pour la <strong>Mutuelle de l'IUT de Ngaoundéré</strong>, conçu le portail institutionnel de l'<strong>EGEM Meiganga</strong>, dirigé des plateformes chez <strong>MATHS237</strong> et co-fondé le collectif <strong>Evodevs Team</strong>.",
      bio_p3: "Spécialiste du <strong>Vibe Coding</strong>, du Prompt Engineering et de l'UX augmentée par l'IA, je combine rigueur algorithmique, visualisation de données et design immersif.",
      status_card_title: 'TÉLÉMÉTRIE TEMPS RÉEL',
      status_role_lbl: 'CLASSE',
      status_role_val: 'Software Architect & Lead Full-Stack Engineer',
      status_edu_lbl: 'FORMATION ACTUELLE',
      status_edu_val: 'Master 1 Systèmes & Logiciels en Environnements Distribués (Université de Ngaoundéré)',
      status_org_lbl: 'COLLECTIF / AGENCE',
      status_org_val: 'Co-Founder & Lead Dev @ Evodevs 237',
      status_loc_lbl: 'BASE D\'OPÉRATION',
      status_loc_val: 'Ngaoundéré / Yaoundé, Cameroun (Remote Worldwide)',
      status_lang_lbl: 'PROTOCOLES VOCAUX',
      status_lang_val: 'Français (Natif/Avancé) • English (Professionnel)',
      quote_header: 'FLUX D\'INSPIRATION NEURALE',

      // === ARSENAL / TECH ECOSYSTEM ===
      sec_arsenal_tag: '02 // IMPLANTS CYBERWARE & STACK',
      sec_arsenal_title: 'ARSENAL TECHNOLOGIQUE',
      sec_arsenal_sub: 'Modules techniques calibrés sur des déploiements réels en production',
      skill_filter_all: 'TOUS LES MODULES',
      skill_filter_backend: 'BACKEND & DATA',
      skill_filter_frontend: 'FRONTEND, 3D & UI',
      skill_filter_mobile: 'MOBILE & BOTS',
      skill_filter_devops: 'DEVOPS, IA & ARCHI',
      lvl_expert: 'NIVEAU: EXPERT',
      lvl_advanced: 'NIVEAU: MAÎTRISÉ',
      lvl_proficient: 'NIVEAU: OPÉRATIONNEL',
      deployed_on: 'Déployé sur :',

      // === MISSIONS / PROJECTS ===
      sec_missions_tag: '03 // ARCHIVES D\'OPÉRATIONS',
      sec_missions_title: 'MISSIONS & PROJETS DÉPLOYÉS',
      sec_missions_sub: '13 systèmes architecturés : plateformes d\'État, SaaS, simulations 3D, bots et outils cryptographiques',
      proj_filter_all: 'TOUS (13)',
      proj_filter_web: 'FULL-STACK & PLATEFORMES',
      proj_filter_interactive: '3D, IA & OUTILS',
      proj_filter_bot: 'BOTS & E-COMMERCE',
      btn_live_demo: 'LANCER LE SYSTÈME',
      btn_source_code: 'CODE SOURCE',
      btn_inspect: 'INSPECTER',

      // Project details
      p11_title: 'Pulse — P.A.E.S. (3D Automata)',
      p11_role: 'Lead Developer // Evodevs Team',
      p11_desc: 'Simulation 3D interactive d\'écosystème proie-prédateur basée sur un automate cellulaire, rendue en temps réel via Three.js avec post-processing UnrealBloom.',
      p12_title: 'Evodevs Team — Portail Agence',
      p12_role: 'Co-Founder & Lead Developer',
      p12_desc: 'Vitrine digitale du collectif Evodevs Team : catalogue de services (sites web, mini-apps Telegram, automatisation IA), tarification dynamique et workflow client.',
      p13_title: 'Evodevs Store — Bot Telegram',
      p13_role: 'Co-Founder & Lead Developer',
      p13_desc: 'Bot Telegram automatisé de prise de commande pour l\'agence Evodevs : exploration du catalogue, devis instantané, suivi client et notifications temps réel.',
      p1_title: 'Accommodation // LiveHouse237',
      p1_role: 'Project Manager & Lead Engineer',
      p1_desc: 'Plateforme Laravel conteneurisée sous Docker pour la recherche, la géolocalisation et la réservation d\'hébergements (hôtels, appartements, cités) à Ngaoundéré.',
      p2_title: 'EGEM Meiganga — Portail Officiel',
      p2_role: 'Full-Stack Developer',
      p2_desc: 'Site institutionnel officiel de l\'École de Géologie et d\'Exploitation Minière (EGEM) : présentation des filières, actualités académiques et admission.',
      p3_title: 'Entreprise du Pays — Maths237',
      p3_role: 'Lead Engineer // Evodevs 237',
      p3_desc: 'Annuaire national et plateforme d\'opportunités permettant de répertorier les entreprises camerounaises, leurs secteurs d\'activité et leurs offres.',
      p4_title: 'ERP Mutuelle IUT — Gestion Interne',
      p4_role: 'Project Manager & Lead Engineer',
      p4_desc: 'Système d\'information centralisé pour la Mutuelle du personnel de l\'IUT de Ngaoundéré : gestion des adhérents, cotisations, prêts et états financiers.',
      p5_title: 'MUIT — Portail Vitrine & E-Commerce',
      p5_role: 'Project Manager & Lead Engineer',
      p5_desc: 'Portail public et boutique e-commerce de la Mutuelle de l\'IUT présentant ses formations, événements, prestations et produits.',
      p6_title: 'MATHS237 — Plateforme Éducative',
      p6_role: 'Chef de Projet & Développeur Web',
      p6_desc: 'Plateforme ed-tech dédiée à la vulgarisation des mathématiques et à l\'accompagnement académique avec ressources interactives.',
      p7_title: 'AEFCA — Générateur de Cartes Membres',
      p7_role: 'Project Manager & Lead Engineer',
      p7_desc: 'Application web automatisant l\'enrôlement des membres, la génération dynamique de cartes d\'adhésion avec QR Code et l\'export PDF.',
      p8_title: 'SYGALIN SAS — Module Statistique',
      p8_role: 'Analyste Programmeur',
      p8_desc: 'Module analytique et tableau de bord de reporting statistique pour le suivi en temps réel des tickets d\'incident sur les plateformes internes.',
      p9_title: 'Grace Oil Gold — Site Vitrine',
      p9_role: 'Project Manager & Lead Engineer',
      p9_desc: 'Portail commercial pour la marque d\'huile végétale extra vierge Grace Oil Gold : présentation de la gamme, valeurs nutritionnelles et distribution.',
      p10_title: 'CryptoLab — Terminal de Cryptanalyse',
      p10_role: 'Front-End & Algorithm Engineer',
      p10_desc: 'Laboratoire pédagogique interactif de cryptographie classique (César, Force Brute, Vigenère, Matrices de Hill 2x2/3x3) avec décomposition mathématique animée.',

      // === CHRONOLOGY / EXPERIENCE & EDUCATION ===
      sec_chrono_tag: '04 // LOGS TEMPORELS & CARRIÈRE',
      sec_chrono_title: 'CHRONOLOGIE OPÉRATIONNELLE',
      sec_chrono_sub: 'Expériences professionnelles en ingénierie logicielle et parcours académique universitaire',
      col_exp_title: 'EXPÉRIENCES PROFESSIONNELLES',
      col_edu_title: 'CURSUS ACADÉMIQUE',
      exp1_date: 'AOÛT 2025 — PRÉSENT',
      exp1_role: 'Développeur Full-Stack & Co-Fondateur',
      exp1_org: 'École de Géologie et d\'Exploitation Minière (EGEM) & Evodevs 237',
      exp1_desc: 'Conception et mise en production du portail institutionnel EGEM Meiganga et direction technique des projets web, bots Telegram et 3D au sein d\'Evodevs Team.',
      exp2_date: 'MAI 2025 — JUILLET 2025',
      exp2_role: 'Ingénieur Logiciel (Stage)',
      exp2_org: 'Mutuelle du Personnel de l\'IUT de Ngaoundéré',
      exp2_desc: 'Architecture et développement complet d\'une application web de centralisation des activités internes et d\'un portail vitrine e-commerce dynamique.',
      exp3_date: 'FÉVRIER 2025 — AOÛT 2025',
      exp3_role: 'Développeur Web & Chef de Projet',
      exp3_org: 'MATHS237 — Ngaoundéré',
      exp3_desc: 'Pilotage Agile et développement de la plateforme éducative Maths237 et de l\'annuaire national Entreprise du Pays.',
      exp4_date: 'MARS 2024 — MAI 2024',
      exp4_role: 'Analyste Programmeur (Stage)',
      exp4_org: 'SYGALIN SAS — Ngaoundéré',
      exp4_desc: 'Conception et intégration d\'un module de reporting et suivi statistique des tickets clients sur les plateformes de l\'entreprise (CodeIgniter, MySQL).',

      edu1_date: 'NOV. 2025 — JUIL. 2026',
      edu1_deg: 'Master 1 — Systèmes et Logiciels en Environnements Distribués',
      edu1_sch: 'Faculté des Sciences • Université de Ngaoundéré',
      edu1_desc: 'Architectures distribuées, cloud computing, génie logiciel avancé, sécurité et systèmes concurrents.',
      edu2_date: '2024 — 2025',
      edu2_deg: 'Licence de Technologie (LITECH) en Génie Informatique',
      edu2_sch: 'Institut Universitaire de Technologie (IUT) de Ngaoundéré',
      edu2_desc: 'Conception logicielle MVC, bases de données relationnelles et NoSQL, administration système et gestion de projet.',
      edu3_date: '2022 — 2024',
      edu3_deg: 'Diplôme Universitaire de Technologie (DUT) en Génie Informatique',
      edu3_sch: 'Institut Universitaire de Technologie (IUT) de Ngaoundéré',
      edu3_desc: 'Algorithmique, programmation orientée objet, développement web et mobile, réseaux informatiques.',
      edu4_date: '2020 — 2022',
      edu4_deg: 'Baccalauréat TI (Technologies de l\'Information)',
      edu4_sch: 'Lycée Classique et Moderne de Ngaoundéré',
      edu4_desc: 'Fondamentaux des systèmes d\'information, mathématiques et algorithmique.',

      // === CERTIFICATIONS ===
      sec_certs_tag: '05 // ACCRÉDITATIONS NEURALES',
      sec_certs_title: 'CERTIFICATIONS IA & ENGINEERING',
      sec_certs_sub: '7 certificats officiels validant la maîtrise de l\'IA générative, du Machine Learning et du Vibe Coding (Cliquez pour inspecter)',

      // === CYBERDECK LAB (CRYPTOLAB + GAME OF LIFE + DEV QUEST) ===
      sec_deck_tag: '06 // SIMULATEURS INTERACTIFS EMBARQUÉS',
      sec_deck_title: 'LE CYBERDECK // LABO INTERACTIF',
      sec_deck_sub: 'Testez directement mes moteurs algorithmiques dans le navigateur : Cryptographie matricielle, Automate de Conway et Dev Quest',
      tab_crypto: '01 // CRYPTOLAB TERMINAL',
      tab_gol: '02 // AUTOMATE DE CONWAY',
      tab_quest: '03 // DEV QUEST 2077',
      tab_services: '04 // SERVICES & ARCHITECTURE',

      // CryptoLab
      crypto_algo_lbl: 'ALGORITHME DE CHIFFREMENT',
      crypto_key_lbl: 'CLÉ SECRÈTE / MATRICE',
      crypto_key_hint: 'Décalage numérique (ex: 3). Laissez vide en Déchiffrement pour lancer une attaque Force Brute.',
      crypto_input_lbl: 'FLUX D\'ENTRÉE (PLAINTEXT / CIPHERTEXT)',
      crypto_btn_enc: 'CHIFFRER LE FLUX',
      crypto_btn_dec: 'DÉCHIFFRER / ATTAQUER',
      crypto_btn_sample: 'EXEMPLE CYBER',
      crypto_btn_clr: 'PURGER',
      crypto_out_lbl: 'SORTIE DÉCODÉE',
      crypto_term_ready: 'Prêt. En attente d\'une instruction cryptographique...',

      // Game of Life
      gol_desc: 'Automate cellulaire de John Horton Conway. Cliquez-glissez sur la matrice néon pour implanter des cellules vivantes ou générez une colonie cybernétique.',
      gol_play: 'DÉMARRER',
      gol_pause: 'PAUSE',
      gol_step: 'PAS +1',
      gol_random: 'COLONIE ALÉATOIRE',
      gol_glider: 'CANON / GLIDERS',
      gol_clear: 'PURGER LA GRILLE',
      gol_gen_lbl: 'GÉNÉRATION :',
      gol_pop_lbl: 'CELLULES ACTIVES :',

      // Dev Quest
      quest_desc: 'Mini-jeu hérité des premières versions du portfolio : dirigez le Netrunner (@ItzCyd) à travers le réseau pour pirater les 4 nœuds (DOSSIER, ARSENAL, MISSIONS, UPLINK) en évitant les pare-feux ICE !',
      quest_reset: 'RÉINITIALISER LE RÉSEAU',

      // Services
      srv1_title: 'Architecture Backend & APIs',
      srv1_desc: 'Conception de systèmes distribués, modélisation BDD (UML/MERISE), APIs RESTful sécurisées avec Laravel et Express.js, conteneurisation Docker et CI/CD.',
      srv2_title: 'Applications Web, 3D & IA',
      srv2_desc: 'Interfaces ultra-réactives, tableaux de bord analytiques, expériences WebGL/Three.js et intégration d\'agents IA ou de bots Telegram automatisés.',
      srv3_title: 'Ingénierie Mobile Cross-Platform',
      srv3_desc: 'Développement d\'applications mobiles natives iOS & Android fluides avec Flutter et Dart, connectées en temps réel à vos services cloud.',

      // === UPLINK / CONTACT ===
      sec_uplink_tag: '07 // TRANSMISSION CHIFFRÉE',
      sec_uplink_title: 'ÉTABLIR UN UPLINK DIRECT',
      sec_uplink_sub: 'Un projet d\'envergure, une mission freelance ou une opportunité CDI ? Ouvrez un canal de communication sécurisé.',
      form_name_lbl: 'IDENTIFIANT / NOM',
      form_name_ph: 'Ex: Corpo Recruiter / Client',
      form_email_lbl: 'ADRESSE DE RETOUR (EMAIL)',
      form_email_ph: 'votre.email@domaine.com',
      form_msg_lbl: 'CHARGE UTILE (MESSAGE)',
      form_msg_ph: 'Décrivez votre projet, vos besoins techniques ou votre proposition...',
      form_submit: 'TRANSMETTRE LE PAQUET',
      form_sending: 'TRANSMISSION EN COURS...',
      form_ok: '✅ Paquet transmis avec succès ! Caleb vous répondra sous peu.',
      form_err: '❌ Échec de transmission réseau. Utilisez un canal direct (Email, Telegram ou Discord).',

      // === CAPRI AI COMPANION ===
      capri_hint: 'Glissez-moi partout ! Double-clic = Action • Clic = Info aléatoire',
      capri_btn_fact: 'INFO ALÉATOIRE',
      capri_btn_dance: 'DANSER',
      capri_btn_roam: 'MODE BALADE: ON',
      capri_btn_roam_off: 'MODE BALADE: PAUSE',
      capri_btn_sleep: 'DORMIR',
      capri_repo_link: 'GitHub Capri Desktop ↗'
    },

    en: {
      // === HUD / NAVIGATION ===
      nav_hud: 'HUD',
      nav_dossier: 'DOSSIER',
      nav_arsenal: 'ARSENAL',
      nav_missions: 'MISSIONS',
      nav_chronology: 'TIMELINE',
      nav_certs: 'CERTS',
      nav_deck: 'CYBERDECK',
      nav_uplink: 'UPLINK',
      hud_sys_online: 'SYS.ONLINE // NGAOUNDÉRÉ_NODE',
      hud_capri_btn: 'CAPRI AI',
      lang_switch: 'FR',

      // === HERO / MAINFRAME ===
      hero_badge: '🟢 ACTIVE NETRUNNER // OPEN TO FREELANCE & FULL-TIME',
      hero_subtitle: 'SOFTWARE ARCHITECT • FULL-STACK WEB, MOBILE, BOTS & AI',
      hero_bio: "Product-oriented Software Engineer and Co-Founder of <strong>Evodevs 237</strong>. I architect and deploy distributed systems, <strong>Laravel</strong> & <strong>Node.js</strong> platforms, <strong>Flutter</strong> mobile apps, <strong>Telegram</strong> bots, and high-performance <strong>3D / AI</strong> web experiences.",
      hero_cta_missions: 'EXPLORE MISSIONS',
      hero_cta_deck: 'OPEN CYBERDECK',
      hero_cta_cv_fr: 'CV_FR.PDF',
      hero_cta_cv_en: 'CV_EN.PDF',
      hero_cta_uplink: 'DIRECT UPLINK',
      hero_avatar_caption: 'CALEB YANG DAMAKOA // ALIAS: @ItzCyd',
      hero_avatar_toggle: 'SWITCH HOLO AVATAR',

      // === TELEMETRY / STATS ===
      stat_1_label: 'SYSTEMS & PROJECTS SHIPPED',
      stat_2_label: 'MASTERED TECHNOLOGIES',
      stat_3_label: 'AI & ML CERTIFICATIONS',
      stat_4_label: 'SATISFIED CLIENTS & PARTNERS',

      // === DOSSIER / BIO ===
      sec_dossier_tag: '01 // BIOMETRICS & PROFILE',
      sec_dossier_title: 'NETRUNNER DOSSIER',
      sec_dossier_sub: 'Software architecture, product vision, and end-to-end delivery',
      bio_card_title: 'OPERATIONAL SUMMARY',
      bio_p1: "Software architect focused on designing and delivering scalable and maintainable web and mobile products. I support teams from product definition to deployment (MVC architecture, UML/MERISE modeling), automating pipelines (CI/CD, Docker, DevOps, Cloud).",
      bio_p2: "I led the development of internal ERP and e-commerce solutions for the <strong>Staff Mutual Insurance of the IUT of Ngaoundéré</strong>, built the official portal for <strong>EGEM Meiganga</strong>, spearheaded platforms at <strong>MATHS237</strong>, and co-founded the <strong>Evodevs Team</strong> collective.",
      bio_p3: "Specializing in <strong>Vibe Coding</strong>, Prompt Engineering, and AI-assisted UX, I blend algorithmic rigor, statistical visualization, and immersive interfaces.",
      status_card_title: 'REAL-TIME TELEMETRY',
      status_role_lbl: 'CLASS',
      status_role_val: 'Software Architect & Lead Full-Stack Engineer',
      status_edu_lbl: 'CURRENT EDUCATION',
      status_edu_val: 'Master\'s 1 in Distributed Systems & Software (University of Ngaoundéré)',
      status_org_lbl: 'COLLECTIVE / AGENCY',
      status_org_val: 'Co-Founder & Lead Dev @ Evodevs 237',
      status_loc_lbl: 'BASE OF OPERATIONS',
      status_loc_val: 'Ngaoundéré / Yaoundé, Cameroon (Remote Worldwide)',
      status_lang_lbl: 'VOICE PROTOCOLS',
      status_lang_val: 'French (Native/Advanced) • English (Professional)',
      quote_header: 'NEURAL INSPIRATION FEED',

      // === ARSENAL / TECH ECOSYSTEM ===
      sec_arsenal_tag: '02 // CYBERWARE IMPLANTS & STACK',
      sec_arsenal_title: 'TECH ARSENAL',
      sec_arsenal_sub: 'Technical modules battle-tested across real-world production deployments',
      skill_filter_all: 'ALL MODULES',
      skill_filter_backend: 'BACKEND & DATA',
      skill_filter_frontend: 'FRONTEND, 3D & UI',
      skill_filter_mobile: 'MOBILE & BOTS',
      skill_filter_devops: 'DEVOPS, AI & ARCH',
      lvl_expert: 'TIER: EXPERT',
      lvl_advanced: 'TIER: ADVANCED',
      lvl_proficient: 'TIER: PROFICIENT',
      deployed_on: 'Deployed on:',

      // === MISSIONS / PROJECTS ===
      sec_missions_tag: '03 // OPERATION ARCHIVES',
      sec_missions_title: 'DEPLOYED MISSIONS & PROJECTS',
      sec_missions_sub: '13 architected systems: institutional portals, SaaS, 3D simulations, Telegram bots & cryptography tools',
      proj_filter_all: 'ALL (13)',
      proj_filter_web: 'FULL-STACK & PLATFORMS',
      proj_filter_interactive: '3D, AI & TOOLS',
      proj_filter_bot: 'BOTS & E-COMMERCE',
      btn_live_demo: 'LAUNCH SYSTEM',
      btn_source_code: 'SOURCE CODE',
      btn_inspect: 'INSPECT',

      // Project details
      p11_title: 'Pulse — P.A.E.S. (3D Automata)',
      p11_role: 'Lead Developer // Evodevs Team',
      p11_desc: 'Interactive 3D prey-predator ecosystem simulation powered by cellular automata, rendered in real-time via Three.js with UnrealBloom post-processing.',
      p12_title: 'Evodevs Team — Agency Portal',
      p12_role: 'Co-Founder & Lead Developer',
      p12_desc: 'Digital showcase for the Evodevs Team collective: service catalog (websites, Telegram mini-apps, AI automation), dynamic pricing, and client workflow.',
      p13_title: 'Evodevs Store — Telegram Bot',
      p13_role: 'Co-Founder & Lead Developer',
      p13_desc: 'Automated Telegram ordering bot for Evodevs: interactive service catalog, instant quote requests, order tracking, and real-time notifications.',
      p1_title: 'Accommodation // LiveHouse237',
      p1_role: 'Project Manager & Lead Engineer',
      p1_desc: 'Dockerized Laravel platform for discovering, geolocating, and booking accommodations (hotels, furnished apartments, student housing) in Ngaoundéré.',
      p2_title: 'EGEM Meiganga — Official Portal',
      p2_role: 'Full-Stack Developer',
      p2_desc: 'Official institutional website for the School of Geology and Mining Engineering (EGEM): academic programs, news, and student admissions.',
      p3_title: 'Entreprise du Pays — Maths237',
      p3_role: 'Lead Engineer // Evodevs 237',
      p3_desc: 'National business directory and opportunity platform indexing Cameroonian companies, industries, and career openings.',
      p4_title: 'Mutuelle IUT ERP — Internal Management',
      p4_role: 'Project Manager & Lead Engineer',
      p4_desc: 'Centralized management web application for the Staff Mutual Insurance of the IUT of Ngaoundéré: member records, contributions, loans, and financial reports.',
      p5_title: 'MUIT — Showcase & E-Commerce Portal',
      p5_role: 'Project Manager & Lead Engineer',
      p5_desc: 'Dynamic showcase website and e-commerce store for the IUT Mutual Fund featuring training programs, events, and products.',
      p6_title: 'MATHS237 — Educational Platform',
      p6_role: 'Project Manager & Web Developer',
      p6_desc: 'Online ed-tech platform dedicated to popularizing mathematics and providing interactive learning resources across Cameroon.',
      p7_title: 'AEFCA — Member Card Generator',
      p7_role: 'Project Manager & Lead Engineer',
      p7_desc: 'Web application automating member registration, dynamic badge generation with QR verification, and batch PDF export.',
      p8_title: 'SYGALIN SAS — Statistics Module',
      p8_role: 'Programmer Analyst',
      p8_desc: 'Statistical reporting and analytics dashboard tracking support tickets and SLA metrics across internal company platforms.',
      p9_title: 'Grace Oil Gold — Brand Showcase',
      p9_role: 'Project Manager & Lead Engineer',
      p9_desc: 'Commercial showcase website for Grace Oil Gold extra virgin vegetable oil: product range, nutritional specs, and distribution.',
      p10_title: 'CryptoLab — Cryptanalysis Terminal',
      p10_role: 'Front-End & Algorithm Engineer',
      p10_desc: 'Interactive classical cryptography laboratory (Caesar, Brute Force, Vigenère, 2x2/3x3 Hill Matrices) with step-by-step animated mathematical breakdowns.',

      // === CHRONOLOGY / EXPERIENCE & EDUCATION ===
      sec_chrono_tag: '04 // TEMPORAL LOGS & CAREER',
      sec_chrono_title: 'OPERATIONAL TIMELINE',
      sec_chrono_sub: 'Professional software engineering track record and university academic background',
      col_exp_title: 'PROFESSIONAL EXPERIENCE',
      col_edu_title: 'ACADEMIC EDUCATION',
      exp1_date: 'AUG 2025 — PRESENT',
      exp1_role: 'Full-Stack Developer & Co-Founder',
      exp1_org: 'School of Geology & Mining Engineering (EGEM) & Evodevs 237',
      exp1_desc: 'Designed and deployed the official EGEM Meiganga institutional portal and lead technical delivery of web, Telegram bot, and 3D projects at Evodevs Team.',
      exp2_date: 'MAY 2025 — JULY 2025',
      exp2_role: 'Software Engineer Intern',
      exp2_org: 'Staff Mutual Insurance of the IUT of Ngaoundéré',
      exp2_desc: 'Architected and delivered an internal management ERP web app alongside a dynamic showcase & e-commerce portal.',
      exp3_date: 'FEB 2025 — AUG 2025',
      exp3_role: 'Web Developer & Project Manager',
      exp3_org: 'MATHS237 — Ngaoundéré',
      exp3_desc: 'Led Agile development for the Maths237 educational platform and the Entreprise du Pays national directory.',
      exp4_date: 'MAR 2024 — MAY 2024',
      exp4_role: 'Programmer Analyst Intern',
      exp4_org: 'SYGALIN SAS — Ngaoundéré',
      exp4_desc: 'Built and integrated a statistical ticket tracking and reporting module across internal enterprise platforms (CodeIgniter, MySQL).',

      edu1_date: 'NOV 2025 — JULY 2026',
      edu1_deg: 'Master\'s 1 — Systems & Software in Distributed Environments',
      edu1_sch: 'Faculty of Science • University of Ngaoundéré',
      edu1_desc: 'Distributed architectures, cloud computing, advanced software engineering, security, and concurrent systems.',
      edu2_date: '2024 — 2025',
      edu2_deg: 'Bachelor of Technology (LITECH) in Computer Engineering',
      edu2_sch: 'University Institute of Technology (IUT) of Ngaoundéré',
      edu2_desc: 'MVC software design, relational & NoSQL databases, systems administration, and Agile project management.',
      edu3_date: '2022 — 2024',
      edu3_deg: 'University Diploma of Technology (DUT) in Computer Engineering',
      edu3_sch: 'University Institute of Technology (IUT) of Ngaoundéré',
      edu3_desc: 'Algorithms, object-oriented programming, full-stack web & mobile development, computer networks.',
      edu4_date: '2020 — 2022',
      edu4_deg: 'Baccalauréat in Information Technology (TI)',
      edu4_sch: 'Classical and Modern High School of Ngaoundéré',
      edu4_desc: 'Information systems fundamentals, mathematics, and algorithmic logic.',

      // === CERTIFICATIONS ===
      sec_certs_tag: '05 // NEURAL CREDENTIALS',
      sec_certs_title: 'AI & ENGINEERING CERTIFICATIONS',
      sec_certs_sub: '7 official certificates validating mastery of Generative AI, Machine Learning, and Vibe Coding (Click to inspect)',

      // === CYBERDECK LAB ===
      sec_deck_tag: '06 // EMBEDDED INTERACTIVE SIMULATORS',
      sec_deck_title: 'THE CYBERDECK // INTERACTIVE LAB',
      sec_deck_sub: 'Run my algorithmic engines live in your browser: Matrix Cryptography, Conway\'s Cellular Automaton, and Dev Quest',
      tab_crypto: '01 // CRYPTOLAB TERMINAL',
      tab_gol: '02 // CONWAY AUTOMATON',
      tab_quest: '03 // DEV QUEST 2077',
      tab_services: '04 // SERVICES & ARCHITECTURE',

      // CryptoLab
      crypto_algo_lbl: 'CIPHER ALGORITHM',
      crypto_key_lbl: 'SECRET KEY / MATRIX',
      crypto_key_hint: 'Numeric shift (e.g. 3). Leave empty on Decrypt to launch a Brute-Force attack.',
      crypto_input_lbl: 'INPUT STREAM (PLAINTEXT / CIPHERTEXT)',
      crypto_btn_enc: 'ENCRYPT STREAM',
      crypto_btn_dec: 'DECRYPT / BRUTE-FORCE',
      crypto_btn_sample: 'CYBER SAMPLE',
      crypto_btn_clr: 'PURGE',
      crypto_out_lbl: 'DECODED OUTPUT',
      crypto_term_ready: 'Ready. Awaiting cryptographic instruction...',

      // Game of Life
      gol_desc: 'John Horton Conway\'s Cellular Automaton. Click and drag across the neon matrix to seed living cells or spawn a cybernetic colony.',
      gol_play: 'START',
      gol_pause: 'PAUSE',
      gol_step: 'STEP +1',
      gol_random: 'RANDOM COLONY',
      gol_glider: 'GLIDER PULSAR',
      gol_clear: 'PURGE GRID',
      gol_gen_lbl: 'GENERATION:',
      gol_pop_lbl: 'ACTIVE CELLS:',

      // Dev Quest
      quest_desc: 'Legacy mini-game from the early portfolio commits: pilot the Netrunner (@ItzCyd) across the grid to hack all 4 nodes (DOSSIER, ARSENAL, MISSIONS, UPLINK) while dodging ICE firewalls!',
      quest_reset: 'RESET GRID NETWORK',

      // Services
      srv1_title: 'Backend Architecture & APIs',
      srv1_desc: 'Distributed systems design, database modeling (UML/MERISE), secure RESTful APIs with Laravel and Express.js, Docker containerization, and CI/CD.',
      srv2_title: 'Web Apps, 3D & AI Integration',
      srv2_desc: 'Ultra-responsive interfaces, analytical dashboards, WebGL/Three.js simulations, and AI agents or automated Telegram bots.',
      srv3_title: 'Cross-Platform Mobile Engineering',
      srv3_desc: 'Smooth native iOS & Android mobile applications crafted with Flutter and Dart, synced in real time with your cloud infrastructure.',

      // === UPLINK / CONTACT ===
      sec_uplink_tag: '07 // ENCRYPTED TRANSMISSION',
      sec_uplink_title: 'ESTABLISH DIRECT UPLINK',
      sec_uplink_sub: 'Have a flagship project, freelance mission, or full-time role? Open an encrypted communication channel.',
      form_name_lbl: 'HANDLE / NAME',
      form_name_ph: 'e.g. Corpo Recruiter / Client',
      form_email_lbl: 'RETURN ADDRESS (EMAIL)',
      form_email_ph: 'your.email@domain.com',
      form_msg_lbl: 'PAYLOAD (MESSAGE)',
      form_msg_ph: 'Describe your project, technical requirements, or opportunity...',
      form_submit: 'TRANSMIT PACKET',
      form_sending: 'TRANSMITTING...',
      form_ok: '✅ Packet transmitted! Caleb will respond shortly.',
      form_err: '❌ Network transmission failed. Please use a direct channel (Email, Telegram, or Discord).',

      // === CAPRI AI COMPANION ===
      capri_hint: 'Drag & drop me anywhere! Double-click = Action • Click = Random Intel',
      capri_btn_fact: 'RANDOM INTEL',
      capri_btn_dance: 'DANCE',
      capri_btn_roam: 'ROAMING: ON',
      capri_btn_roam_off: 'ROAMING: PAUSED',
      capri_btn_sleep: 'SLEEP',
      capri_repo_link: 'Capri Desktop GitHub ↗'
    }
  };

  let currentLang = localStorage.getItem('cyd_cyber_lang') || 'fr';

  function t(key, fallback) {
    return translations[currentLang]?.[key] || translations.fr?.[key] || fallback || key;
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('cyd_cyber_lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) {
        if (val.includes('<')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val) el.placeholder = val;
    });

    document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
      const span = btn.querySelector('.lang-code-text');
      if (span) span.textContent = currentLang.toUpperCase();
    });

    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function toggle() {
    setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  }

  window._i18n = {
    t,
    setLanguage,
    getCurrentLang: () => currentLang,
    toggle,
    translations
  };

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
    });
  });
})();
