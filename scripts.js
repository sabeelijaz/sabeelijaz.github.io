/* Sabeel Ijaz — Portfolio Scripts */

// ── Mobile Menu ──────────────────────────────────────────
function initMobileMenu() {
    const btn     = document.getElementById('mobileMenuBtn');
    const menu    = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const close   = document.getElementById('mobileMenuClose');
    const links   = document.querySelectorAll('.mobile-menu-nav a');

    if (!btn || !menu || !overlay || !close) return;

    const open = () => {
        btn.classList.add('active');
        menu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        btn.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', () => menu.classList.contains('active') ? closeMenu() : open());
    close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    links.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ── Navbar Scroll State ──────────────────────────────────
function initNavScroll() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ── Active Nav Link on Scroll ────────────────────────────
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id], .section[id]');
    const links = document.querySelectorAll('.nav-links a');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
}

// ── Smooth Scroll ────────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href.length <= 1) return;
            e.preventDefault();
            if (href === '#top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ── Scroll Fade-in Animations ────────────────────────────
function initFadeUp() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ── Stats Counter ────────────────────────────────────────
function initStatsCounter() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            document.querySelectorAll('.stat-number').forEach(el => {
                const target = parseInt(el.getAttribute('data-target') || '0', 10);
                const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
                let count = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    count = Math.min(count + step, target);
                    el.innerHTML = count + suffix;
                    if (count >= target) clearInterval(timer);
                }, 25);
            });
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// ── Hero Photo Fallback ──────────────────────────────────
// If a personal photo is added at images/profile.jpg it will be used;
// otherwise the og-image is shown as a fallback.
function initHeroPhoto() {
    const img = document.getElementById('heroPhoto');
    if (!img) return;
    const preferred = 'images/profile.jpg';
    const testImg = new Image();
    testImg.onload = () => { img.src = preferred; };
    testImg.src = preferred;
}

// ── Hero Experience Years ────────────────────────────────
function initHeroExperience() {
    const yearsEl = document.getElementById('hero-experience-years');
    const metaEl = document.getElementById('hero-experience-meta');
    const statsEl = document.getElementById('stats-experience-value');
    if (!yearsEl && !metaEl && !statsEl) return;

    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    const value = `${years}+`;

    if (yearsEl) yearsEl.textContent = value;
    if (metaEl) metaEl.textContent = value;
    if (statsEl) {
        statsEl.setAttribute('data-target', String(years));
        statsEl.innerHTML = `0<span>+</span>`;
    }
}

// ── Footer Year ─────────────────────────────────────────
function initFooterYear() {
    const yearEl = document.getElementById('current-year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
}

// ── Contact Form ─────────────────────────────────────────
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const original = btn.innerHTML;
        const serviceID  = 'service_portfolio';
        const templateID = 'template_portfolio';

        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...';
        btn.disabled = true;

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
                btn.style.background = '#10b981';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            }, err => {
                btn.innerHTML = '✕ Failed — Try Again';
                btn.style.background = '#ef4444';
                console.error('EmailJS error:', err);
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            });
    });
}

// ── Boot ─────────────────────────────────────────────────
function boot() {
    initMobileMenu();
    initNavScroll();
    initActiveNavLinks();
    initSmoothScroll();
    initFadeUp();
    initStatsCounter();
    initHeroPhoto();
    initHeroExperience();
    initFooterYear();
    initContactForm();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
