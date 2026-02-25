document.addEventListener('DOMContentLoaded', function () {
    // Scroll animation
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Navbar animation on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Update active navbar item
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Modal Image Handling
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');

    if (imageModal) {
        imageModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            const imgSrc = button.getAttribute('data-img-src');
            const imgAlt = button.getAttribute('data-img-alt');

            modalImage.src = imgSrc;
            modalImage.alt = imgAlt;
            modalTitle.textContent = imgAlt;
        });
    }
});

// Contact form handling (outside DOMContentLoaded or inside? Inside is better but ID lookup needs DOM)
// The original code had it mixed. Let's put it completely inside DOMContentLoaded or leave it if defer used.
// I'll put it in a separate event listener for safety.

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const form = this;
            const formData = new FormData(form);
            const formMessage = document.getElementById('formMessage');
            const submitButton = form.querySelector('button[type="submit"]');

            // Disable button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formMessage.innerHTML = '<div class="alert alert-info"><i class="bi bi-hourglass-split me-2"></i>Sending your message...</div>';

            // AJAX to Formspree
            fetch('https://formspree.io/f/xpwbvrod', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        formMessage.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle me-2"></i>Message sent successfully! I will reply soon.</div>';
                        form.reset();
                    } else {
                        return response.json().then(data => {
                            throw new Error(data.error || 'Error sending message');
                        });
                    }
                })
                .catch(error => {
                    formMessage.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle me-2"></i>Error: ' + error.message + '. Please try again or contact me directly.</div>';
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
        });
    }
});

