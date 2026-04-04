<?php
/**
 * PHP built-in server router.
 * Usage: php -S localhost:8000 router.php
 *
 * Webroot is public/ — assets, webmanifest, favicons all live there.
 * PHP files (bootstrap, components) stay outside public/ for security.
 */

$uri  = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$file = __DIR__ . '/public' . $uri;

// Serve existing static files from public/ directly
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false; // PHP built-in server serves it natively
}

// Everything else → front controller
require __DIR__ . '/public/index.php';
