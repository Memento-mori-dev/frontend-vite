export class Inst{
    stateClasses = {
        isActive: 'is-active',
    }

    queryClasses = {
        main: '.swiper-inst',
        btn: 'data-js-inst',
        modal: '[data-js-inst-modal]',
        video: '.video'
    }

    constructor(){
        this.main = document.querySelector(this.queryClasses.main);
        this.arrBtns = this.main.querySelectorAll(`[${this.queryClasses.btn}]`);
        this.modal = document.querySelector(this.queryClasses.modal);
        this.arrVideo = document.querySelectorAll(this.queryClasses.video);

        this.init();
    }

    init(){
        this.initSwiper();
        this.initOpen();
        this.initClose();
    }

    initSwiper(){
        this.swiperInst = new Swiper(this.main, {
            slidesPerView: 8,
            spaceBetween: 33,
            navigation: {
                nextEl: '.inst__btn--next',
            },
            breakpoints: {
                1: {
                    slidesPerView: 4,
                },
                553: {
                    slidesPerView: 6,
                },
                767.98: {
                    slidesPerView: 8,
                },
                1023.98: {
                    slidesPerView: 10,
                    spaceBetween: 20,
                },
                1320.98: {
                    slidesPerView: 8,
                    spaceBetween: 33,
                },
            },
        });

        this.swiperModal= new Swiper('.swiper-inst-modal', {
            slidesPerView: 2,
            navigation: {
                prevEl: '.swiper-inst-modal .swiper-button-prev',
                nextEl: '.swiper-inst-modal .swiper-button-next',
            },
        });
    }

    initOpen(){
        this.arrBtns.forEach(btn => {
            btn.onclick = () => {
                const index = btn.dataset.jsInst;

                this.swiperModal.slideTo(index);
                this.open();
            }
        });
    }

    initClose(){
        this.modal.onclick = (event) => {
            console.log(event.target);
            

            if (event.target.classList.contains('inst__modal-item') || event.target == this.modal) {
                this.close();
            }
        }
    }

    open(){
        this.modal.classList.add(this.stateClasses.isActive);
    }

    close(){
        this.modal.classList.remove(this.stateClasses.isActive);
    }
}