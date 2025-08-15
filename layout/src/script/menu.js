export default class menu {
    stateClasses = {
        isActive: 'is-active',
        isSecrecy: 'is-secrecy-menu',
    }

    elementClasses = {
        header: '.header',
        nav: '.header__list',
        btn: '.btn',
        menu: '.menu',
        content: '.menu__content',
        item: '[data-js-menu-item]',
        blue: '.menu__blue',
        close: '.menu-close',

        headerNext: 'header--next',
        headerOpen: 'header--open',
    }

    constructor(controlScroll) {
        this.header = document.querySelector(this.elementClasses.header);
        this.nav = document.querySelector(this.elementClasses.nav);
        this.btns = this.nav.querySelectorAll(this.elementClasses.btn);

        this.menu = document.querySelector(this.elementClasses.menu);
        this.content = this.menu.querySelector(this.elementClasses.content);
        this.items = this.content.querySelectorAll(this.elementClasses.item);
        this.blue = this.menu.querySelector(this.elementClasses.blue);

        this.closeBtn = document.querySelector(this.elementClasses.close);

        this.animation = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

        this.controlScroll = controlScroll;

        this.ready();
        this.setupAnimation();

        this.actionOpen();
        this.actionClose();

        this.hoverItem();
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
        
        this.animation.to(this.closeBtn, {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
                this.closeBtn.classList.add(this.stateClasses.isActive);
            }
        }, "-=1");
    }

    ready(){
        let menuHeight = this.content.offsetHeight + 'px';
        this.blue.style.height = menuHeight;
    }

    open(index){
        this.switching(index);

        this.animation.play();

        if (!this.menu.classList.contains(this.stateClasses.isActive)) {
            this.checkIndex();
            this.controlScroll();
        }

        this.menu.classList.add(this.stateClasses.isActive);
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

        this.checkIndex();

        this.menu.classList.remove(this.stateClasses.isActive);
        this.controlScroll();
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

        this.header.onclick = (e) => {
            if (e.srcElement.classList.contains('header') || e.srcElement.classList.contains('menu__grey')) {
                this.close();
            }
        }

        document.querySelector('.shadow').onclick = (e) =>{
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

        if (this.menu.classList.contains(this.stateClasses.isActive)) {
            this.btns[index].classList.add(this.stateClasses.isActive);
        }else{
            setTimeout(() => {
                this.btns[index].classList.add(this.stateClasses.isActive);
            }, 400);
        }
    }
    
    checkIndex(){
        if (!this.header.classList.contains(this.elementClasses.headerNext)) {
            if (!this.header.classList.contains(this.elementClasses.headerOpen)) {
                setTimeout(() => {
                    this.header.classList.add(this.elementClasses.headerOpen);
                }, 400);
            }else{
                setTimeout(() => {
                    this.header.classList.remove(this.elementClasses.headerOpen);
                }, 1000);
            }
        }
    }

    hoverItem(){
        

        this.items.forEach(item => {
            const mouseoutHandler = () => {
                item.classList.add(this.stateClasses.isSecrecy);
                item.removeEventListener('mouseout', mouseoutHandler);
            }

            item.addEventListener('mouseover', (e) => {
                if (item.classList.contains(this.stateClasses.isSecrecy)){
                    item.classList.remove(this.stateClasses.isSecrecy);

                    item.addEventListener('mouseout', mouseoutHandler);
                }
            });

            
        })
    }
}
