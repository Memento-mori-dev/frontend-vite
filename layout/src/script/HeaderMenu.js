const rootSelector = '[data-js-menu]';

class Menu{
    // элементы для поиска
    selectors = {
        root: rootSelector,
        button: '[data-js-menu-button]',
        content: '[data-js-menu-content]',
    }
    // класс отображения состояния
    stateClasses = {
        isActive: 'is-open',
    }
    // когда обновляем атрибуты
    stateAttributes = {
        ariaSelected: 'area-selected',
        tabIndex: 'tabindex'
    }

    constructor(rootElement){
        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);
        this.state = {
            activeMenuIndex: [...this.buttonElements]
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive)),
        };
        this.limitTabsIndex = this.buttonElements.length - 1;
        this.bindEvents();
    }

    updateUI(){
        const { activeMenuIndex } = this.state;

        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeMenuIndex;

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeMenuIndex;

            contentElement.classList.toggle(this.stateClasses.isActive, isActive);
        })
    }

    onButtonClick(buttonIndex){
        this.state.activeMenuIndex = buttonIndex;
        this.updateUI();
    }

    bindEvents(){
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('mouseover', () => this.onButtonClick(index))
        })

        this.contentElements.forEach((contentElement) => {
            contentElement.addEventListener('mouseout', () => this.onButtonClick(-1))
        })
    }
}

 class HeaderMenu {
 constructor(){
    this.init();
 }

 init(){
    document.querySelectorAll(rootSelector).forEach((element) => {
        new Menu(element);
    });
 }
}
  
export default HeaderMenu;