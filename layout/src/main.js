import { useDynamicAdapt } from './script/dynamicAdapt';

useDynamicAdapt();

// input mask
Inputmask({"mask": "+7 (999) 999-99-99"}).mask(document.querySelectorAll('[data-js-phone]'));

// swiper

const swiperProjects = new Swiper('.projects-swiper', {
    slidesPerView: 2.3,
    spaceBetween: 20,
    // Navigation arrows
    navigation: {
        nextEl: '.projects .button-slider__item--next',
        prevEl: '.projects .button-slider__item--prev',
    },
})

