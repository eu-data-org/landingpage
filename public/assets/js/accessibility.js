/* ============================================================
   EU-Data.org — Accessibility: high contrast + reduce motion
   ============================================================ */

(function () {
    const html = document.documentElement;
    const KEYS = { contrast: 'eu-contrast', motion: 'eu-motion' };

    // ---- Apply stored preferences immediately (before paint) ----
    function applyContrast(val) { html.setAttribute('data-contrast', val); }
    function applyMotion(val)   { html.setAttribute('data-motion',   val); }

    const storedContrast  = localStorage.getItem(KEYS.contrast) || 'normal';
    const osReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storedMotion    = localStorage.getItem(KEYS.motion) || (osReducedMotion ? 'reduced' : 'full');

    applyContrast(storedContrast);
    applyMotion(storedMotion);

    // ---- Shared panel HTML builder ----
    function buildPanelHTML(contrast, motion) {
        return `
        <div class="a11y-panel-header">
            <span>Accessibility</span>
            <button class="a11y-panel-close" aria-label="Close accessibility panel">✕</button>
        </div>
        <div class="a11y-panel-body">
            <div class="a11y-row">
                <div class="a11y-row-label">
                    <span class="a11y-row-title">High Contrast</span>
                    <span class="a11y-row-desc">Increases colour contrast for better readability</span>
                </div>
                <button class="a11y-toggle-btn" role="switch"
                    aria-checked="${contrast === 'high'}"
                    data-key="contrast" data-on="high" data-off="normal">
                    <span class="a11y-toggle-track"><span class="a11y-toggle-thumb"></span></span>
                    <span class="a11y-toggle-label">${contrast === 'high' ? 'On' : 'Off'}</span>
                </button>
            </div>
            <div class="a11y-row">
                <div class="a11y-row-label">
                    <span class="a11y-row-title">Reduce Motion</span>
                    <span class="a11y-row-desc">Disables animations and transitions</span>
                </div>
                <button class="a11y-toggle-btn" role="switch"
                    aria-checked="${motion === 'reduced'}"
                    data-key="motion" data-on="reduced" data-off="full">
                    <span class="a11y-toggle-track"><span class="a11y-toggle-thumb"></span></span>
                    <span class="a11y-toggle-label">${motion === 'reduced' ? 'On' : 'Off'}</span>
                </button>
            </div>
        </div>`;
    }

    // ---- Wire up toggle switches inside any panel element ----
    function wireToggles(panelEl) {
        panelEl.querySelectorAll('.a11y-toggle-btn').forEach(toggle => {
            toggle.addEventListener('click', function () {
                const key    = this.dataset.key;
                const isOn   = this.getAttribute('aria-checked') === 'true';
                const newVal = isOn ? this.dataset.off : this.dataset.on;

                localStorage.setItem(KEYS[key], newVal);

                // Update ALL toggle buttons for this key across both panels
                document.querySelectorAll(`.a11y-toggle-btn[data-key="${key}"]`).forEach(t => {
                    const tOn = !isOn;
                    t.setAttribute('aria-checked', String(tOn));
                    t.querySelector('.a11y-toggle-label').textContent = tOn ? 'On' : 'Off';
                });

                if (key === 'contrast') applyContrast(newVal);
                if (key === 'motion')   applyMotion(newVal);
            });
        });
    }

    // ---- Build after DOM ready ----
    document.addEventListener('DOMContentLoaded', function () {
        const contrast = localStorage.getItem(KEYS.contrast) || 'normal';
        const motion   = localStorage.getItem(KEYS.motion)   || (osReducedMotion ? 'reduced' : 'full');

        // ============================================================
        // 1. HEADER BUTTON + DROPDOWN PANEL (mobile / small screens)
        // ============================================================
        const headerBtn = document.createElement('button');
        headerBtn.className = 'a11y-btn';
        headerBtn.id        = 'a11yToggle';
        headerBtn.title     = 'Accessibility settings';
        headerBtn.setAttribute('aria-label', 'Accessibility settings');
        headerBtn.setAttribute('aria-expanded', 'false');
        headerBtn.setAttribute('aria-controls', 'a11yPanel');
        headerBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`;

        const headerPanel = document.createElement('div');
        headerPanel.className = 'a11y-panel';
        headerPanel.id        = 'a11yPanel';
        headerPanel.setAttribute('role', 'dialog');
        headerPanel.setAttribute('aria-label', 'Accessibility settings');
        headerPanel.hidden    = true;
        headerPanel.innerHTML = buildPanelHTML(contrast, motion);
        wireToggles(headerPanel);

        headerPanel.querySelector('.a11y-panel-close').addEventListener('click', () => {
            headerPanel.hidden = true;
            headerBtn.setAttribute('aria-expanded', 'false');
            headerBtn.classList.remove('active');
        });

        headerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = !headerPanel.hidden;
            headerPanel.hidden = open;
            headerBtn.setAttribute('aria-expanded', String(!open));
            headerBtn.classList.toggle('active', !open);
        });

        const actions = document.querySelector('.header-actions');
        if (actions) {
            actions.insertBefore(headerBtn,   actions.lastElementChild);
            actions.insertBefore(headerPanel, actions.lastElementChild);
        }

        // ============================================================
        // 2. FLOATING SIDE TAB + PANEL (desktop)
        // ============================================================
        const floatWrap = document.createElement('div');
        floatWrap.className = 'a11y-float';
        floatWrap.setAttribute('aria-label', 'Accessibility settings');

        const floatTab = document.createElement('button');
        floatTab.className = 'a11y-float-tab';
        floatTab.setAttribute('aria-label', 'Accessibility settings');
        floatTab.setAttribute('aria-expanded', 'false');
        floatTab.setAttribute('aria-controls', 'a11yFloatPanel');
        floatTab.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <circle cx="16" cy="4" r="2"/>
                <path d="M18 22V12l-4-4-4 4v10"/>
                <path d="M10 22v-6.5a2 2 0 0 1 4 0V22"/>
            </svg>
            <span class="a11y-float-label">Accessibility</span>`;

        const floatPanel = document.createElement('div');
        floatPanel.className = 'a11y-float-panel';
        floatPanel.id        = 'a11yFloatPanel';
        floatPanel.setAttribute('role', 'dialog');
        floatPanel.setAttribute('aria-label', 'Accessibility settings');
        floatPanel.innerHTML = buildPanelHTML(contrast, motion);
        wireToggles(floatPanel);

        floatPanel.querySelector('.a11y-panel-close').addEventListener('click', () => {
            floatPanel.classList.remove('visible');
            floatTab.setAttribute('aria-expanded', 'false');
            floatTab.classList.remove('open');
        });

        floatTab.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = floatPanel.classList.contains('visible');
            floatPanel.classList.toggle('visible', !open);
            floatTab.setAttribute('aria-expanded', String(!open));
            floatTab.classList.toggle('open', !open);
        });

        floatWrap.appendChild(floatTab);
        floatWrap.appendChild(floatPanel);
        document.body.appendChild(floatWrap);

        // ---- Footer button → open whichever panel is visible ----
        const footerBtn = document.getElementById('footerA11yBtn');
        if (footerBtn) {
            footerBtn.addEventListener('click', () => {
                const isDesktop = window.matchMedia('(min-width: 769px)').matches;
                if (isDesktop) {
                    const open = !floatPanel.classList.contains('visible');
                    floatPanel.classList.toggle('visible', open);
                    floatTab.setAttribute('aria-expanded', String(open));
                    floatTab.classList.toggle('open', open);
                    if (open) floatPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    const open = headerPanel.hidden;
                    headerPanel.hidden = !open;
                    headerBtn.setAttribute('aria-expanded', String(open));
                    headerBtn.classList.toggle('active', open);
                }
            });
        }

        // ---- Close both panels on outside click / Escape ----
        document.addEventListener('click', (e) => {
            if (!headerPanel.hidden &&
                !headerPanel.contains(e.target) &&
                e.target !== headerBtn) {
                headerPanel.hidden = true;
                headerBtn.setAttribute('aria-expanded', 'false');
                headerBtn.classList.remove('active');
            }
            if (floatPanel.classList.contains('visible') &&
                !floatPanel.contains(e.target) &&
                !floatWrap.contains(e.target)) {
                floatPanel.classList.remove('visible');
                floatTab.setAttribute('aria-expanded', 'false');
                floatTab.classList.remove('open');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            headerPanel.hidden = true;
            headerBtn.setAttribute('aria-expanded', 'false');
            headerBtn.classList.remove('active');
            floatPanel.classList.remove('visible');
            floatTab.setAttribute('aria-expanded', 'false');
            floatTab.classList.remove('open');
        });

        // ---- Sync OS motion preference ----
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (localStorage.getItem(KEYS.motion)) return;
            const val = e.matches ? 'reduced' : 'full';
            applyMotion(val);
            document.querySelectorAll('.a11y-toggle-btn[data-key="motion"]').forEach(t => {
                t.setAttribute('aria-checked', String(e.matches));
                t.querySelector('.a11y-toggle-label').textContent = e.matches ? 'On' : 'Off';
            });
        });
    });
})();
