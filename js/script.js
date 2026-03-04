/* ═══════════════════════════════════════════
   AHSAMUL HAQUE — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════ */

/* ── Particle canvas background ── */
(function initCanvas() {
    const C  = document.getElementById('bg-canvas');
    if (!C) return;
    const cx = C.getContext('2d');
    const resize = () => { C.width = innerWidth; C.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const GOLD   = '245,200,66';
    const PURPLE = '155,93,229';

    const pts = Array.from({ length: 90 }, () => {
        const p = {};
        function reset() {
            p.x  = Math.random() * C.width;
            p.y  = Math.random() * C.height;
            p.r  = Math.random() * 1.4 + 0.3;
            p.vx = (Math.random() - 0.5) * 0.24;
            p.vy = (Math.random() - 0.5) * 0.24;
            p.a  = Math.random() * 0.42 + 0.08;
            p.c  = Math.random() > 0.55 ? GOLD : PURPLE;
        }
        reset();
        p.reset = reset;
        return p;
    });

    function drawFrame() {
        cx.clearRect(0, 0, C.width, C.height);

        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > C.width || p.y < 0 || p.y > C.height) p.reset();
            cx.beginPath();
            cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            cx.fillStyle = `rgba(${p.c},${p.a})`;
            cx.fill();
        });

        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < 130) {
                    cx.beginPath();
                    cx.moveTo(pts[i].x, pts[i].y);
                    cx.lineTo(pts[j].x, pts[j].y);
                    cx.strokeStyle = `rgba(${GOLD},${0.032 * (1 - d / 130)})`;
                    cx.lineWidth   = 0.5;
                    cx.stroke();
                }
            }
        }
        requestAnimationFrame(drawFrame);
    }
    drawFrame();
})();

/* ── Navbar scroll effect ── */
(function initNav() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
})();

/* ── Hamburger menu ── */
(function initHamburger() {
    const btn   = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('open'));
    });
})();

/* ── Typewriter effect ── */
(function initTypewriter() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const roles   = [
        'Database Engineer Intern',
        'Full-Stack Developer',
        'ML Enthusiast',
        'SQA Engineer',
        'CS & Engineering Student'
    ];
    let ri  = 0, ci = 0, deleting = false;

    function type() {
        const cur = roles[ri];
        if (!deleting) {
            el.textContent = cur.slice(0, ++ci);
            if (ci === cur.length) { deleting = true; setTimeout(type, 2200); return; }
        } else {
            el.textContent = cur.slice(0, --ci);
            if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        }
        setTimeout(type, deleting ? 45 : 85);
    }
    type();
})();

/* ── Animated stat counters ── */
(function initCounters() {
    const nums = document.querySelectorAll('.stat-num[data-target]');
    if (!nums.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el      = entry.target;
            const target  = parseFloat(el.dataset.target);
            const decimal = parseInt(el.dataset.decimal || '0');
            const suffix  = el.dataset.suffix || '';
            const dur     = 1400;
            const step    = 16;
            const steps   = dur / step;
            const inc     = target / steps;
            let cur       = 0;

            const timer = setInterval(() => {
                cur = Math.min(cur + inc, target);
                el.textContent = cur.toFixed(decimal) + suffix;
                if (cur >= target) clearInterval(timer);
            }, step);

            observer.unobserve(el);
        });
    }, { threshold: 0.6 });

    nums.forEach(el => observer.observe(el));
})();

/* ── Scroll reveal ── */
(function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    els.forEach(el => observer.observe(el));
})();

/* ── Contact form ── */
function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById('fname').value.trim();
    const mail = document.getElementById('femail').value.trim();
    const msg  = document.getElementById('fmessage').value.trim();

    if (!name || !mail || !msg) {
        alert('Please fill in Name, Email, and Message.');
        return;
    }

    const ok = document.getElementById('formSuccess');
    ok.style.display = 'block';
    document.getElementById('fname').value    = '';
    document.getElementById('femail').value   = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmessage').value = '';

    setTimeout(() => { ok.style.display = 'none'; }, 5000);
}

/* ── Active nav link highlight on scroll ── */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
        });
        navLinks.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + current) {
                a.style.color = 'var(--accent-gold)';
            }
        });
    }, { passive: true });
})();
