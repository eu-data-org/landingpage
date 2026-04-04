<?php
/**
 * Bootstrap — defines paths, shared config, and routing.
 */

define('ROOT',       dirname(__FILE__));
define('COMPONENTS', ROOT . '/components');
define('SECTIONS',   COMPONENTS . '/sections');
define('PAGES',      COMPONENTS . '/pages');

// ---------- Site-wide defaults ----------

$config = [
    'site_name'    => 'EU-Data.org',
    'site_title'   => 'EU-Data.org — European Digital Sovereignty',
    'description'  => 'Defending Europe\'s digital sovereignty. Building GDPR-compliant alternatives to foreign tech giants. No backdoors. No foreign access.',
    'keywords'     => 'European digital sovereignty, GDPR, data privacy, EU cloud, European alternatives, digital independence, data protection, EU tech',
    'theme_color'  => '#003399',
    'base_url'     => 'https://eu-data.org',
    'og_image'     => '/assets/img/android-chrome-512x512.png',
    'og_type'      => 'website',
    'twitter_card' => 'summary_large_image',
    'locale'       => 'en_GB',
    'robots'       => 'index, follow',
    'canonical'    => null,   // set per-page to override
];

// ---------- Per-page meta overrides ----------

$page_meta = [
    '/' => [
        'canonical' => '/',
        'keywords'  => 'European digital sovereignty, GDPR compliance, EU data protection, digital independence, European cloud alternatives, US CLOUD Act, Palantir Europe, NSA surveillance, EU tech alternatives',
    ],
    '/imprint' => [
        'site_title'  => 'Imprint — EU-Data.org',
        'description' => 'Legal information and contact details for EU-Data.org, a digital sovereignty project by Fabian Ternis.',
        'keywords'    => 'imprint, legal notice, EU-Data.org, Fabian Ternis, XPSystems',
        'robots'      => 'noindex, follow',
        'canonical'   => '/imprint',
    ],
    '/privacy' => [
        'site_title'  => 'Privacy Policy — EU-Data.org',
        'description' => 'EU-Data.org privacy policy. We use no cookies, no trackers, and share no data with third parties.',
        'keywords'    => 'privacy policy, no cookies, no tracking, GDPR, data protection, EU-Data.org',
        'robots'      => 'noindex, follow',
        'canonical'   => '/privacy',
    ],
    '/terms' => [
        'site_title'  => 'Terms of Service — EU-Data.org',
        'description' => 'Terms of service for EU-Data.org.',
        'keywords'    => 'terms of service, terms and conditions, EU-Data.org',
        'robots'      => 'noindex, follow',
        'canonical'   => '/terms',
    ],
    '/about' => [
        'site_title'  => 'About — EU-Data.org',
        'description' => 'About EU-Data.org — a grassroots initiative defending European digital sovereignty, built by Fabian Ternis.',
        'keywords'    => 'about EU-Data.org, Fabian Ternis, XPSystems, European digital sovereignty project, EuropeHost',
        'canonical'   => '/about',
    ],
    '/alternatives' => [
        'site_title'  => 'European Alternatives Directory — EU-Data.org',
        'description' => 'A curated directory of GDPR-compliant, European-owned alternatives to US tech giants — email, cloud, search, messaging, hosting and more.',
        'keywords'    => 'European alternatives, GDPR compliant services, EU email, EU cloud storage, European search engine, EU hosting, no US CLOUD Act',
        'canonical'   => '/alternatives',
    ],
    '/blog' => [
        'site_title'  => 'Blog — EU-Data.org',
        'description' => 'In-depth articles on European digital sovereignty, data law, GDPR, and tech alternatives.',
        'keywords'    => 'EU data sovereignty blog, GDPR analysis, digital independence articles, European tech news',
        'canonical'   => '/blog',
    ],
    '/contact' => [
        'site_title'  => 'Contact — EU-Data.org',
        'description' => 'Contact EU-Data.org — suggest alternatives, report sovereignty cases, or get in touch.',
        'keywords'    => 'contact EU-Data.org, get in touch, suggest alternative, report case',
        'canonical'   => '/contact',
    ],
];

// ---------- Router ----------

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH));
$uri = rtrim($uri, '/') ?: '/';

// Merge per-page overrides into $config
if (isset($page_meta[$uri])) {
    $config = array_merge($config, $page_meta[$uri]);
}

$routes = [
    '/'             => null,
    '/imprint'      => PAGES . '/imprint.php',
    '/privacy'      => PAGES . '/privacy.php',
    '/terms'        => PAGES . '/terms.php',
    '/about'        => PAGES . '/about.php',
    '/alternatives' => PAGES . '/alternatives.php',
    '/blog'         => PAGES . '/blog.php',
    '/contact'      => PAGES . '/contact.php',
];

/**
 * Render a full page using a page component.
 * Exits after output.
 */
function render_page(string $component, array $config, int $status = 200): void
{
    http_response_code($status);
    ?>
<!DOCTYPE html>
<html lang="en">
<?php require COMPONENTS . '/head.php'; ?>
<body>
<?php require COMPONENTS . '/header.php'; ?>
<?php require $component; ?>
<?php require COMPONENTS . '/footer.php'; ?>
<?php require COMPONENTS . '/cookie-banner.php'; ?>
<script src="/assets/js/svgs.js"></script>
<script src="/assets/js/theme.js"></script>
<script src="/assets/js/accessibility.js"></script>
<script src="/assets/js/ui.js"></script>
<script src="/assets/js/animations.js"></script>
</body>
</html>
<?php
    exit;
}

// Dispatch non-root routes here so public/index.php only handles '/'
if ($uri !== '/') {
    if (isset($routes[$uri])) {
        render_page($routes[$uri], $config);
    }

    // Unknown route → 404
    render_page(PAGES . '/404.php', $config, 404);
}
