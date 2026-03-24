/* ============================================================
   EU-Data.org — Scripts
   ============================================================ */

// ---------- Theme ----------
const html = document.documentElement;

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('eu-theme', theme);
}

function toggleTheme() {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// Restore saved preference (or system preference)
const saved = localStorage.getItem('eu-theme');
if (saved) {
    applyTheme(saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
}

// Wire up both toggles (synced)
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
document.getElementById('themeToggleFooter')?.addEventListener('click', toggleTheme);

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
    // Close on nav link click
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// ---------- Smooth scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 72; // header height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---------- Service tabs ----------
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        btn.closest('.container').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.closest('.container').querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const content = document.getElementById(tab);
        if (content) content.classList.add('active');
    });
});

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ---------- Newsletter form ----------
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        const btn = newsletterForm.querySelector('button[type="submit"]');
        btn.textContent = 'Subscribed!';
        btn.disabled = true;
    });
}

// ---------- Stat counter animation ----------
function animateCounter(el, target, suffix = '') {
    const duration = 1600;
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            animateCounter(el, parseFloat(el.dataset.value), el.dataset.suffix || '');
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-value]').forEach(el => statObserver.observe(el));

// ---------- Fade-in on scroll ----------
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    '.mission-card, .threat-card, .case-card, .service-item, .timeline-item, .app-card'
).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    fadeObserver.observe(el);
});