/* =========================================
   Advanced Animations & Interactions
   ================================********* */

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only enable on non-touch devices
    if (matchMedia('(pointer:fine)').matches) {
        if (cursorDot && cursorOutline) {
            cursorDot.style.display = 'block';
            cursorOutline.style.display = 'block';

            window.addEventListener('mousemove', function (e) {
                const posX = e.clientX;
                const posY = e.clientY;

                // Dot follows immediately
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                // Outline follows with slight delay (animation in CSS) applies to transform? 
                // Actually, best to animate with JS for smoother lag or CSS transition left/top.
                // Let's use simple keyframes or just animate left/top with transition in CSS.
                // But CSS transition is set on width/height/bgcolor. 
                // We need to move it.
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            });

            // Hover effect for links and buttons
            const hoverables = document.querySelectorAll('a, button, .project-card, .service-card, .tech-icon');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });
        }
    }

    // --- 2. Hero Parallax ---
    const heroSection = document.querySelector('.hero');
    const profileContainer = document.querySelector('.profile-container');
    const orbitRing = document.querySelector('.orbit-ring');

    if (heroSection && profileContainer && matchMedia('(pointer:fine)').matches) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            profileContainer.style.transform = `translateX(${x}px) translateY(${y}px)`;
            if (orbitRing) {
                orbitRing.style.transform = `translate(-50%, -50%) translateX(${x * 1.5}px) translateY(${y * 1.5}px)`;
            }
        });

        // Reset on leave
        heroSection.addEventListener('mouseleave', () => {
            profileContainer.style.transform = 'translateX(0) translateY(0)';
            if (orbitRing) {
                orbitRing.style.transform = 'translate(-50%, -50%)';
            }
        });
    }

    // --- 3. Typing Effect ---
    // Selector for the subtitle text to replace or append cursor
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = "Ingénieur Logiciel · FullStack Web & Mobile"; // Texte aligné avec le sous-titre actuel
        // Let's reuse existing text if needed, but it's cleaner to reset it.
        subtitle.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
        const typingText = subtitle.querySelector('.typing-text');
        const typingCursor = subtitle.querySelector('.typing-cursor');

        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    if (typingCursor) {
                        typingCursor.style.opacity = '0';
                        typingCursor.style.display = 'none';
                    }
                }, 2000);
            }
        }

        // Start typing after a delay
        setTimeout(type, 1000);
    }

    // --- 4. 3D Tilt Effect for Cards ---
    const cards = document.querySelectorAll('.project-card, .service-card');

    if (matchMedia('(pointer:fine)').matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // --- 5. Scroll Stagger Reveal ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Mini‑jeu Dev Quest ---
    const devQuestGrid = document.getElementById('devQuestGrid');
    const devQuestMessage = document.getElementById('devQuestMessage');
    const devQuestMoves = document.getElementById('devQuestMoves');
    const devQuestLevel = document.getElementById('devQuestLevel');

    if (devQuestGrid) {
        // Carte 5x5
        // . = vide, # = mur, P = player, A/S/J/C = objectifs (About/Services/Projets/Contact)
        const mapLayout = [
            'P...A',
            '.#.#.',
            '..#..',
            'S.#.J',
            '..#C.'
        ];

        const rows = mapLayout.length;
        const cols = mapLayout[0].length;

        let playerPos = { row: 0, col: 0 };
        let movesCount = 0;
        const visitedGoals = new Set();

        const goalMap = {
            A: { id: 'about', label: 'About' },
            S: { id: 'services', label: 'Services' },
            J: { id: 'projects', label: 'Projets' },
            C: { id: 'contact', label: 'Contact' }
        };

        // Crée la grille DOM
        const cells = [];
        for (let r = 0; r < rows; r++) {
            cells[r] = [];
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('dev-quest-cell');
                cell.dataset.row = String(r);
                cell.dataset.col = String(c);

                const value = mapLayout[r][c];

                if (value === '#') {
                    cell.classList.add('dev-quest-cell-wall');
                } else if (value === 'P') {
                    playerPos = { row: r, col: c };
                    cell.classList.add('dev-quest-cell-player');
                } else if (goalMap[value]) {
                    cell.classList.add('dev-quest-cell-goal');
                    cell.dataset.label = goalMap[value].label;
                    cell.dataset.goal = value;
                }

                devQuestGrid.appendChild(cell);
                cells[r][c] = cell;
            }
        }

        function updateMoves() {
            if (!devQuestMoves) return;
            devQuestMoves.textContent = `${movesCount} coup${movesCount > 1 ? 's' : ''}`;
        }

        function updateLevel() {
            if (!devQuestLevel) return;
            const count = visitedGoals.size;
            if (count === 0) {
                devQuestLevel.textContent = 'Niveau 1 — Découverte';
            } else if (count === 1) {
                devQuestLevel.textContent = 'Niveau 2 — Backend & Profil';
            } else if (count === 2) {
                devQuestLevel.textContent = 'Niveau 3 — Interface & UX';
            } else if (count === 3) {
                devQuestLevel.textContent = 'Niveau 4 — Projets réels';
            } else if (count >= 4) {
                devQuestLevel.textContent = 'Niveau 5 — Portfolio maîtrisé';
            }
        }

        function setMessage(html) {
            if (!devQuestMessage) return;
            devQuestMessage.innerHTML = html;
        }

        function highlightNav(targetId) {
            const links = document.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }

        function scrollToSection(targetId) {
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                highlightNav(targetId);
            }
        }

        function handleGoal(goalChar) {
            const goal = goalMap[goalChar];
            if (!goal) return;

            visitedGoals.add(goalChar);
            updateLevel();

            const allUnlocked = visitedGoals.size >= Object.keys(goalMap).length;

            const tag = `<span class="dev-quest-tag">${allUnlocked ? 'GG' : 'Section débloquée'}</span>`;
            const text = {
                A: "Tu viens de débloquer la zone About — découvre rapidement qui tu es.",
                S: "Tu arrives sur les Services — ce que tu peux apporter à un client.",
                J: "Tu entres dans les Projets — les cas concrets que tu as livrés.",
                C: "Tu atteins Contact — dernier niveau pour discuter d’un projet."
            }[goalChar] || '';

            const bonus = allUnlocked
                ? ' Tu as débloqué tout le parcours — tu peux maintenant parcourir librement les sections.'
                : '';

            setMessage(`${tag}${text}${bonus}`);

            // Scroll léger après une petite pause pour que le joueur voie le feedback
            setTimeout(() => scrollToSection(goal.id), 600);
        }

        function movePlayer(deltaRow, deltaCol) {
            const newRow = playerPos.row + deltaRow;
            const newCol = playerPos.col + deltaCol;

            if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) return;

            const targetValue = mapLayout[newRow][newCol];
            if (targetValue === '#') return;

            const currentCell = cells[playerPos.row][playerPos.col];
            currentCell.classList.remove('dev-quest-cell-player');

            const newCell = cells[newRow][newCol];
            newCell.classList.add('dev-quest-cell-player');

            playerPos = { row: newRow, col: newCol };
            movesCount += 1;
            updateMoves();

            if (goalMap[targetValue]) {
                handleGoal(targetValue);
            } else if (devQuestMessage) {
                // message léger si pas d’objectif
                setMessage('');
            }
        }

        // Contrôles clavier
        window.addEventListener('keydown', (e) => {
            const arrows = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (!arrows.includes(e.key)) return;

            // Empêche le scroll lors du jeu
            e.preventDefault();

            switch (e.key) {
                case 'ArrowUp':
                    movePlayer(-1, 0);
                    break;
                case 'ArrowDown':
                    movePlayer(1, 0);
                    break;
                case 'ArrowLeft':
                    movePlayer(0, -1);
                    break;
                case 'ArrowRight':
                    movePlayer(0, 1);
                    break;
            }
        });

        // Contrôles boutons (mobile / clic)
        const devQuestButtons = document.querySelectorAll('.dev-quest-btn');
        devQuestButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = btn.getAttribute('data-dir');
                if (!dir) return;
                if (dir === 'up') movePlayer(-1, 0);
                if (dir === 'down') movePlayer(1, 0);
                if (dir === 'left') movePlayer(0, -1);
                if (dir === 'right') movePlayer(0, 1);
            });
        });

        // Message initial
        setMessage('<span class="dev-quest-tag">Tutoriel</span>Utilise les flèches ou les boutons pour explorer la carte et débloquer chaque section du portfolio. Chaque zone atteinte te fait monter de niveau.');
        updateMoves();
        updateLevel();
    }
});
