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
    // Broad selector — catches every card/item type on the page
    const FADE_SELECTOR = [
        '.mission-card',
        '.threat-card',
        '.case-card',
        '.service-item',
        '.timeline-item',
        '.app-card',
        '.faq-item',
        '.alternative-card',
        '.contact-method',
        '.newsletter-form',
        '.contact-info',
        '.founder-card',
        '.initiative-text',
        '.recipe-card',
        '.diday-next',
        '.diday-logo-box',
    ].join(', ');

    // Assign each element a stagger delay based on its visual group (siblings share a group)
    function assignDelays(elements) {
        // Group by parent so siblings stagger together, unrelated sections start fresh
        const parentMap = new Map();
        elements.forEach(el => {
            const key = el.parentElement;
            if (!parentMap.has(key)) parentMap.set(key, []);
            parentMap.get(key).push(el);
        });
        parentMap.forEach(group => {
            group.forEach((el, i) => {
                el.dataset.fadeDelay = i * 75; // 75 ms between siblings
            });
        });
    }

    setTimeout(function () {
        const targets = Array.from(document.querySelectorAll(FADE_SELECTOR));

        assignDelays(targets);

        targets.forEach(el => el.classList.add('fade-in'));

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = parseInt(el.dataset.fadeDelay || 0, 10);
                setTimeout(() => el.classList.add('visible'), delay);
                fadeObserver.unobserve(el);
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px',
        });

        targets.forEach(el => fadeObserver.observe(el));

    }, 400);

});
