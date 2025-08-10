import { useDynamicAdapt } from './script/dynamicAdapt';
import { scrollToTop } from './script/function';
import dynamicPros from './script/dynamicPros';

useDynamicAdapt();

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

if (document.querySelector('.trust__documents') || document.querySelector('.reviews')) {
    Fancybox.bind('[data-fancybox]', {
        //
    });
}

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
