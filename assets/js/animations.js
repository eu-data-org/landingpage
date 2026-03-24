/* ============================================================
   EU-Data.org — Animations: stat counters, fade-in on scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Stat counter ----------
    function animateCounter(el, target, suffix) {
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

});
