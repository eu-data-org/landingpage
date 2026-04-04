# EU-Data.org

Defending European digital sovereignty — monitoring foreign control of EU data infrastructure, promoting GDPR-compliant alternatives, and educating citizens.

**Live:** [eu-data.org](https://eu-data.org) · **Branch:** `dev` → `main`  
**Founded by:** [Fabian Ternis](https://fabian.ternis.eu/) · [XPSystems](https://xpsystems.eu/) · [EuropeHost.eu](https://europehost.eu/)  
**Code:** [Codeberg](https://codeberg.org/eu-data-org/) · [GitHub](https://github.com/eu-data-org)

---

## Stack

- **PHP** (no framework) — component-based includes, simple file router
- **Vanilla CSS** — design tokens, dark/light/system theme, high-contrast mode
- **Vanilla JS** — no build step, no bundler, no dependencies
- **PHP built-in server** for local dev via `router.php`

---

## Project Structure

```
eu-data.org/
├── bootstrap.php               # Paths, $config, per-page meta, router/dispatcher
├── router.php                  # PHP built-in server router (serves public/ as webroot)
├── index.html                  # Legacy static file (kept for reference)
│
├── public/                     # Webroot — point your server here
│   ├── index.php               # Front controller (home page)
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── assets/
│       ├── css/
│       │   ├── base.css        # Reset, design tokens (light/dark), typography
│       │   ├── layout.css      # Header, nav, hero, sections, footer
│       │   ├── components.css  # Buttons, badges, flags, theme switcher, cards
│       │   ├── sections.css    # Per-section + per-page styles
│       │   ├── responsive.css  # Breakpoints
│       │   └── accessibility.css  # High contrast, reduce motion, a11y panel
│       ├── js/
│       │   ├── svgs.js         # SVG icon library + renderIcons()
│       │   ├── theme.js        # 3-way theme switcher (light / dark / system)
│       │   ├── accessibility.js  # High contrast + reduce motion panel
│       │   ├── ui.js           # Mobile menu, tabs, FAQ accordion, forms
│       │   └── animations.js   # Stat counters, fade-in on scroll
│       └── img/
│           ├── icon.svg
│           ├── flags/          # EU country flag PNGs
│           └── favicon*
│
├── components/                 # PHP partials — outside webroot
│   ├── head.php                # <head> — meta, OG, Twitter card, favicons, CSS
│   ├── header.php              # Site header + nav
│   ├── footer.php              # Site footer
│   ├── cookie-banner.php       # GDPR cookie notice (no cookies used)
│   ├── pages/                  # Full-page components (one per route)
│   │   ├── 404.php
│   │   ├── about.php
│   │   ├── alternatives.php
│   │   ├── blog.php
│   │   ├── contact.php
│   │   ├── imprint.php
│   │   ├── privacy.php
│   │   └── terms.php
│   └── sections/               # Homepage section components
│       ├── hero.php
│       ├── mission.php
│       ├── timeline.php
│       ├── services.php
│       ├── threats.php
│       ├── cases.php
│       ├── apps.php
│       ├── diday.php           # Digital Independence Day section
│       ├── faq.php
│       ├── initiative.php
│       └── contact.php
```

---

## Routes

| URL | Component | Indexed |
|-----|-----------|---------|
| `/` | `public/index.php` + all sections | ✅ |
| `/about` | `pages/about.php` | ✅ |
| `/alternatives` | `pages/alternatives.php` | ✅ |
| `/blog` | `pages/blog.php` | ✅ |
| `/contact` | `pages/contact.php` | ✅ |
| `/imprint` | `pages/imprint.php` | noindex |
| `/privacy` | `pages/privacy.php` | noindex |
| `/terms` | `pages/terms.php` | noindex |
| `*` | `pages/404.php` (HTTP 404) | — |

---

## Local Development

```bash
# PHP built-in server — router.php serves public/ as webroot
php -S localhost:8000 router.php
```

Then open [http://localhost:8000](http://localhost:8000).

> **Note:** `router.php` serves real files from `public/` directly (assets, webmanifest, robots.txt, sitemap.xml) and routes everything else through `public/index.php` → `bootstrap.php`.

For Apache/nginx in production, set the document root to `public/` — no router script needed.

---

## Features

- **PHP component system** — header, footer, head, cookie banner shared across all pages
- **Simple router** — `bootstrap.php` maps URIs to page components, merges per-page meta
- **3-way theme** — light / dark / system, persisted in `localStorage`
- **Accessibility panel** — high contrast mode + reduce motion toggle, floating side tab on desktop, header button on mobile; preferences persisted in `localStorage`, respects `prefers-reduced-motion`
- **Full SEO meta** — `<title>`, description, keywords, canonical, Open Graph, Twitter card — all per-page configurable via `$page_meta` in `bootstrap.php`
- **Cookie banner** — GDPR-compliant notice stating no cookies are used; dismissed per-session via `sessionStorage`
- **No cookies, no tracking, no analytics**
- **robots.txt + sitemap.xml** — auto-excludes legal pages, lists all public routes
- **Responsive** — mobile-first, works down to 320 px
- **Fade-in animations** — IntersectionObserver-based, disabled when reduce motion is active
- **SVG icon library** — no external icon font, no CDN dependency

---

## Adding a New Page

1. Create `components/pages/yourpage.php`
2. Add the route to `$routes` in `bootstrap.php`:
   ```php
   '/yourpage' => PAGES . '/yourpage.php',
   ```
3. Add per-page meta to `$page_meta`:
   ```php
   '/yourpage' => [
       'site_title'  => 'Your Page — EU-Data.org',
       'description' => '...',
       'keywords'    => '...',
       'canonical'   => '/yourpage',
   ],
   ```
4. Add to `public/sitemap.xml` if it should be indexed.

---

## Adding a New Homepage Section

1. Create `components/sections/yoursection.php`
2. Add `<?php require SECTIONS . '/yoursection.php'; ?>` in `public/index.php`
3. Add a nav link in `components/header.php`
4. Add section styles to `public/assets/css/sections.css`
5. Add the fade-in selector to `FADE_SELECTOR` in `public/assets/js/animations.js` if needed

---

## Theme System

`theme.js` builds a 3-button switcher into any `[data-theme-switcher]` element. It:

- Defaults to `system` (follows `prefers-color-scheme`)
- Persists under `localStorage` key `eu-theme`
- Reacts to OS changes in real time when set to `system`
- Both header and footer switchers stay in sync automatically

---

## Accessibility

`accessibility.js` + `accessibility.css` provide:

- **High Contrast** — overrides CSS tokens for stronger contrast in both light and dark mode
- **Reduce Motion** — sets all `transition-duration` and `animation-duration` to `0.01ms`, forces `.fade-in` elements visible
- **Floating tab** (desktop ≥769px) — fixed to the right edge, slides out on hover, opens panel on click
- **Header button** (mobile ≤768px) — opens a dropdown panel in the header
- **Footer link** — opens whichever panel is appropriate for the current viewport
- Preferences stored under `eu-contrast` and `eu-motion` in `localStorage`

---

## License

See [LICENSE](LICENSE).
