<?php
/**
 * PHP built-in server router.
 * Usage: php -S localhost:8000 router.php
 *
 * Serves real files (assets, webmanifest, etc.) directly.
 * Everything else goes through public/index.php.
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve existing files from project root (assets/, site.webmanifest, etc.)
$file = __DIR__ . $uri;
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false; // let PHP serve it natively
}

// Route everything else through the front controller
require __DIR__ . '/public/index.php';
