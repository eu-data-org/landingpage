# EU-Data.org

A static website advocating for European digital sovereignty — monitoring foreign control of EU data infrastructure, promoting GDPR-compliant alternatives, and educating citizens.

**Live:** [eu-data.org](https://eu-data.org) · **Founded by:** [Fabian Ternis](https://fabian.ternis.eu/) via [EuropeHost.eu](https://europehost.eu/) / [XPSystems.eu](https://xpsystems.eu/)

---

## Project Structure

```
eu-data.org/
├── index.html              # Main page
├── site.webmanifest        # PWA manifest
├── assets/
│   ├── css/
│   │   ├── base.css        # Reset, design tokens (light + dark), body
│   │   ├── layout.css      # Header, nav, hero, sections, footer
│   │   ├── components.css  # Buttons, badges, flags, theme switcher, cards
│   │   ├── sections.css    # Per-section styles (mission, timeline, services…)
│   │   └── responsive.css  # Breakpoints
│   ├── js/
│   │   ├── svgs.js         # SVG icon library + renderIcons() helper
│   │   ├── theme.js        # 3-way theme switcher (light / dark / system)
│   │   ├── ui.js           # Mobile menu, tabs, FAQ accordion, newsletter form
│   │   └── animations.js   # Stat counters, fade-in on scroll
│   └── img/
│       ├── icon.svg        # Site logo
│       ├── flags/          # EU country flag PNGs (ISO 3166-1 alpha-2 names)
│       └── favicon*        # Favicon set
```

## Features

- Pure HTML/CSS/JS — no build step, no framework
- Dark / Light / System theme with localStorage persistence
- SVG icon library (`svgs.js`) — no external icon font dependency
- EU flag images for all 17 represented member states
- Responsive down to 320 px
- Smooth scroll, FAQ accordion, service tabs, stat counter animations
- PWA manifest + full favicon set

## Theme System

The 3-way switcher (`light` / `dark` / `system`) is built in `theme.js`. It:

- Defaults to `system` (follows `prefers-color-scheme`)
- Persists the user's choice in `localStorage` under key `eu-theme`
- Reacts to OS-level changes in real time when set to `system`
- Renders into any `[data-theme-switcher]` element — both nav and footer are synced automatically

## Development

No build tools required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## License

See [LICENSE](LICENSE).
