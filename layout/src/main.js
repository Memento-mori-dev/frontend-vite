import { useDynamicAdapt } from './script/dynamicAdapt';
import ControllerScroll from './script/controllerScroll';
import {OpenModal, CloseModal} from './script/controllerModal';

useDynamicAdapt();

let controllerScroll = new ControllerScroll();

new OpenModal(controllerScroll.stop.bind(controllerScroll));
new CloseModal(controllerScroll.play.bind(controllerScroll));

// swiper
const swiper = new Swiper('.swiper-slider', {
  direction: 'horizontal',
  slidesPerView: "auto",
  spaceBetween: 70,
  speed: 2000,
  loop: true,
  autoplay: {
    delay: 0,
    // disableOnInteraction: false 
  },
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