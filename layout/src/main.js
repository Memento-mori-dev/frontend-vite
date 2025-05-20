import { useDynamicAdapt } from './script/dynamicAdapt';
import ControllerScroll from './script/controllerScroll';
import {OpenModal, CloseModal} from './script/controllerModal';

useDynamicAdapt();

let controllerScroll = new ControllerScroll();

new OpenModal(controllerScroll.stop.bind(controllerScroll));
new CloseModal(controllerScroll.play.bind(controllerScroll));


const swiper = new Swiper('.swiper-slider', {
  loop: true,
  speed: 2000,
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
      slidesPerView: 1.7,
      spaceBetween: 70,
    },
  }
});