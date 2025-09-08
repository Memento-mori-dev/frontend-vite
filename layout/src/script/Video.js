export default class Video {
    stateClasses = {
        isActive: 'is-active',
    }

    elementClasses = {
        element: '.video',
        img: 'img',
        content: 'video__content',
        video: 'video',
    }

    constructor() {
        this.videos = document.querySelectorAll(this.elementClasses.element);

        this.initOpen(this.videos);
    }

    initOpen(videos){
        videos.forEach(itemVideo => {
            const video = itemVideo.querySelector(this.elementClasses.video);

            this.open(itemVideo, video);
        });
    }

    open(element, video){
        element.onclick = () => {
            element.classList.add(this.stateClasses.isActive);
            video.play();

            this.close(video, element);

            element.onclick = null;
        }
        
    }

    close(video, element){
        video.addEventListener('pause', () => {
            element.classList.remove(this.stateClasses.isActive);

            this.open(element, video);
        })
    }
}