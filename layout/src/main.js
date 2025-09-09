import { useDynamicAdapt } from './script/dynamicAdapt';
import { initSwiper } from './script/swiper';
import Video from './script/Video';
import { Inst } from './script/Inst';

useDynamicAdapt();
initSwiper();


if (document.querySelector('.video')) {
    new Video();
}

if (document.querySelector('.swiper-inst')) {
    new Inst();
}