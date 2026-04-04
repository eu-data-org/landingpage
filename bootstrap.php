<?php
/**
 * Bootstrap — defines paths and shared config.
 * Include this at the top of every entry point.
 */

define('ROOT', dirname(__FILE__));
define('COMPONENTS', ROOT . '/components');
define('SECTIONS',   COMPONENTS . '/sections');

$config = [
    'site_name'    => 'EU-Data.org',
    'site_title'   => 'EU-Data.org — European Digital Sovereignty',
    'description'  => 'Defending Europe\'s digital sovereignty. Building GDPR-compliant alternatives to foreign tech giants.',
    'theme_color'  => '#003399',
    'base_url'     => '',   // set to '' for root-relative paths
];
