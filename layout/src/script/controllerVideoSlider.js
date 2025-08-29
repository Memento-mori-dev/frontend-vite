export default class VideoSlider{
    stateClasses = {
        isActive: 'is-active',
    }

    constructor(){
        this.main = document.querySelector('.watch__item--video');
        this.blocks = this.main.querySelectorAll('.watch__block');

        this.initOpen();
    }
    
    initOpen(){
        this.blocks.forEach(block => {
            this.open(block);
        })
    }

    open(block){
        block.onclick = () => {
            const blockVideo = block.querySelector('.watch__block-video'),
                    video = block.querySelector('video');

            blockVideo.classList.add(this.stateClasses.isActive);
            video.setAttribute('controls', '');
            video.play();

            this.close(video, blockVideo);
        }
    }

    close(video, blockVideo){
        video.addEventListener('pause', () => {
            video.removeAttribute('controls');

            blockVideo.classList.remove(this.stateClasses.isActive);
        });
    }
}