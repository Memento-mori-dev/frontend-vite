export default class AjaxLine{
    stateClasses = {
        isActive: 'is-active',
    }

    classQuery = {
        main: '[data-js-line]',
    }

    constructor(){
        this.main = document.querySelector(this.classQuery.main);

        this.init();
    }

    init(){
        this.loading();
    }

    async loading(){
        try {
            const data = await this.getCurrencies();

            const dataPrice = await this.getPrice(data);
            
            this.render(dataPrice);
            

        } catch (error) {
            this.main?.remove();
        }
    }

    async getCurrencies() {
        try {
            const response = await fetch('https://api.aws.dev.bitbanker.org/latest/public/currencies');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const newData = {};

            data.forEach(element => {
                /*
                    "id": 3,
                    "symbol": "BTC",
                    "name": "Bitcoin",
                    name
                */

                newData[element.symbol] = {
                    id: element.id,
                    short: element.symbol,
                    name: element.name,
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

            arrURL.push(`https://api.aws.dev.bitbanker.org/latest/public/trades?market_id=${data[key].id}`)
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
                price: this.getPriceChange(dataNew[key2].items)
            };
        });

        return result;
    }

    getPriceChange(trades) {
        if (!Array.isArray(trades) || trades.length < 2) return null;

        // сортировка: новые сделки сверху
        const sorted = [...trades].sort(
            (a, b) => (b.dt_create ?? 0) - (a.dt_create ?? 0)
        );

        // helper: медиана массива чисел
        const median = (arr) => {
            const nums = arr
                .map(t => Number(t.price))
                .filter(Number.isFinite)
                .sort((a, b) => a - b);

            if (!nums.length) return null;

            const mid = Math.floor(nums.length / 2);
            return nums.length % 2
                ? nums[mid]
                : (nums[mid - 1] + nums[mid]) / 2;
        };

        const half = Math.floor(sorted.length / 2);

        const newMedian = median(sorted.slice(0, half || 1));
        const oldMedian = median(sorted.slice(half));

        if (
            !Number.isFinite(newMedian) ||
            !Number.isFinite(oldMedian) ||
            oldMedian === 0
        ) {
            return null;
        }

        const diff = newMedian - oldMedian;
        const pct = (diff / oldMedian) * 100;

        return {
            direction: diff > 0 ? 'green' : diff < 0 ? 'red' : 'green',
            percent: Number(pct.toFixed(2))
        };
    }

    render(data){
        let mainHtml = '';

        for (const key in data) {
            const coin = data[key];

            const direction = coin.price?.direction ?? '';
            const percent   = coin.price?.percent ?? 0;

            mainHtml += `<div class="line__item">
                <div class="line__item-top">
                <p class="line__item-name">${coin.main.name}</p>
                </div>
                <div class="line__item-bottom">
                <p class="line__item-short">${coin.main.short}</p>
                <p class="line__item-prec ${direction}">${percent}%</p>
                </div>
            </div>`;
        }

        const html = mainHtml.repeat(Math.ceil(40 / Object.keys(data).length));

        this.main.innerHTML = html;

        this.main.classList.add(this.stateClasses.isActive);   
    }
}