import { useDynamicAdapt } from './script/dynamicAdapt';
import { initSwiper } from './script/swiper';
import Video from './script/Video';
import { Inst } from './script/Inst';
import { AjaxNews } from './script/AjaxNews';

useDynamicAdapt();
initSwiper();


if (document.querySelector('.video')) {
    new Video();
}

if (document.querySelector('.swiper-inst')) {
    new Inst();
}

if (document.querySelector('.news__item--big')) {
    new AjaxNews('news', '.main__content-news');
}