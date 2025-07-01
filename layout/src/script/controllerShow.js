export default class ControllerShow{
    stateClasses = {
        isActive: 'is-active',
        isShow: 'is-show',
    }

    constructor(mainClass, openClass, wrapperClass, contentClass){
        this.main = document.querySelector(mainClass);
        this.open = this.main.querySelector(openClass);
        this.wrapper = this.main.querySelector(wrapperClass);
        this.content = this.main.querySelector(contentClass);

        this.active();
    }

    openContent(){
        this.main.classList.add(this.stateClasses.isActive);
        this.wrapper.classList.add(this.stateClasses.isActive);
        this.main.classList.add(this.stateClasses.isShow);

        const newHeight = this.content.offsetHeight + 'px';
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