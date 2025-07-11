<?
    $mainMenuArr = wp_get_nav_menu_items('header-menu');
    $mainCityArr = wp_get_nav_menu_items('city');


    $indexACF = 9;
    $mainACF = get_field('основа', $indexACF);
?>

<!doctype html>
<html lang="ru">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="<?=get_template_directory_uri()?>/assets/logo-DNESwDZ_.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <title>Drum Family</title> -->

    <script src="https://cdn.jsdelivr.net/npm/inputmask@5.0.6/dist/inputmask.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/InertiaPlugin.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <?php wp_head();?>
</head>

<body data-js-scroll>
    <header class="header opacity-top">
            <div class="header__container container">
                <div class="header__start">
                <a href="/" class="header__logo">
                    <img src="<?=get_template_directory_uri()?>/assets/logo-DNESwDZ_.svg" alt="Логотип" width="53" height="49">
                </a>

                <p class="header__text">
                    Школа барабанов для<br>
                    детей и взрослых Томске
                </p>
                </div>

                <div class="header__address">
                <ul class="list-address" data-da=".header__menu-address,1023.98,1">
                    <li>
                    <p class="list-address__name">Ваш город:</p>
                    <div class="header__city">
                        <button class="header__city-title">Томск 
                        <span>
                            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.35355 0.646447C4.15829 0.451184 3.84171 0.451184 3.64645 0.646447L0.464466 3.82843C0.269204 4.02369 0.269204 4.34027 0.464466 4.53553C0.659728 4.7308 0.976311 4.7308 1.17157 4.53553L4 1.70711L6.82843 4.53553C7.02369 4.7308 7.34027 4.7308 7.53553 4.53553C7.7308 4.34027 7.7308 4.02369 7.53553 3.82843L4.35355 0.646447ZM4 2H4.5V1H4H3.5V2H4Z" fill="white" />
                            </svg>
                        </span>
                        </button>

                        <div class="header__city-wrapper">
                        <div class="header__city-select">
                            <ul class="header__city-list">
                                <? foreach ($mainCityArr as $key => $value): ?>
                                    <li>
                                        <a href="<?=$value->url;?>"><?=$value->post_title;?></a>
                                    </li>
                                <? endforeach; ?>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </li>
                    <li>
                    <p class="list-address__name">Адрес школы:</p>
                    <p class="list-address__text"><?=$mainACF['адресс'];?></p>
                    </li>
                </ul>
                </div>

                <div class="header__call">
                <a href="tel:<?=$mainACF['номер_телефона']['ссылка'];?>" class="header__call-link" data-da=".header__menu-call,1023.98,1"><?=$mainACF['номер_телефона']['название'];?></a>
                </div>

                <div class="header__form">
                    <a href="https://t.me/vlad_shoky" class="button button--white button--48" target="_blank">
                        <span>Задать вопрос</span>
                        <span class="icon-right svg">
                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7571 0.0969889C10.9047 0.0348895 11.0662 0.0134718 11.2248 0.0349649C11.3834 0.0564579 11.5334 0.120076 11.6591 0.219198C11.7848 0.318319 11.8816 0.449321 11.9395 0.598567C11.9974 0.747813 12.0142 0.909848 11.9883 1.06781L10.6341 9.28153C10.5028 10.0738 9.63346 10.5282 8.90684 10.1335C8.29904 9.80336 7.39629 9.29467 6.58429 8.76388C6.17829 8.49819 4.93462 7.64738 5.08746 7.04197C5.21882 6.52432 7.30852 4.5791 8.50264 3.4226C8.97133 2.96824 8.75758 2.70613 8.20411 3.12407C6.82968 4.16176 4.62295 5.73978 3.89335 6.18399C3.24972 6.57566 2.91417 6.64254 2.51295 6.57566C1.78096 6.45387 1.1021 6.26519 0.548032 6.03533C-0.200678 5.72486 -0.164258 4.69553 0.547435 4.39581L10.7571 0.0969889Z" fill="#222222" />
                        </svg>
                        </span>
                    </a>
                </div>

                <div class="header__phone">
                <button class="button button--white button--menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                </div>
            </div>

            <div class="header__menu">
                <div class="header__menu-content">
                <div class="container">
                    <div class="header__menu-header">
                    <ul class="header__menu-list">
                        <? foreach ($mainMenuArr as $key => $value): ?>
                            <li><a href="<?=$value->url;?>"><?=$value->post_title;?></a></li>
                        <? endforeach; ?>
                    </ul>
                    </div>
                    <div class="header__menu-footer">
                    <div class="header__menu-call"></div>

                    <div class="header__menu-address">

                    </div>

                    <div class="header__menu-button">
                        <button class="button button--100 button--blue" data-js-modal-open="1">
                        <span>
                            Записаться на <span class="hero__button-span">пробный</span> урок!
                        </span>

                        <span class="icon-right">
                            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" width="29" height="29" rx="14.5" fill="#F8F8F8"></rect>
                            <path d="M10.505 18.005C10.2317 18.2784 10.2317 18.7216 10.505 18.995C10.7784 19.2683 11.2216 19.2683 11.495 18.995L10.505 18.005ZM19.7 10.5C19.7 10.1134 19.3866 9.8 19 9.8H12.7C12.3134 9.8 12 10.1134 12 10.5C12 10.8866 12.3134 11.2 12.7 11.2H18.3V16.8C18.3 17.1866 18.6134 17.5 19 17.5C19.3866 17.5 19.7 17.1866 19.7 16.8V10.5ZM11 18.5L11.495 18.995L19.495 10.995L19 10.5L18.505 10.005L10.505 18.005L11 18.5Z" fill="#12B0EA"></path>
                            </svg>
                        </span>
                    </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </header>
    <div class="wrapper">
        