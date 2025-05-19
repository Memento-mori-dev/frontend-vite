let main = '[data-js-modal]',
    item = '[data-js-modal-item]',
    button = '[data-js-modal-open]',
    isOpen = 'is-open',
    isShow = 'is-show';

class ControllerModal{
    selectors = {
        main: main,
        item: item,
    }

    stateClasses = {
        isOpen: isOpen,
        isShow: isShow,
    }

    constructor(){
        this.modal = document.querySelector(this.selectors.main);
        this.items = this.modal.querySelectorAll(this.selectors.item);
    }

    open(indexItem){
      let openIndex = indexItem - 1;

      this.items[openIndex].classList.add(this.stateClasses.isShow)
      this.modal.classList.add(this.stateClasses.isOpen);
    }

    close(){
      this.modal.classList.remove(this.stateClasses.isOpen);
      this.modal.querySelectorAll(`.${this.stateClasses.isShow}`).forEach(show => show.classList.remove(this.stateClasses.isShow));
    }
}

let controllerModal = new ControllerModal();

class OpenModal{
    selectors ={
        button: button,
    }

    constructor(callback){
        this.buttons = document.querySelectorAll(this.selectors.button);
        this.init(this.buttons);

        this.callback = callback;
    }

    init(buttons) {
        buttons.forEach((button) => {
            button.onclick = () => {
                let indexModal = button.dataset.jsModalOpen;
                
                controllerModal.open(indexModal);
                this.callback()
            }
        })
    }
}

class CloseModal{
    selectors = {
        main: main,
    }

    stateClasses = {
        isOpen: isOpen,
    }

    constructor(callback){
        this.modal = document.querySelector(this.selectors.main);
        this.init();

        this.callback = callback;
    }

    init(){
        this.modal.onclick = (modal) => {
            if (modal.target.classList.contains(this.stateClasses.isOpen)) {
                controllerModal.close();
                this.callback();
            }
        }
    }
}


export {OpenModal, CloseModal};