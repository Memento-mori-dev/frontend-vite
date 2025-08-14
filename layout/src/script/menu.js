export default class menu {
    stateClasses = {
        isActive: 'is-active',
        isSecrecy: 'is-secrecy-menu',
    }

    elementClasses = {
        nav: '.header__list',
        btn: '.btn',
        menu: '.menu',
        content: '.menu__content',
        item: '[data-js-menu-item]',
        blue: '.menu__blue',
        close: '.menu-close',
    }

    constructor() {
        this.nav = document.querySelector(this.elementClasses.nav);
        this.btns = this.nav.querySelectorAll(this.elementClasses.btn);

        this.menu = document.querySelector(this.elementClasses.menu);
        this.content = this.menu.querySelector(this.elementClasses.content);
        this.items = this.content.querySelectorAll(this.elementClasses.item);
        this.blue = this.menu.querySelector(this.elementClasses.blue);

        this.closeBtn = document.querySelector(this.elementClasses.close);

        this.animation = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        this.ready();
        this.setupAnimation();

        this.actionOpen();
        this.actionClose();
    }

    setupAnimation(){
        this.animation.from(".menu__blue", {
            y: -800,
            duration: 1.5
        });

        this.animation.from(".menu__content", {
            y: -800,
            duration: 1.5
        }, "-=1.4");
    }

    ready(){
        let menuHeight = this.content.offsetHeight + 'px';
        this.blue.style.height = menuHeight;
    }

    open(index){
        this.switching(index);

        this.animation.play();
        this.readyClose();
    }

    close(){
        this.animation.reverse();

        this.items.forEach(item => {
            if (!item.classList.contains(this.stateClasses.isSecrecy)) {
                item.classList.add(this.stateClasses.isSecrecy);
            }
        });

        this.btns.forEach(btn => {
            if (btn.classList.contains(this.stateClasses.isActive)) {
                btn.classList.remove(this.stateClasses.isActive);
            }
        });

        this.shadowClose();
    }

    actionOpen(){
        this.btns.forEach((btn, index) => {
            btn.onclick = () => {
                this.open(index);
            }
        });
    }

    actionClose(){
        this.closeBtn.onclick = () => {
            this.close();
        }
    }

    switching(index){
        this.items.forEach(item => {
            if (!item.classList.contains(this.stateClasses.isSecrecy)) {
                item.classList.add(this.stateClasses.isSecrecy);
            }
        });

        this.btns.forEach(btn => {
            if (btn.classList.contains(this.stateClasses.isActive)) {
                btn.classList.remove(this.stateClasses.isActive);
            }
        });

        this.items[index].classList.remove(this.stateClasses.isSecrecy);
        this.btns[index].classList.add(this.stateClasses.isActive);
    }

    readyClose(){
        this.closeBtn.classList.add(this.stateClasses.isActive);
    }
    
    shadowClose(){
        setTimeout(() => {
            this.closeBtn.classList.remove(this.stateClasses.isActive);
        }, 1000);
    }
}