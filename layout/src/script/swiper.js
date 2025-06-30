// watch

const arrSwiperWatch = document.querySelectorAll('.watch__item'),
        objSwiperWatch = {};



arrSwiperWatch.forEach((swiper, index) => {
    const swiperClass = `.watch__item-${index}`;

    objSwiperWatch[`swiper-${index}`] = new Swiper(swiperClass, {
        slidesPerView: 2,
        spaceBetween: 70,
        slidesPerView: 'auto',
        freeMode: true,
        navigation: {
            nextEl: '.button-slider__item--next',
            prevEl: '.button-slider__item--prev',
        },
         breakpoints: {
            1: {
                slidesPerView: 1,
                spaceBetween: 36,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 70,
            }
         }
    });  
})


// teachers

const swiperTeachers = new Swiper('.teachers', {
    slidesPerView: 2.72,
    spaceBetween: 80,
    initialSlide: 2,
    // Navigation arrows
    navigation: {
        nextEl: '.button-slider__item--next',
        prevEl: '.button-slider__item--prev',
    },
})


// concert
const fddsf = new Swiper('.concert', {
    slidesPerView: 3,
    spaceBetween: 70,
    initialSlide: 1,
    // Navigation arrows
    navigation: {
        nextEl: '.button-slider__item--next',
        prevEl: '.button-slider__item--prev',
    },
})