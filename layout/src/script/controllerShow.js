export default class ControllerShow{
    stateClasses = {
        isActive: 'is-active',
        isShow: 'is-show',
    }

    constructor(mainClass, openClass, wrapperClass, contentClass, activeClose, minusClass){
        this.main = document.querySelector(mainClass);
        this.open = this.main.querySelector(openClass);
        this.wrapper = this.main.querySelector(wrapperClass);
        this.content = this.main.querySelector(contentClass);
        this.minus = document.querySelector(minusClass);

        this.active();

        if (activeClose) {
            this.main.querySelectorAll(activeClose).forEach(active => {
                active.onclick = () => {
                    this.closeContent();
                }
            });
        }
    }

    openContent(){
        this.main.classList.add(this.stateClasses.isActive);
        this.wrapper.classList.add(this.stateClasses.isActive);
        this.main.classList.add(this.stateClasses.isShow);
        this.open.classList.add(this.stateClasses.isActive);

        let newHeight;

        if (this.minus) {
            newHeight = window.innerHeight -  this.minus.offsetHeight;
        }else{
            newHeight = this.content.offsetHeight;
        }

        newHeight += 'px';
        
        this.wrapper.style.height = newHeight;

        this.removeShow();
    }

    closeContent(){
        this.main.classList.add(this.stateClasses.isShow);

        this.wrapper.style.height = 0;

        this.removeShow();

        setTimeout(() => {
            this.wrapper.classList.remove(this.stateClasses.isActive);
            this.main.classList.remove(this.stateClasses.isActive);
            this.open.classList.remove(this.stateClasses.isActive);
        }, 200);
    }

    removeShow(){
        setTimeout(() => {
            this.main.classList.remove(this.stateClasses.isShow);
        }, 200);
    }

    active(){
        this.open.onclick = () => {
            if (this.main.classList.contains(this.stateClasses.isShow)) {
                return
            }
            
            if (!this.main.classList.contains(this.stateClasses.isActive)) {
                this.openContent();
                
            }else{
                this.closeContent();
            }
        }
    }

}