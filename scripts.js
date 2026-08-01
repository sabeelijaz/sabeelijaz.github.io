/* Sabeel Ijaz — Portfolio Scripts */

// ── Input Security & Validation Utilities ────────────────

const Security = (() => {

    // Strip HTML tags and dangerous characters to prevent injection
    const sanitize = (str) => {
        if (typeof str !== 'string') return '';
        return str
            .replace(/<[^>]*>/g, '')              // strip HTML tags
            .replace(/[<>"'`]/g, '')              // strip remaining dangerous chars
            .replace(/javascript:/gi, '')         // block js: URIs
            .replace(/on\w+\s*=/gi, '')           // strip inline event handlers
            .trim();
    };

    // Strict email regex — covers 99% of valid addresses
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    // Common disposable/throwaway email domains to block
    const blockedDomains = new Set([
        'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
        'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'guerrillamail.info',
        'spam4.me', 'trashmail.com', 'trashmail.me', 'yopmail.com', 'dispostable.com',
        'fakeinbox.com', 'maildrop.cc', 'spamgourmet.com', 'getairmail.com',
        'discard.email', 'spambox.us', 'trashmail.net', 'getnada.com', '10minutemail.com',
        'tempinbox.com', 'mailnull.com', 'spamevader.com', 'mailnesia.com',
    ]);

    // Patterns that suggest spam / injection attempts in text fields
    const suspiciousPatterns = [
        /https?:\/\//i,          // URLs in name/subject/message get flagged if excessive
        /\$\{.*\}/,              // template literals
        /\{\{.*\}\}/,            // handlebars/mustache injection
        /eval\s*\(/i,            // eval()
        /document\./i,           // DOM access
        /window\./i,             // window access
        /script/i,               // <script> keyword
        /base64/i,               // base64 encoded payloads
    ];

    const validateEmail = (email) => {
        const val = sanitize(email);
        if (!val) return { ok: false, msg: 'Email is required.' };
        if (!emailRegex.test(val)) return { ok: false, msg: 'Please enter a valid email address.' };
        const domain = val.split('@')[1].toLowerCase();
        if (blockedDomains.has(domain)) return { ok: false, msg: 'Disposable email addresses are not allowed.' };
        return { ok: true, msg: '' };
    };

    const validateText = (value, fieldName, min = 2, max = 500) => {
        const val = sanitize(value);
        if (!val) return { ok: false, msg: `${fieldName} is required.` };
        if (val.length < min) return { ok: false, msg: `${fieldName} must be at least ${min} characters.` };
        if (val.length > max) return { ok: false, msg: `${fieldName} must be under ${max} characters.` };
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(val)) return { ok: false, msg: `${fieldName} contains invalid content.` };
        }
        return { ok: true, msg: '', clean: val };
    };

    // Rate limiting — max `limit` submissions per `windowMs` milliseconds
    const checkRateLimit = (key, limit = 3, windowMs = 15 * 60 * 1000) => {
        const now = Date.now();
        const raw = localStorage.getItem(key);
        let record = raw ? JSON.parse(raw) : { count: 0, start: now };

        // Reset window if expired
        if (now - record.start > windowMs) {
            record = { count: 0, start: now };
        }

        if (record.count >= limit) {
            const remaining = Math.ceil((windowMs - (now - record.start)) / 60000);
            return { allowed: false, msg: `Too many attempts. Please wait ${remaining} minute(s).` };
        }

        record.count += 1;
        localStorage.setItem(key, JSON.stringify(record));
        return { allowed: true };
    };

    // Per-submission cooldown to prevent double-clicks / rapid retries
    const checkCooldown = (key, cooldownMs = 30000) => {
        const last = parseInt(localStorage.getItem(key) || '0', 10);
        const now = Date.now();
        if (now - last < cooldownMs) {
            const secs = Math.ceil((cooldownMs - (now - last)) / 1000);
            return { allowed: false, msg: `Please wait ${secs}s before submitting again.` };
        }
        localStorage.setItem(key, String(now));
        return { allowed: true };
    };

    return { sanitize, validateEmail, validateText, checkRateLimit, checkCooldown };
})();

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

    // ── Honeypot: hidden field bots fill in — humans never see it
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';       // enticing name for bots
    honeypot.autocomplete = 'off';
    honeypot.tabIndex = -1;
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    form.appendChild(honeypot);

    // Field references
    const nameInput    = form.querySelector('#name');
    const emailInput   = form.querySelector('#email');
    const subjectInput = form.querySelector('#subject');
    const msgInput     = form.querySelector('#message');

    // Show / clear inline error for a field
    const setError = (input, msg) => {
        input.classList.toggle('input-error', !!msg);
        let err = input.parentElement.querySelector('.field-error');
        if (!err) {
            err = document.createElement('p');
            err.className = 'field-error gate-error';
            err.setAttribute('role', 'alert');
            err.setAttribute('aria-live', 'polite');
            input.parentElement.appendChild(err);
        }
        err.textContent = msg;
    };

    // Validate all contact form fields, return true if all pass
    const validateContactForm = () => {
        let valid = true;

        const nameRes = Security.validateText(nameInput.value, 'Name', 2, 80);
        setError(nameInput, nameRes.msg);
        if (!nameRes.ok) valid = false;

        const emailRes = Security.validateEmail(emailInput.value);
        setError(emailInput, emailRes.msg);
        if (!emailRes.ok) valid = false;

        const subjectRes = Security.validateText(subjectInput.value, 'Subject', 3, 120);
        setError(subjectInput, subjectRes.msg);
        if (!subjectRes.ok) valid = false;

        const msgRes = Security.validateText(msgInput.value, 'Message', 10, 2000);
        setError(msgInput, msgRes.msg);
        if (!msgRes.ok) valid = false;

        return valid;
    };

    // Real-time validation on blur
    [nameInput, subjectInput].forEach(el => {
        if (el) el.addEventListener('blur', () => {
            const r = Security.validateText(el.value, el.name.charAt(0).toUpperCase() + el.name.slice(1), 2, el === subjectInput ? 120 : 80);
            setError(el, r.msg);
        });
    });
    if (emailInput) emailInput.addEventListener('blur', () => {
        setError(emailInput, Security.validateEmail(emailInput.value).msg);
    });
    if (msgInput) msgInput.addEventListener('blur', () => {
        setError(msgInput, Security.validateText(msgInput.value, 'Message', 10, 2000).msg);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Honeypot check
        if (honeypot.value) return;

        // Validate fields
        if (!validateContactForm()) return;

        // Rate limit: max 3 contact submissions per 15 min
        const rateRes = Security.checkRateLimit('contact_rate', 3, 15 * 60 * 1000);
        if (!rateRes.allowed) {
            setError(msgInput, rateRes.msg);
            return;
        }

        // Per-submission cooldown: 30s between attempts
        const coolRes = Security.checkCooldown('contact_last', 30000);
        if (!coolRes.allowed) {
            setError(msgInput, coolRes.msg);
            return;
        }

        const btn = form.querySelector('.btn-submit');
        const original = btn.innerHTML;
        const serviceID  = 'service_portfolio';
        const templateID = 'template_portfolio';

        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...';
        btn.disabled = true;

        // Build sanitized payload manually (not sendForm, to use clean values)
        const payload = {
            name:    Security.sanitize(nameInput.value),
            email:   Security.sanitize(emailInput.value),
            subject: Security.sanitize(subjectInput.value),
            message: Security.sanitize(msgInput.value),
        };

        emailjs.send(serviceID, templateID, payload)
            .then(() => {
                btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
                btn.style.background = '#10b981';
                form.reset();
                // Clear any lingering error messages
                form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
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

// ── Visitor Gate ─────────────────────────────────────────
function initVisitorGate() {
    const gate = document.getElementById('visitorGate');
    const form = document.getElementById('gateForm');
    const input = document.getElementById('gateEmail');
    const errorEl = document.getElementById('gateEmailError');
    const btn = document.getElementById('gateBtn');

    if (!gate || !form || !input || !btn) return;

    // Check localStorage — if visitor already submitted, hide gate immediately
    const visitKey = 'sabeelijaz_visitor_submitted';
    if (localStorage.getItem(visitKey) === 'true') {
        gate.remove();
        document.body.classList.remove('gate-open');
        return;
    }

    // Show gate and lock scroll
    document.body.classList.add('gate-open');

    // ── Honeypot: hidden field bots fill in — humans never see it
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'phone_number';  // enticing name for bots
    honeypot.autocomplete = 'off';
    honeypot.tabIndex = -1;
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
    form.appendChild(honeypot);

    // Real-time validation on input / blur
    const runValidation = () => {
        const result = Security.validateEmail(input.value);
        input.classList.toggle('input-error', !result.ok && input.value.trim() !== '');
        errorEl.textContent = input.value.trim() ? result.msg : '';
        return result.ok;
    };

    input.addEventListener('input', runValidation);
    input.addEventListener('blur', runValidation);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Honeypot check
        if (honeypot.value) return;

        // Validate email
        const emailResult = Security.validateEmail(input.value);
        if (!emailResult.ok) {
            input.classList.add('input-error');
            errorEl.textContent = emailResult.msg;
            input.focus();
            return;
        }

        // Rate limit: max 2 gate submissions per 30 min (stricter — this is one-shot)
        const rateRes = Security.checkRateLimit('gate_rate', 2, 30 * 60 * 1000);
        if (!rateRes.allowed) {
            errorEl.textContent = rateRes.msg;
            return;
        }

        // Per-submission cooldown: 15s
        const coolRes = Security.checkCooldown('gate_last', 15000);
        if (!coolRes.allowed) {
            errorEl.textContent = coolRes.msg;
            return;
        }

        const visitorEmail = Security.sanitize(input.value);
        const originalBtnContent = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Notifying...';

        const serviceID  = 'service_portfolio';
        const templateID = 'template_visitor_gate';

        emailjs.send(serviceID, templateID, {
            visitor_email: visitorEmail,
            to_name: 'Sabeel',
            message: `A visitor with the email "${visitorEmail}" just entered your portfolio.`,
            reply_to: visitorEmail
        })
        .then(() => {
            localStorage.setItem(visitKey, 'true');

            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Success!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                gate.classList.add('gate-hidden');
                document.body.classList.remove('gate-open');
                setTimeout(() => gate.remove(), 600);
            }, 1200);
        })
        .catch(err => {
            console.error('Visitor gate email error:', err);
            btn.innerHTML = '✕ Failed — Try Again';
            btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            btn.disabled = false;

            setTimeout(() => {
                btn.innerHTML = originalBtnContent;
                btn.style.background = '';
            }, 3000);
        });
    });
}

// ── Boot ─────────────────────────────────────────────────
function boot() {
    initVisitorGate();
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

// Keyframe animation for spinner
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
