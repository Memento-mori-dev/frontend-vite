import { useDynamicAdapt } from './script/dynamicAdapt';

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

    Fancybox.bind('[data-fancybox]', {
        //
    });
}