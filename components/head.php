<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary Meta -->
    <title><?= htmlspecialchars($config['site_title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($config['description']) ?>">
    <meta name="robots" content="<?= htmlspecialchars($config['robots']) ?>">
    <meta name="author" content="Fabian Ternis / EU-Data.org">
    <meta name="generator" content="PHP">

    <!-- Canonical -->
<?php if (!empty($config['canonical'])): ?>
    <link rel="canonical" href="<?= htmlspecialchars($config['base_url'] . $config['canonical']) ?>">
<?php endif; ?>

    <!-- Open Graph -->
    <meta property="og:type"        content="<?= htmlspecialchars($config['og_type']) ?>">
    <meta property="og:site_name"   content="<?= htmlspecialchars($config['site_name']) ?>">
    <meta property="og:title"       content="<?= htmlspecialchars($config['site_title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($config['description']) ?>">
    <meta property="og:url"         content="<?= htmlspecialchars($config['base_url'] . ($config['canonical'] ?? '/')) ?>">
    <meta property="og:image"       content="<?= htmlspecialchars($config['base_url'] . $config['og_image']) ?>">
    <meta property="og:image:width"  content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:locale"      content="<?= htmlspecialchars($config['locale']) ?>">

    <!-- Twitter / X Card -->
    <meta name="twitter:card"        content="<?= htmlspecialchars($config['twitter_card']) ?>">
    <meta name="twitter:title"       content="<?= htmlspecialchars($config['site_title']) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($config['description']) ?>">
    <meta name="twitter:image"       content="<?= htmlspecialchars($config['base_url'] . $config['og_image']) ?>">

    <!-- Favicons & Manifest -->
    <link rel="shortcut icon"  href="/assets/img/favicon.ico">
    <link rel="icon" type="image/x-icon" href="/assets/img/favicon.ico">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png">
    <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="<?= htmlspecialchars($config['theme_color']) ?>">

    <!-- Styles -->
    <link rel="stylesheet" href="/assets/css/base.css">
    <link rel="stylesheet" href="/assets/css/layout.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    <link rel="stylesheet" href="/assets/css/sections.css">
    <link rel="stylesheet" href="/assets/css/responsive.css">
</head>
