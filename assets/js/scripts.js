// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animate stat numbers on scroll
function animateCounter(el, target, suffix = '') {
    const duration = 1500;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = (isDecimal ? value.toFixed(0) : Math.floor(value)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const raw = el.dataset.value;
            const suffix = el.dataset.suffix || '';
            animateCounter(el, parseFloat(raw), suffix);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-value]').forEach(el => statObserver.observe(el));

// Fade-in on scroll for cards
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.mission-card, .alert-card, .service-item').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});
