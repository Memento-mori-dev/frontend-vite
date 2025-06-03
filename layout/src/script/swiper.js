// watch

const arrSwiperWatch = document.querySelectorAll('.watch__item'),
        objSwiperWatch = {};



arrSwiperWatch.forEach((swiper, index) => {
    const swiperClass = `.watch__item-${index}`;

    objSwiperWatch[`swiper-${index}`] = new Swiper(swiperClass, {
        slidesPerView: 2,
        spaceBetween: 70,
        // Navigation arrows
        navigation: {
            nextEl: '.button-slider__item--next',
            prevEl: '.button-slider__item--prev',
        },
    });
    
})