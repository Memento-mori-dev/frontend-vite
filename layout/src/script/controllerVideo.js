export default class ControllerVideo{
    stateClasses = {
        isActive: 'is-active',
    }

    constructor(mainClass, videoClass){
        this.items = document.querySelectorAll(mainClass);

        this.items.forEach(item => {
            const video = item.querySelector(videoClass);

            item.onclick = () => {
                item.classList.add(this.stateClasses.isActive);

                setTimeout(() => {
                    this.open(video, item);
                }, 0);
            }
        })
    }

    open(video, item){
        video.requestFullscreen();
        
        this.close(video, item);
    }

    close(video, item){
        video.addEventListener('fullscreenchange', function(e) {
            if (!document.fullscreenElement) {
                item.classList.remove('is-active');
            }
        });
    }
}