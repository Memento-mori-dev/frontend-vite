export default class ControllerTabs{
    stateClasses = {
        isActive: 'is-active',
        isShow: 'is-show',
    }

    constructor(mainClass, itemClass ,openClass, contentClass){
        this.main = document.querySelector(mainClass);
        this.items = this.main.querySelectorAll(itemClass);

        this.items.forEach(item => {
            const button = item.querySelector(openClass),
                    content = item.querySelector(contentClass);

            button.onclick = () => {
                if (!content.classList.contains(this.stateClasses.isActive)) {
                    this.openContent(content);
                }else{
                    this.closeContent(content);
                }
            }
        });
    }

    openContent(content){
        content.classList.add(this.stateClasses.isActive)
    }

    closeContent(content){
        content.classList.remove(this.stateClasses.isActive)
    }
}