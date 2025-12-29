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
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                410: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                500: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
                700: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                },
                767.98: {
                    slidesPerView: 7,
                    spaceBetween: 20,
                },
                960: {
                    slidesPerView: 9,
                    spaceBetween: 20,
                },
                1320.98: {
                    slidesPerView: 8,
                    spaceBetween: 33,
                },
            },
        });

        this.swiperModal = new Swiper('.swiper-inst-modal', {
            slidesPerView: 1,
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