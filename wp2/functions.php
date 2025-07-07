<?php

if (! function_exists('euroglass_setup')) {
    function euroglass_setup(){
        add_theme_support('title-tag');
    }
    add_action( 'after_setup_theme', 'euroglass_setup');
}


// правильный способ подключить стили и скрипты
add_action( 'wp_enqueue_scripts', 'theme_name_scripts' );

function theme_name_scripts() {
	wp_enqueue_style( 'main', get_stylesheet_uri() );
	wp_enqueue_style( 'style', get_template_directory_uri() . '/assets/style.css');
	wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/script.js', array(), null, true);
}



add_action( 'after_setup_theme', function(){
	register_nav_menus( [
		'header_menu' => 'Меню в шапке',
		'city' => 'Города',
	] );
} );

remove_filter( 'the_content', 'wpautop' ); // Отключаем автоформатирование 
