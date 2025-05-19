import { useDynamicAdapt } from './script/dynamicAdapt';

useDynamicAdapt();


const swiper = new Swiper('.swiper-slider', {
  direction: 'horizontal',
  slidesPerView: "auto",
  spaceBetween: 70,
  initialSlide: 2,
});