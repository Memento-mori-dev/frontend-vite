<?php

// if (! function_exists('euroglass_setup')) {
//     function euroglass_setup(){
//         add_theme_support('title-tag');
//     }
//     add_action( 'after_setup_theme', 'euroglass_setup');
// }


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


/**
 * Получает ACF поле с учетом языка (Polylang)
 *
 * @param string $field    Имя ACF поля
 * @param string $lang     Код языка ('en', 'fr', 'ru' и т.д.)
 * @param int|null $post_id ID поста (если null — берем текущий)
 * @return mixed           Значение ACF поля или null
 */
function get_acf_field_lang( $field, $lang, $post_id = null ) {
    if ( ! function_exists('pll_get_post') || ! function_exists('get_field') ) {
        return null; // Polylang или ACF не подключены
    }

    // Если ID поста не передан — берем текущий
    if ( ! $post_id ) {
        $post_id = get_queried_object_id();
    }

    // Получаем ID перевода для нужного языка
    $translated_id = pll_get_post( $post_id, $lang );

    if ( ! $translated_id ) {
        return null; // Перевод не найден
    }

    // Получаем значение ACF поля для переведенного поста
    return get_field( $field, $translated_id );
}