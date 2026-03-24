/* ============================================================
   EU-Data.org — Theme: 3-way light / dark / system
   ============================================================ */

(function () {
    const html = document.documentElement;
    const STORAGE_KEY = 'eu-theme';

    // SVG icons for the 3 buttons
    const ICONS = {
        light: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
        dark:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
        system:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    };

    const LABELS = { light: 'Light', dark: 'Dark', system: 'System' };

    /** Resolve the actual colour scheme for a given preference */
    function resolveScheme(pref) {
        if (pref === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return pref;
    }

    /** Apply data-theme to <html> without saving */
    function applyScheme(scheme) {
        html.setAttribute('data-theme', scheme);
    }

    /** Set preference, persist, and update UI */
    function setTheme(pref) {
        localStorage.setItem(STORAGE_KEY, pref);
        applyScheme(resolveScheme(pref));
        updateSwitchers(pref);
    }

    /** Build a theme-switcher widget into a container element */
    function buildSwitcher(container) {
        container.innerHTML = '';
        container.className = 'theme-switcher';
        container.setAttribute('role', 'group');
        container.setAttribute('aria-label', 'Theme');

        ['light', 'dark', 'system'].forEach(pref => {
            const btn = document.createElement('button');
            btn.className = 'theme-btn';
            btn.dataset.pref = pref;
            btn.setAttribute('aria-label', LABELS[pref]);
            btn.title = LABELS[pref];
            btn.innerHTML = ICONS[pref];
            btn.addEventListener('click', () => setTheme(pref));
            container.appendChild(btn);
        });
    }

    /** Sync active state on all switchers */
    function updateSwitchers(pref) {
        document.querySelectorAll('.theme-switcher .theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.pref === pref);
        });
    }

    // ---- Init ----

    // Build switchers (containers must exist in HTML)
    document.querySelectorAll('[data-theme-switcher]').forEach(buildSwitcher);

    // Restore saved preference
    const saved = localStorage.getItem(STORAGE_KEY) || 'system';
    applyScheme(resolveScheme(saved));
    updateSwitchers(saved);

    // React to OS-level changes when preference is "system"
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const current = localStorage.getItem(STORAGE_KEY) || 'system';
        if (current === 'system') applyScheme(resolveScheme('system'));
    });
})();
