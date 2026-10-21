<?php
// ## Script
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('budoux-ja', get_stylesheet_directory_uri() . '/js/vendor/budoux-ja.js', array(), '0.7.0', true);
    wp_enqueue_script('phrase-wrap', get_stylesheet_directory_uri() . '/js/phrase-wrap.js', array('budoux-ja'), '1.0.0', true);
});
