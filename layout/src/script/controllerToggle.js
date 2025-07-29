export default class ControllerToggle{
    stateClasses = {
        isActive: 'is-active',
        isShow: 'is-show',
    }

    constructor(itemClass, openClass, wrapperClass, contentClass){
        this.items = document.querySelectorAll(itemClass);
        
        this.init(this.items, openClass, wrapperClass, contentClass);
    }

    init(items, openClass, wrapperClass, contentClass){
        items.forEach(item => {
            item.querySelector(openClass).onclick = () => {
                if (item.classList.contains(this.stateClasses.isShow)) {
                    return
                }

                if (!item.classList.contains(this.stateClasses.isActive)) {
                    this.open(item, wrapperClass, contentClass)
                }else{
                    this.close(item, wrapperClass, contentClass)
                }
            }
        });
    }

    open(item, wrapper, content){
        const thisWrapper = item.querySelector(wrapper),
            thisContent = item.querySelector(content),
            startHeight = thisWrapper.offsetHeight + 'px',
            newHeight = thisContent.offsetHeight + 'px';

        thisWrapper.style.height = newHeight;
        item.classList.add(this.stateClasses.isActive);
        item.classList.add(this.stateClasses.isShow);

        thisWrapper.dataset.start = startHeight;

        setTimeout(() => {
            item.classList.remove(this.stateClasses.isShow);
            thisWrapper.style.height = 'auto';
        }, 200);
    }

    close(item, wrapper, content){
        const thisWrapper = item.querySelector(wrapper);
        
        thisWrapper.style.height = thisWrapper.offsetHeight + 'px';

        setTimeout(() => {
            thisWrapper.style.height = thisWrapper.dataset.start;
            item.classList.remove(this.stateClasses.isActive);
            item.classList.add(this.stateClasses.isShow);

            setTimeout(() => {
                item.classList.remove(this.stateClasses.isShow);
            }, 200);
        }, 0);
    }
}