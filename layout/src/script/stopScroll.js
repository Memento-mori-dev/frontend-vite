export default class stopScroll{
    stateClasses = {
        isActive: 'is-active',
        isScroll: 'is-no-scroll'
    }

    elementClasses = {
        body: 'body',
        shadow: '.shadow',
    }

    constructor(){
        this.body = document.querySelector(this.elementClasses.body);
        this.shadow = document.querySelector(this.elementClasses.shadow);
    }

    action(){
        this.shadow.classList.toggle(this.stateClasses.isActive);
        this.body.classList.toggle(this.stateClasses.isScroll);
    }
}