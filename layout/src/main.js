import { useDynamicAdapt } from './script/dynamicAdapt';

useDynamicAdapt();


const swiper = new Swiper('.swiper-slider', {
  direction: 'horizontal',
  slidesPerView: "auto",
  spaceBetween: 70,
  breakpoints: {
    0:{
      slidesPerView: 1.2,
      spaceBetween: 30,
    },
    1024:{
      slidesPerView: "auto",
      spaceBetween: 70,
    },
  }
});