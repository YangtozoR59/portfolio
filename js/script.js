/* ==========================================
   Dashboard Portfolio — JavaScript
   Caleb Yang — 2026
   ========================================== */

(function () {
  'use strict';

  // ===== QUOTES DATA =====
  const quotes = [
    {
      text: "Quelle que soit la chose que vous fassiez, travaillez de toute votre âme, comme pour le Seigneur.",
      author: "— Colossiens 3:23"
    },
    {
      text: "La seule façon de faire du bon travail est d'aimer ce que vous faites.",
      author: "— Steve Jobs"
    },
    {
      text: "Commit your work to the Lord, and your plans will be established.",
      author: "— Proverbes 16:3"
    },
    {
      text: "La simplicité est la sophistication suprême.",
      author: "— Léonard de Vinci"
    },
    {
      text: "Le talent, c'est avoir envie de faire quelque chose.",
      author: "— Jacques Brel"
    },
    {
      text: "I can do all things through Christ who strengthens me.",
      author: "— Philippiens 4:13"
    },
    {
      text: "La persévérance n'est pas une longue course ; c'est beaucoup de petites courses l'une après l'autre.",
      author: "— Walter Elliot"
    },
    {
      text: "Le code est comme l'humour. Quand on doit l'expliquer, c'est mauvais.",
      author: "— Cory House"
    }
  ];

  // ===== DOM ELEMENTS =====
  const sidebar = document.getElementById('sidebar');
  const sidebarClose = document.getElementById('sidebarClose');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const liveClock = document.getElementById('liveClock');
  const liveDate = document.getElementById('liveDate');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const quoteDots = document.getElementById('quoteDots');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  const navItems = document.querySelectorAll('.nav-item');

  // ===== LIVE CLOCK =====
  function getLocale() {
    return (window._i18n && window._i18n.getCurrentLang && window._i18n.getCurrentLang() === 'en') ? 'en-US' : 'fr-FR';
  }

  function updateClock() {
    const now = new Date();
    const locale = getLocale();
    const timeStr = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    if (liveClock) liveClock.textContent = timeStr;
    if (liveDate) liveDate.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Refresh clock on language change
  window.addEventListener('languageChanged', updateClock);

  // ===== QUOTE ROTATOR =====
  let currentQuote = 0;

  function initQuoteDots() {
    if (!quoteDots) return;
    quoteDots.innerHTML = '';
    quotes.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => showQuote(i));
      quoteDots.appendChild(dot);
    });
  }

  function showQuote(index) {
    currentQuote = index;
    if (quoteText) {
      quoteText.style.opacity = '0';
      setTimeout(() => {
        quoteText.textContent = quotes[index].text;
        quoteAuthor.textContent = quotes[index].author;
        quoteText.style.opacity = '1';
      }, 300);
    }
    // Update dots
    const dots = quoteDots?.querySelectorAll('.dot');
    dots?.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function nextQuote() {
    showQuote((currentQuote + 1) % quotes.length);
  }

  initQuoteDots();
  showQuote(0);
  setInterval(nextQuote, 8000);

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.dataset.animated = 'true';
        }
      }
      requestAnimationFrame(update);
    });
  }

  // ===== SKILL BAR ANIMATION =====
  function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
      if (fill.classList.contains('animated')) return;
      const width = fill.dataset.width;
      fill.style.width = width + '%';
      fill.classList.add('animated');
    });
  }

  // ===== INTERSECTION OBSERVER — Reveal Cards =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger counters if stats panel
        if (entry.target.classList.contains('panel-stats')) {
          animateCounters();
        }

        // Trigger skill bars if skills panel
        if (entry.target.classList.contains('panel-skills')) {
          animateSkillBars();
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-card').forEach(card => {
    revealObserver.observe(card);
  });

  // ===== SIDEBAR NAVIGATION — Active Section =====
  const sections = document.querySelectorAll('[id]');

  function updateActiveNav() {
    let currentSection = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.id;
      }
    });

    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.section === currentSection);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== SIDEBAR MOBILE TOGGLE =====
  function openSidebar() {
    sidebar?.classList.add('open');
    sidebarOverlay?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    sidebarOverlay?.classList.remove('visible');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openSidebar);
  sidebarClose?.addEventListener('click', closeSidebar);
  sidebarOverlay?.addEventListener('click', closeSidebar);

  // Close sidebar on nav click (mobile)
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  // ===== i18n helper =====
  function t(key, fallback) {
    return (window._i18n && window._i18n.t) ? window._i18n.t(key) : (fallback || key);
  }

  // ===== CONTACT FORM =====
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-send');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<i class="bi bi-hourglass-split"></i> ${t('contact_sending', 'Envoi...')}`;
      btn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formMessage.textContent = t('contact_success', '✅ Message envoyé avec succès ! Je vous répondrai rapidement.');
          formMessage.className = 'form-message success';
          contactForm.reset();
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (err) {
        formMessage.textContent = t('contact_error', "❌ Erreur lors de l'envoi. Veuillez réessayer.");
        formMessage.className = 'form-message error';
      }

      btn.innerHTML = originalText;
      btn.disabled = false;

      // Auto-hide message
      setTimeout(() => {
        formMessage.className = 'form-message';
      }, 6000);
    });
  }

  // ===== SMOOTH SCROLL for nav items =====
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = window.innerWidth <= 1024 ? 80 : 20;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ===== HANDLE RESIZE — Reset sidebar state =====
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeSidebar();
    }
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeMetaTag = document.querySelector('meta[name="theme-color"]');

  function initTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      themeToggleIcon?.classList.replace('bi-sun-fill', 'bi-moon-fill');
      if (themeMetaTag) themeMetaTag.setAttribute('content', '#f4f7f6');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleIcon?.classList.replace('bi-moon-fill', 'bi-sun-fill');
      if (themeMetaTag) themeMetaTag.setAttribute('content', '#0A0A1F');
    }
  }

  function toggleTheme() {
    if (document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('portfolioTheme', 'light');
      themeToggleIcon?.classList.replace('bi-sun-fill', 'bi-moon-fill');
      if (themeMetaTag) themeMetaTag.setAttribute('content', '#f4f7f6');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('portfolioTheme', 'dark');
      themeToggleIcon?.classList.replace('bi-moon-fill', 'bi-sun-fill');
      if (themeMetaTag) themeMetaTag.setAttribute('content', '#0A0A1F');
    }
  }

  themeToggle?.addEventListener('click', toggleTheme);
  initTheme();

  // ===== PROJECT CATEGORY FILTERING =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          const categories = (card.dataset.category || '').split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              if (!card.classList.contains('active-filter')) {
                card.style.display = 'none';
              }
            }, 250);
          }
        });
      });
    });
  }

})();
