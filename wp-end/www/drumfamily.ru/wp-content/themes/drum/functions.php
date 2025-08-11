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


function mainUrl($url){
    $parsed = parse_url($url);

    // Разбиваем хост на части
    $host_parts = explode('.', $parsed['host']);
    if (count($host_parts) > 2) {
        // Удаляем первый элемент (поддомен)
        array_shift($host_parts);
    }
    $new_host = implode('.', $host_parts);

    // Собираем URL обратно
    $new_url = $parsed['scheme'] . '://' . $new_host . $parsed['path'];
    return $new_url;
}


add_filter('robots_txt', function($output, $public) {
    // Единый Sitemap для всех
    $global_sitemap = 'https://' . strtolower($_SERVER['HTTP_HOST']) . '/sitemap_index.xml';

    // Единые правила Disallow
    $disallow = [
        '/wp-admin/',
        '/politics/',
        '/thank/',
    ];

    // Парсим существующий robots.txt, чтобы убрать старые User-agent: * блоки
    $lines = explode("\n", $output);
    $filtered_lines = [];
    $skip_block = false;
    foreach ($lines as $line) {
        if (preg_match('/^User-agent:\s*\*/i', $line)) {
            $skip_block = true; // Начинаем пропускать старый блок
            continue;
        }
        if ($skip_block) {
            if (trim($line) === '') {
                $skip_block = false; // Конец блока
            }
            continue; // Пропускаем строки внутри блока User-agent: *
        }
        $filtered_lines[] = $line;
    }

    // Добавляем наш объединённый блок User-agent: *
    $filtered_lines[] = 'User-agent: *';
    foreach ($disallow as $path) {
        $filtered_lines[] = "Disallow: $path";
    }
    $filtered_lines[] = 'Sitemap: ' . $global_sitemap;

    return implode("\n", array_filter($filtered_lines)) . "\n";
}, 10, 2);

add_filter('wpseo_enable_xml_sitemap', function () {
    if (function_exists('pll_get_the_languages')) {
        $languages = pll_get_the_languages(['hide_empty' => 0]);
        $domains = [];

        foreach ($languages as $lang) {
            $parsed = parse_url($lang['url']);
            if (!empty($parsed['host'])) {
                $domains[] = $parsed['host'];
            }
        }

        $allowed_domains = array_merge($domains, ['drumfamily.ru', 'tve.drumfamily.ru']);
        if (in_array($_SERVER['HTTP_HOST'], $allowed_domains, true)) {
            return true;
        }
    }

    if (in_array($_SERVER['HTTP_HOST'], ['drumfamily.ru', 'tve.drumfamily.ru'], true)) {
        return true;
    }

    return false;
});

add_filter('wpseo_sitemaps_base_url', function ($url) {
    return '/';
});

add_filter('wpseo_xml_sitemap_post_url', function ($url) {
    return preg_replace('/^https?:\/\/[^\/]+/i', 'https://' . $_SERVER['HTTP_HOST'], $url);
});

add_filter('wpseo_xml_sitemap_tax_url', function ($url) {
    return preg_replace('/^https?:\/\/[^\/]+/i', 'https://' . $_SERVER['HTTP_HOST'], $url);
});

function get_translated_page_content($page_id, $page_slug = '') {
    // Проверка активации Polylang
    if (!function_exists('pll_get_post')) {
        $page = get_post($page_id);
        return ($page && $page->post_name === $page_slug) 
            ? apply_filters('the_content', $page->post_content) 
            : '';
    }

    // Получаем ID перевода для текущего языка
    $translated_id = pll_get_post($page_id);
    
    // Если перевод отсутствует
    if (!$translated_id) {
        $original_page = get_post($page_id);
        return ($original_page && $original_page->post_name === $page_slug) 
            ? apply_filters('the_content', $original_page->post_content) 
            : '';
    }

    $translated_page = get_post($translated_id);

    // Проверка соответствия слага
    if ($page_slug && $translated_page->post_name !== $page_slug) {
        return '';
    }

    return apply_filters('the_content', $translated_page->post_content);
}

function isSameDomain(string $url1, string $url2): bool {
    // Парсим хосты из URL
    $host1 = parse_url($url1, PHP_URL_HOST);
    $host2 = parse_url($url2, PHP_URL_HOST);

    // Приводим хосты к нижнему регистру для корректного сравнения
    $host1 = strtolower($host1);
    $host2 = strtolower($host2);

    return $host1 === $host2;
}

function getCurrentUrl(): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $uri  = $_SERVER['REQUEST_URI'];

    return $scheme . "://" . $host . $uri;
}