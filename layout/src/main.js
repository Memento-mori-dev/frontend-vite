import { useDynamicAdapt } from './script/dynamicAdapt';
import Video from './script/Video';

useDynamicAdapt();


if (document.querySelector('.video')) {
    new Video();
}