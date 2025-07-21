export default class ControllerVideo{
    stateClasses = {
        isActive: 'is-active',
        isOpen: 'is-open',
        isShow: 'is-show'
    }

    constructor(btnPlay){
        this.modal = document.querySelector('[data-js-modal]');
        this.videoModal = document.querySelector('[data-js-video]');
        this.video = this.videoModal.querySelector('video');

        this.init(btnPlay);
    }

    init(arrayBtn){
        let arrBtn = document.querySelectorAll(arrayBtn);

        arrBtn.forEach(btn => {
            btn.onclick = () => {
                if(!btn.classList.contains(this.stateClasses.isActive)){
                    this.open(btn);
                }else{
                    console.log(2);
                }
            }
        })
    }

    open(btn){
        btn.classList.add(this.stateClasses.isActive);

        const url = btn.dataset.jsVideoUrl;
        this.video.src = url;
        
        this.modal.classList.add(this.stateClasses.isOpen);
        this.videoModal.classList.add(this.stateClasses.isShow);
        this.video.play();

        this.observer(btn);
    }

    close(btn, observer){
        btn.classList.remove(this.stateClasses.isActive);

        this.video.pause();
        this.video.src = '';

        observer.disconnect();
    }

    observer(btn){
        const config = {
            attributes: true, 
            attributeFilter: ["class"],
        };

        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    this.close(btn, observer);
                }
            });
        });

        observer.observe(this.modal, config);
    }
}