export default class dynamicPros {
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
            this.trackTouch(item, classHover);
        });

        // Опционально: клик вне элементов, чтобы закрыть активный
        document.addEventListener('click', (e) => {
            if (!this.main.contains(e.target)) {
                this.closeAll();
            }
        });
    }

    trackHover(item, classHover){
        if (classHover) {
            item.querySelector(classHover).addEventListener('mouseenter', () => {
                this.active(item);
            });
            item.querySelector(classHover).addEventListener('mouseleave', () => {
                this.deactivate(item);
            });
        } else {
            item.addEventListener('mouseenter', () => {
                this.active(item);
            });
            item.addEventListener('mouseleave', () => {
                this.deactivate(item);
            });
        }
    }

    trackTouch(item, classHover){
        // Для мобильных устройств
        const target = classHover ? item.querySelector(classHover) : item;

        target.addEventListener('touchstart', (e) => {
            e.preventDefault(); // чтобы избежать "двойного" срабатывания мыши
            this.active(item);
        });

        // Закрываем при касании вне или при касании элемента повторно
        // Можно добавить, если надо закрывать при touchend
        target.addEventListener('touchend', (e) => {
            // Здесь можно реализовать логику закрытия, если нужно
        });
    }

    addSmall(item){
        this.items.forEach(element => {
            if (element != item) {
                element.classList.add(this.stateClasses.isSmall)
            }
        });
    }

    removeSmall(){
        this.items.forEach(element => {
            if (element) {
                element.classList.remove(this.stateClasses.isSmall)
            }
        });
    }

    openWrapper(item){
        const wrapper = item.querySelector(this.wrapper),
            content = item.querySelector(this.content),
            newHeight = content.offsetHeight + 'px';

        wrapper.style.height = newHeight;

        if (this.small) {
            this.addSmall(item);
        }
    }

    closeWrapper(item){
        const wrapper = item.querySelector(this.wrapper);

        wrapper.style.height = 0;

        if (this.small) {
            this.removeSmall(item);
        }
    }

    active(item){
        const active = this.main.querySelector(`.${this.stateClasses.isActive}`);

        if (active && active !== item) {
            active.classList.remove(this.stateClasses.isActive);
            if (this.wrapper) {
                this.closeWrapper(active);
            }
        }

        item.classList.add(this.stateClasses.isActive);

        if (this.wrapper) {
            this.openWrapper(item);
        }
    }

    deactivate(item){
        item.classList.remove(this.stateClasses.isActive);

        if (this.wrapper) {
            this.closeWrapper(item);
        }
    }

    closeAll(){
        const active = this.main.querySelector(`.${this.stateClasses.isActive}`);
        if (active) {
            active.classList.remove(this.stateClasses.isActive);
            if (this.wrapper) {
                this.closeWrapper(active);
            }
        }
        this.removeSmall();
    }
}
