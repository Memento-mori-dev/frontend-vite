export default class dynamicPros {
    stateClasses = {
        isSmall: 'is-small',
        isActive: 'is-active',
    }

    constructor(main, item, hover = '', wrapper = '', content = '', small = false) {
        this.main = document.querySelector(main);
        this.items = this.main.querySelectorAll(item);

        this.items.forEach(item => {
            this.trackHover(item, hover);
        });
    }

    trackHover(item, classHover){
        if (classHover) {
            item.querySelector(classHover).addEventListener('mouseenter', () => {
                this.active(item);
            });
        }else{
            item.addEventListener('mouseenter', () => {
                this.active(item);
            });
        }
    }

    active(item){
        const active = this.main.querySelector(`.${this.stateClasses.isActive}`);

        if (active) {
            // active.classList.remove(this.stateClasses.isActive);
        }
        
        item.classList.add(this.stateClasses.isActive);

        this.leave(item);
    }

    leave(item){
        item.addEventListener('mouseleave', () => {
            // item.classList.remove(this.stateClasses.isActive);
        });
    }
}