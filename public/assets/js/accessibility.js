/* ============================================================
   EU-Data.org — Accessibility: high contrast + reduce motion
   ============================================================ */

(function () {
    const html  = document.documentElement;
    const KEYS  = { contrast: 'eu-contrast', motion: 'eu-motion' };

    // ---- Apply stored preferences immediately (before paint) ----
    function applyContrast(val) {
        html.setAttribute('data-contrast', val); // 'normal' | 'high'
    }
    function applyMotion(val) {
        html.setAttribute('data-motion', val);   // 'full' | 'reduced'
    }

    // Restore from storage, falling back to OS preference for motion
    const storedContrast = localStorage.getItem(KEYS.contrast) || 'normal';
    const osReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const storedMotion  = localStorage.getItem(KEYS.motion)
        || (osReducedMotion ? 'reduced' : 'full');

    applyContrast(storedContrast);
    applyMotion(storedMotion);

    // ---- Build the panel after DOM is ready ----
    document.addEventListener('DOMContentLoaded', function () {

        // --- Create toggle button ---
        const btn = document.createElement('button');
        btn.className   = 'a11y-btn';
        btn.id          = 'a11yToggle';
        btn.title       = 'Accessibility settings';
        btn.setAttribute('aria-label', 'Accessibility settings');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'a11yPanel');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
        </svg>`;

        // --- Create panel ---
        const panel = document.createElement('div');
        panel.className = 'a11y-panel';
        panel.id        = 'a11yPanel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Accessibility settings');
        panel.hidden = true;
        panel.innerHTML = `
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
                    <button class="a11y-toggle-btn" id="contrastToggle" role="switch"
                        aria-checked="${storedContrast === 'high'}"
                        data-key="contrast" data-on="high" data-off="normal">
                        <span class="a11y-toggle-track"><span class="a11y-toggle-thumb"></span></span>
                        <span class="a11y-toggle-label">${storedContrast === 'high' ? 'On' : 'Off'}</span>
                    </button>
                </div>
                <div class="a11y-row">
                    <div class="a11y-row-label">
                        <span class="a11y-row-title">Reduce Motion</span>
                        <span class="a11y-row-desc">Disables animations and transitions</span>
                    </div>
                    <button class="a11y-toggle-btn" id="motionToggle" role="switch"
                        aria-checked="${storedMotion === 'reduced'}"
                        data-key="motion" data-on="reduced" data-off="full">
                        <span class="a11y-toggle-track"><span class="a11y-toggle-thumb"></span></span>
                        <span class="a11y-toggle-label">${storedMotion === 'reduced' ? 'On' : 'Off'}</span>
                    </button>
                </div>
            </div>
        `;

        // --- Inject into header-actions ---
        const actions = document.querySelector('.header-actions');
        if (actions) {
            // Insert before the menu-toggle (last child)
            actions.insertBefore(btn, actions.lastElementChild);
            actions.insertBefore(panel, actions.lastElementChild);
        }

        // --- Toggle panel open/close ---
        function openPanel()  { panel.hidden = false; btn.setAttribute('aria-expanded', 'true');  btn.classList.add('active'); }
        function closePanel() { panel.hidden = true;  btn.setAttribute('aria-expanded', 'false'); btn.classList.remove('active'); }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.hidden ? openPanel() : closePanel();
        });
        panel.querySelector('.a11y-panel-close').addEventListener('click', closePanel);
        document.addEventListener('click', (e) => {
            if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) closePanel();
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

        // --- Toggle switches ---
        panel.querySelectorAll('.a11y-toggle-btn').forEach(toggle => {
            toggle.addEventListener('click', function () {
                const key    = this.dataset.key;
                const onVal  = this.dataset.on;
                const offVal = this.dataset.off;
                const isOn   = this.getAttribute('aria-checked') === 'true';
                const newVal = isOn ? offVal : onVal;

                localStorage.setItem(KEYS[key], newVal);
                this.setAttribute('aria-checked', String(!isOn));
                this.querySelector('.a11y-toggle-label').textContent = !isOn ? 'On' : 'Off';

                if (key === 'contrast') applyContrast(newVal);
                if (key === 'motion')   applyMotion(newVal);
            });
        });

        // --- Sync motion toggle if OS preference changes ---
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (!localStorage.getItem(KEYS.motion)) {
                const val = e.matches ? 'reduced' : 'full';
                applyMotion(val);
                const t = document.getElementById('motionToggle');
                if (t) {
                    t.setAttribute('aria-checked', String(e.matches));
                    t.querySelector('.a11y-toggle-label').textContent = e.matches ? 'On' : 'Off';
                }
            }
        });
    });
})();
