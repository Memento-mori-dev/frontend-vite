export default class ControllerScroll{
    selectors = {
        main: '[data-js-scroll]',
    }

    stateClasses = {
        isStope: 'is-stop',
    }

    constructor(){
        this.main = document.querySelector(this.selectors.main);
    }

    stop(){
        this.main.classList.add(this.stateClasses.isStope);
    }

    play(){
        this.main.classList.remove(this.stateClasses.isStope);
    }
}