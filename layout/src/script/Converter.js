export default class Converter{
    stateClasses = {
        isActive: 'is-active',
    }

    state = {

    }

    data = {

    }

    constructor() {
        this.main = document.querySelector('[data-js-converter]');

        this.list = this.main.querySelector('[data-js-converter-main]');
        this.listWrapper = this.main.querySelector('[data-js-converter-main-wrapper]');
        this.listContent = this.main.querySelector('[data-js-converter-main-content]');
        this.listItem = this.main.querySelectorAll('[data-js-converter-main-item]');

        this.form = this.main.querySelector('[data-js-converter-form]');
        this.formOne = this.main.querySelector('[data-js-converter-form-one]');
        this.formOneSpan = this.main.querySelector('[data-js-converter-form-one-span]');
        this.formTwo = this.main.querySelector('[data-js-converter-form-two]');
        this.formTwoSpan = this.main.querySelector('[data-js-converter-form-two-span]');

        this.course = this.main.querySelector('[data-js-converter-form-course]');

        this.init();

        this.loading();
    }

    init(){
        this.openMain();
        this.choiceMain();

        this.getBaseData();
    }

    openMain(){
        this.list.onclick = () => {
            const height = this.listContent.offsetHeight + 'px';
            
            if (!this.list.classList.contains(this.stateClasses.isActive)) {
                this.list.classList.add(this.stateClasses.isActive);

                this.listWrapper.style.height = height;
            }else{
                this.list.classList.remove(this.stateClasses.isActive);

                this.listWrapper.style.height = 0;
            }
        }
    }

    choiceMain(){
        this.listItem.forEach(item => {
            item.onclick = () => {
                this.list.textContent = item.textContent;
            }
        });
    }

    getBaseData(){
        
    }

    async loading(){
        try {
            const dataMarket = await this.getMarket();
            console.log(dataMarket);
        } catch (error) {
            console.error('Ошибка при загрузке рынка:', error);
        }
    }

    async getMarket() {
        try {
            const response = await fetch('https://api.aws.dev.bitbanker.org/latest/public/markets');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            data.forEach(element => {
                /*
                    id
                    limit_amount_min - минимальное количество первого
                    limit_total_min - минимальное второе
                    name
                */

                console.log(element);
            });

            return data; // ← ВАЖНО
        } catch (error) {
            this.main?.remove();
            throw error; // ← чтобы loading() поймал ошибку
        }
    }
    
}