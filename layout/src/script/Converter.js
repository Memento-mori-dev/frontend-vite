export default class Converter{
    stateClasses = {
        isActive: 'is-active',
    }

    state = {
        key: null,
    }

    data = {}

    constructor() {
        this.main = document.querySelector('[data-js-converter]');

        this.list = this.main.querySelector('[data-js-converter-main]');
        this.listWrapper = this.main.querySelector('[data-js-converter-main-wrapper]');
        this.listContent = this.main.querySelector('[data-js-converter-main-content]');
        this.listSelection = this.main.querySelector('[data-js-converter-main-selection]');

        this.form = this.main.querySelector('[data-js-converter-form]');
        this.formOne = this.main.querySelector('[data-js-converter-form-one]');
        this.formOneImg = this.main.querySelector('[data-js-converter-form-one-img]');
        this.formOneSpan = this.main.querySelector('[data-js-converter-form-one-span]');
        this.formTwo = this.main.querySelector('[data-js-converter-form-two]');
        this.formTwoImg = this.main.querySelector('[data-js-converter-form-two-img]');
        this.formTwoSpan = this.main.querySelector('[data-js-converter-form-two-span]');

        this.course = this.main.querySelector('[data-js-converter-form-course]');

        this.init();

    }

    init(){
        this.openMain();

        this.loading();
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

    async loading(){
        try {
            const dataMarket = await this.getMarket();

            this.data = await this.getPrice(dataMarket);

            this.renderButton();

            this.addHandlers();

            this.updaterCalc();

        } catch (error) {
            this.main?.remove();
        }
    }

    async getMarket() {
        try {
            const response = await fetch('https://api.aws.dev.bitbanker.org/latest/public/markets');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const newData = {};

            data.forEach(element => {
                /*
                    id - для запроса
                    limit_amount_min - минимальное количество первого
                    limit_total_min - минимальное второе
                    name
                */

                newData[element.name] = {
                    id: element.id,
                    minOne: element.limit_amount_min,
                    maxOne: element.limit_amount_max,
                    minTwo: element.limit_total_min,
                    maxTwo: element.limit_total_max,
                }

                // console.log(element);
            });

            return newData;
        } catch (error) {
            this.main?.remove();
            throw error;
        }
    }

    async getPrice(data){
        const arrURL = [],
            result = {};

        for (const key in data) {
            arrURL.push(`https://api.aws.dev.bitbanker.org/latest/public/trades?page=1&per_page=1&market_id=${data[key].id}`)
        }

        const responses = await Promise.all(
            arrURL.map(url => fetch(url))
        );        

        const dataNew = await Promise.all(
            responses.map(res => res.json())
        );

        Object.keys(data).forEach((key1, index) => {
            const key2 = Object.keys(dataNew)[index];

            result[key1] = {
                main: data[key1],
                price: dataNew[key2].items[0].price
            };
        });

        return result;
    }

    renderButton(){
        const fragment = document.createDocumentFragment();

        Object.keys(this.data).forEach((key, index) => {
            const button = document.createElement('button');
            button.textContent = key;
            button.className = 'btn';

            button.setAttribute('data-js-converter-main-item', key);

            fragment.appendChild(button);
        });

        this.listSelection.appendChild(fragment);
    }

    addHandlers(){
        this.listItem = this.main.querySelectorAll('[data-js-converter-main-item]');

        this.listItem.forEach(button => {
            button.onclick = () => {
                this.formOne.classList.add(this.stateClasses.isActive);
                this.formTwo.classList.add(this.stateClasses.isActive);

                this.state.key = button.dataset.jsConverterMainItem;

                this.updateInformation();

                this.list.classList.remove(this.stateClasses.isActive);
                this.listWrapper.style.height = 0;
            }
        });
        
    }

    updateInformation(){
        const data = this.data[this.state.key],
            arrName = this.state.key.split('/'),
            oneName = arrName[0],
            twoName = arrName[1];

        this.list.textContent = this.state.key;

        this.formOne.min = data.main.minOne;
        this.formOne.max = data.main.maxOne;
        this.formTwo.min = data.main.minTwo;
        this.formTwo.max = data.main.maxTwo;

        // console.log(this.main);
        

        this.formOneSpan.textContent = data.main.minOne + ' ' + oneName;
        this.formTwoSpan.textContent = data.main.minTwo + ' ' + twoName;
        this.course.textContent = 1 + ' ' + oneName + ' = ' + data.price + ' ' + twoName;

        this.toggleImageByUrl('./assets/svg/converter/' + oneName + '.svg', this.formOneImg);
        this.toggleImageByUrl('./assets/svg/converter/' + twoName + '.svg', this.formTwoImg);

        this.formOne.value = '';
        this.formTwo.value = '';
    }

    updaterCalc(){
        this.formOne.addEventListener('input', (e) => {
            if (Number(this.formOne.value) > Number(this.formOne.max)) {
                this.formOne.value = this.formOne.max;
            }
            
            this.calc(true);
        });

        this.formTwo.addEventListener('input', (e) => {
            if (Number(this.formTwo.value) > Number(this.formTwo.max)) {
                this.formTwo.value = this.formTwo.max;
            }

            this.calc(false);
        });
    }

    calc(direction){
        const price = this.data[this.state.key].price;

        if (direction) {
            this.formTwo.value = this.formOne.value * price ;
        } else {
            this.formOne.value = this.formTwo.value / price;
        }
        
    }
    

    toggleImageByUrl(url, imgEl) {
        if (!imgEl) return;

        fetch(url, { method: 'HEAD' })
            .then(res => {
            if (res.ok) {
                imgEl.src = url;
                imgEl.classList.remove('is-hide');

                console.log(res);
                
            } else {
                imgEl.classList.add('is-hide');
            }
            })
            .catch(() => {
            imgEl.classList.add('is-hide');
            });
    }
}