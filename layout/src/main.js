import { useDynamicAdapt } from './script/dynamicAdapt';
import { scrollToTop } from './script/function';
import dynamicPros from './script/dynamicPros';
import menu from './script/menu';
import stopScroll from './script/stopScroll';
import Video from './script/video';

useDynamicAdapt();

const stopScrollSite = new stopScroll();
const menuSite = new menu(stopScrollSite.action.bind(stopScrollSite));

new Video();


// input mask
Inputmask({"mask": "+7 (999) 999-99-99"}).mask(document.querySelectorAll('[data-js-phone]'));

// swiper

if(document.querySelector('.projects')){
    const swiperProjects = new Swiper('.projects-swiper', {
        slidesPerView: 2.3,
        spaceBetween: 20,
        // Navigation arrows
        navigation: {
            nextEl: '.projects .button-slider__item--next',
            prevEl: '.projects .button-slider__item--prev',
        },
    })
}

if (document.querySelector('.trust__companies')) {
    const swiperCompanies = new Swiper('.companies-swiper', {
        slidesPerView: 4.76,
        spaceBetween: 12,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true
    })
}

if (document.querySelector('.trust__documents')) {
    const swiperDocuments = new Swiper('.documents-swiper', {
        slidesPerView: 3.67,
        spaceBetween: 12,

        navigation: {
            nextEl: '.trust__documents .button-slider__item--next',
            prevEl: '.trust__documents .button-slider__item--prev',
        },
    })
}

if (document.querySelector('.casetyp__slider')) {
    const swiperCasetyp = new Swiper('.casetyp-swiper', {
        slidesPerView: 2.19,
        spaceBetween: 20,

        navigation: {
            nextEl: '.casetyp__slider .swiper-button-next',
            prevEl: '.casetyp__slider .swiper-button-prev',
        },
    })
}

// swiper

// Fancybox

if (document.querySelector('.trust__documents') || document.querySelector('.reviews') || document.querySelector('.casetyp__slider')) {
    Fancybox.bind('[data-fancybox]', {
        //
    });
}

// Fancybox

if (document.querySelector('[data-js-btn-up]')) {
    const btn = document.querySelector('[data-js-btn-up]');
    btn.addEventListener('click', scrollToTop);
}


// интерактивные элементы
if (document.querySelector('.input')) {
    document.addEventListener("DOMContentLoaded", () => {
        const labels = document.querySelectorAll('label.input');

        labels.forEach(label => {
            const input = label.querySelector('input');

            // При клике на label добавляем класс is-hover
            label.addEventListener('click', () => {
            label.classList.add('is-hover');
            input.focus();
            });

            // Следим за вводом текста
            input.addEventListener('input', () => {
            if (input.value.trim().length > 0) {
                label.classList.add('is-active');
            } else {
                label.classList.remove('is-active');
            }
            });

            // При потере фокуса убираем is-hover
            input.addEventListener('blur', () => {
            label.classList.remove('is-hover');
            });
        });
    });
}

if (document.querySelector('.pros__items')) {
    new dynamicPros('.pros__item--two', '.pros__link', '', '.pros__wrapper', '.pros__description', true);

    new dynamicPros('.pros__item--single', '.pros__link', '', '.pros__wrapper', '.pros__description');
}

if (document.querySelector('.graphics__map')) {
    new dynamicPros('.graphics__map', '.graphics__map-item', '.graphics__map-item-hover')
}

if (document.querySelector('.products__content')) {
    new dynamicPros('.products__content', '.products__item', '', '.products__item-wrapper', '.products__item-text');
}

if (document.querySelector('.industries__content')) {
    new dynamicPros('.industries__content', '.industries__item', '', '.industries__item-wrapper', '.industries__item-tags');
}


// menu

// const menuTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

// menuTimeline.from(".menu__blue", {
//     y: -1000,
//     duration: 1.5
// });

// menuTimeline.from(".menu__content", {
//     y: -1000,
//     duration: 1.5
// }, "-=1.4");

// menuTimeline.play();
// // menuTimeline.reverse();

// для раздных страниц

// для главной

if (document.querySelector('.hero')) {
    const header = document.querySelector('.header'),
            pros = document.querySelector('.pros'),
            topPros = pros.offsetTop / 2;

    ScrollTrigger.create({
    start: `${topPros}px top`,
    onEnter: () => {
        // Сначала скрываем header вверх
        gsap.to(header, {
        y: -100,   // уезжает вверх
        duration: 0.3,
        onComplete: () => {
            // Добавляем класс
            header.classList.add("header--next", "header--shadow");
            header.classList.remove("header--open");
            gsap.fromTo(header, 
            { y: -100 }, 
            { y: 0, duration: 1, ease: "power2.out" }
            );
        }
        });
    },
    onLeaveBack: () => {
        gsap.to(header, {
        y: -100,
        duration: 0.3,
        onComplete: () => {
            header.classList.remove("header--next", "header--shadow");
            gsap.fromTo(header, 
            { y: -100 }, 
            { y: 0, duration: 1, ease: "power2.out" }
            );
        }
        });
    }
    });
}else{
    const header = document.querySelector('.header');

    ScrollTrigger.create({
        start: "10px top",
        onEnter: () => header.classList.add("header--shadow"),
        onLeaveBack: () => header.classList.remove("header--shadow")
    });
}


// document.querySelectorAll('a').forEach(link => {
//   if (!link.getAttribute('href') || link.getAttribute('href') === '#' || link.getAttribute('href') === '.') {
//     link.addEventListener('click', function(e) {
//       e.preventDefault();
//       console.log('Пустая ссылка нажата, переход отменен');
//     });
//   }
// });
