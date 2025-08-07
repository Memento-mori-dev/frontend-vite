export default class dynamicPros {
    // мб нужно будет заменить события на телефоне

    stateClasses = {
        isSmall: 'is-small',
        isActive: 'is-active',
    }

    constructor(main, item, classHover = '', wrapper = '', content = '', small = false) {
        this.main = document.querySelector(main);
        this.items = this.main.querySelectorAll(item);
        this.wrapper = wrapper;
        this.content = content;
        this.small = small;

        this.items.forEach(item => {
            this.trackHover(item, classHover);
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

    addSmall(){

    }

    removeSmall(){

    }

    openWrapper(item){
        const wrapper = item.querySelector(this.wrapper),
            content = item.querySelector(this.content),
            newHeight = content.offsetHeight + 'px';

        wrapper.style.height = newHeight;
    }

    closeWrapper(item){
        const wrapper = item.querySelector(this.wrapper);

        wrapper.style.height = 0;
    }

    active(item){
        const active = this.main.querySelector(`.${this.stateClasses.isActive}`);

        if (active) {
            active.classList.remove(this.stateClasses.isActive);
            if (this.wrapper) {
                this.closeWrapper(item);
            }
        }
        
        setTimeout(() => {
            item.classList.add(this.stateClasses.isActive);

            if (this.wrapper) {
                this.openWrapper(item)
            }

            this.leave(item);
        }, 0);
    }

    leave(item){
        item.addEventListener('mouseleave', () => {
            item.classList.remove(this.stateClasses.isActive);

            if (this.wrapper) {
                this.closeWrapper(item);
            }
        });
    }
}