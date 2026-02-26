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

    // --- 6. Cyberpunk Space Shooter Engine ---
    const gameRoot = document.getElementById('gameRoot');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const gameUI = document.getElementById('gameUI');
    const gameHUD = document.getElementById('gameHUD');
    const startGameBtn = document.getElementById('startGameBtn');
    const coresCountEl = document.getElementById('coresCount');
    const portfolioContainer = document.getElementById('portfolioContainer');

    if (canvas && gameRoot) {
        // Init Canvas Size
        let cw, ch;
        function resizeCanvas() {
            cw = window.innerWidth;
            ch = window.innerHeight;
            canvas.width = cw;
            canvas.height = ch;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Game State Variables
        let isPlaying = false;
        let animationId;
        let lastTime = 0;

        const SECTIONS = [
            { id: 'about', label: 'ABOUT_SYS' },
            { id: 'services', label: 'SRV_SYS' },
            { id: 'projects', label: 'PRJ_SYS' },
            { id: 'contact', label: 'COM_SYS' }
        ];

        let cores = [];
        let projectiles = [];
        let particles = [];
        let unlockedCount = 0;

        // Joystick Input
        const joysticks = {
            left: { active: false, x: 0, y: 0, id: null, originX: 0, originY: 0, el: document.getElementById('joystickLeft'), base: null, stick: null },
            right: { active: false, x: 0, y: 0, id: null, originX: 0, originY: 0, el: document.getElementById('joystickRight'), base: null, stick: null }
        };
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        ['left', 'right'].forEach(side => {
            const joy = joysticks[side];
            if (joy.el) {
                joy.base = joy.el.querySelector('.joystick-base');
                joy.stick = joy.el.querySelector('.joystick-stick');

                joy.el.addEventListener('touchstart', e => {
                    e.preventDefault();
                    const touch = e.changedTouches[0];
                    joy.active = true;
                    joy.id = touch.identifier;
                    joy.originX = touch.clientX;
                    joy.originY = touch.clientY;

                    const rect = joy.el.getBoundingClientRect();
                    joy.el.classList.add('active');
                    joy.base.style.left = `${touch.clientX - rect.left}px`;
                    joy.base.style.top = `${touch.clientY - rect.top}px`;
                    joy.x = 0;
                    joy.y = 0;
                    joy.stick.style.transform = `translate(-50%, -50%)`;
                }, { passive: false });

                joy.el.addEventListener('touchmove', e => {
                    e.preventDefault();
                    if (!joy.active) return;
                    for (let i = 0; i < e.changedTouches.length; i++) {
                        const touch = e.changedTouches[i];
                        if (touch.identifier === joy.id) {
                            const dx = touch.clientX - joy.originX;
                            const dy = touch.clientY - joy.originY;
                            const dist = Math.min(Math.hypot(dx, dy), 50);
                            const angle = Math.atan2(dy, dx);

                            joy.x = Math.cos(angle) * (dist / 50);
                            joy.y = Math.sin(angle) * (dist / 50);
                            joy.stick.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`;
                        }
                    }
                }, { passive: false });

                const endTouch = e => {
                    e.preventDefault();
                    if (!joy.active) return;
                    for (let i = 0; i < e.changedTouches.length; i++) {
                        if (e.changedTouches[i].identifier === joy.id) {
                            joy.active = false;
                            joy.el.classList.remove('active');
                            joy.x = 0;
                            joy.y = 0;
                            joy.stick.style.transform = `translate(-50%, -50%)`;
                        }
                    }
                };

                joy.el.addEventListener('touchend', endTouch, { passive: false });
                joy.el.addEventListener('touchcancel', endTouch, { passive: false });
            }
        });

        // Keyboard & Mouse Input
        const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, ' ': false };
        const mouse = { x: cw / 2, y: ch / 2, down: false };

        window.addEventListener('keydown', e => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
        window.addEventListener('keyup', e => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });
        window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
        window.addEventListener('mousedown', e => { if (e.button === 0) mouse.down = true; });
        window.addEventListener('mouseup', e => { if (e.button === 0) mouse.down = false; });

        // Player Ship
        class Player {
            constructor() {
                this.x = cw / 2;
                this.y = ch / 2;
                this.vx = 0;
                this.vy = 0;
                this.friction = 0.92;
                this.accel = 0.6;
                this.maxSpeed = 8;
                this.angle = 0;
                this.radius = 15;
                this.cooldown = 0;
                this.color = '#e2e8f0';
            }

            update(dt) {
                // Acceleration
                let ax = 0, ay = 0;
                if (keys.w || keys.ArrowUp) ay -= this.accel;
                if (keys.s || keys.ArrowDown) ay += this.accel;
                if (keys.a || keys.ArrowLeft) ax -= this.accel;
                if (keys.d || keys.ArrowRight) ax += this.accel;

                if (joysticks.left.active) {
                    ax += joysticks.left.x * this.accel;
                    ay += joysticks.left.y * this.accel;
                }

                this.vx += ax;
                this.vy += ay;

                // Friction
                this.vx *= this.friction;
                this.vy *= this.friction;

                // Speed limit
                const speed = Math.hypot(this.vx, this.vy);
                if (speed > this.maxSpeed) {
                    this.vx = (this.vx / speed) * this.maxSpeed;
                    this.vy = (this.vy / speed) * this.maxSpeed;
                }

                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Bounds wrapper
                if (this.x < 0) this.x = cw;
                if (this.x > cw) this.x = 0;
                if (this.y < 0) this.y = ch;
                if (this.y > ch) this.y = 0;

                // Aiming angle
                if (joysticks.right.active && (joysticks.right.x !== 0 || joysticks.right.y !== 0)) {
                    this.angle = Math.atan2(joysticks.right.y, joysticks.right.x);
                } else if (!isTouchDevice || mouse.down) {
                    this.angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
                }

                // Shooting
                if (this.cooldown > 0) this.cooldown -= dt;
                if ((mouse.down || keys[' '] || (joysticks.right.active && (joysticks.right.x !== 0 || joysticks.right.y !== 0))) && this.cooldown <= 0) {
                    this.shoot();
                    this.cooldown = 150; // ms
                }
            }

            shoot() {
                const speed = 15;
                const px = this.x + Math.cos(this.angle) * 20;
                const py = this.y + Math.sin(this.angle) * 20;
                projectiles.push(new Projectile(px, py, Math.cos(this.angle) * speed, Math.sin(this.angle) * speed));

                // Gun recoil effect
                this.vx -= Math.cos(this.angle) * 1.5;
                this.vy -= Math.sin(this.angle) * 1.5;
            }

            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                // Add neon glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                ctx.beginPath();
                ctx.moveTo(20, 0);
                ctx.lineTo(-10, 15);
                ctx.lineTo(-5, 0);
                ctx.lineTo(-10, -15);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();

                // Engine flame
                if (Math.abs(this.vx) > 0.5 || Math.abs(this.vy) > 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(-5, 0);
                    ctx.lineTo(-20, (Math.random() - 0.5) * 10);
                    ctx.lineTo(-12, (Math.random() - 0.5) * 5);
                    ctx.fillStyle = '#94a3b8';
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        // Projectile
        class Projectile {
            constructor(x, y, vx, vy) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.life = 100;
                this.radius = 3;
            }
            update(dt) {
                this.x += this.vx * (dt / 16);
                this.y += this.vy * (dt / 16);
                this.life--;
            }
            draw(ctx) {
                ctx.save();
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#f8fafc';
                ctx.fillStyle = '#f8fafc';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Target Core
        class Core {
            constructor(section) {
                this.section = section;
                this.x = Math.random() * (cw - 100) + 50;
                this.y = Math.random() * (ch - 100) + 50;
                this.radius = 30;
                this.hp = 10;
                this.maxHp = 10;
                this.angle = 0;
                this.color = '#94a3b8';

                // Ensure it's not too close to center
                const d = Math.hypot(this.x - cw / 2, this.y - ch / 2);
                if (d < 150) {
                    this.x += 200;
                    this.y += 200;
                }
            }
            update() {
                this.angle += 0.02;

                // Keep in bounds
                if (this.x < 30) this.x = 30;
                if (this.x > cw - 30) this.x = cw - 30;
                if (this.y < 30) this.y = 30;
                if (this.y > ch - 30) this.y = ch - 30;
            }
            draw(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;

                // Hexagon shape
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    ctx.lineTo(this.radius * Math.cos(i * Math.PI / 3), this.radius * Math.sin(i * Math.PI / 3));
                }
                ctx.closePath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 3;
                ctx.stroke();

                // Inner core
                ctx.beginPath();
                ctx.arc(0, 0, this.radius * 0.5 * (this.hp / this.maxHp), 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
                ctx.fill();

                ctx.restore();

                // Text label
                ctx.font = "14px Courier New, monospace";
                ctx.fillStyle = "#E0F2FE";
                ctx.textAlign = "center";
                ctx.fillText(this.section.label, this.x, this.y - 45);

                // Health Bar
                ctx.fillStyle = "rgba(148,163,184,0.5)";
                ctx.fillRect(this.x - 20, this.y - 35, 40, 4);
                ctx.fillStyle = "#e2e8f0";
                ctx.fillRect(this.x - 20, this.y - 35, 40 * (this.hp / this.maxHp), 4);
            }
        }

        // Explosion Particle
        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 8;
                this.vy = (Math.random() - 0.5) * 8;
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.02;
                this.color = color;
                this.size = Math.random() * 3 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
            }
            draw(ctx) {
                ctx.globalAlpha = this.life;
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.size, this.size);
                ctx.globalAlpha = 1;
            }
        }

        // Create player
        const player = new Player();

        function spawnExplosion(x, y, color, count) {
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(x, y, color));
            }
        }

        function unlockSection(sectionId) {
            unlockedCount++;
            coresCountEl.textContent = (4 - unlockedCount).toString();

            // visually unlock in DOM
            const sectionTarget = document.getElementById(sectionId);
            if (sectionTarget) {
                sectionTarget.classList.add('cyber-section', 'unlocked');
            }

            if (unlockedCount === 4) {
                // Game completely won
                document.body.classList.remove('game-active');
                portfolioContainer.classList.remove('locked');
                gameRoot.classList.add('game-finished');

                if (joysticks.left.el) joysticks.left.el.classList.remove('visible');
                if (joysticks.right.el) joysticks.right.el.classList.remove('visible');

                // Style all nav links to normal
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => link.classList.add('unlocked'));

                // Add cyber-section class to hero
                const heroTarget = document.getElementById('about');
                if (heroTarget) {
                    heroTarget.classList.add('cyber-section', 'unlocked');
                }
            }
        }

        // Loop
        function loop(timestamp) {
            if (!isPlaying) return;
            const dt = timestamp - lastTime || 16;
            lastTime = timestamp;

            // Clear
            ctx.fillStyle = 'rgba(5, 8, 20, 0.2)'; // trailing effect
            ctx.fillRect(0, 0, cw, ch);

            player.update(dt);
            player.draw(ctx);

            // Projectiles
            for (let i = projectiles.length - 1; i >= 0; i--) {
                const p = projectiles[i];
                p.update(dt);
                p.draw(ctx);

                // Collision with Cores
                for (let j = cores.length - 1; j >= 0; j--) {
                    const c = cores[j];
                    const d = Math.hypot(p.x - c.x, p.y - c.y);
                    if (d < c.radius + p.radius) {
                        // Hit
                        c.hp -= 1;
                        projectiles.splice(i, 1);
                        spawnExplosion(p.x, p.y, '#e2e8f0', 5);

                        if (c.hp <= 0) {
                            spawnExplosion(c.x, c.y, '#94a3b8', 30);
                            unlockSection(c.section.id);
                            cores.splice(j, 1);
                        }
                        break;
                    }
                }

                if (p.life <= 0) {
                    projectiles.splice(i, 1);
                }
            }

            // Cores
            for (const c of cores) {
                c.update();
                c.draw(ctx);
            }

            // Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw(ctx);
                if (p.life <= 0) {
                    particles.splice(i, 1);
                }
            }

            animationId = requestAnimationFrame(loop);
        }

        // Start initialization
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => {
                gameUI.classList.add('hidden');
                gameHUD.classList.remove('hidden');

                if (isTouchDevice) {
                    if (joysticks.left.el) joysticks.left.el.classList.add('visible');
                    if (joysticks.right.el) joysticks.right.el.classList.add('visible');
                }

                // Reset state
                cores = SECTIONS.map(s => new Core(s));
                unlockedCount = 0;
                coresCountEl.textContent = '4';

                // Show portfolio container (which consists of locked sections)
                if (portfolioContainer) {
                    portfolioContainer.classList.remove('locked');
                    const sections = portfolioContainer.querySelectorAll('section');
                    sections.forEach(sec => sec.classList.add('cyber-section'));
                }

                isPlaying = true;
                lastTime = performance.now();
                animationId = requestAnimationFrame(loop);
            });
        }
    }
});
