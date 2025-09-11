export class AjaxNews{
    stateClasses = {
        isHide: 'is-hide',
    }

    elementClasses = {
        loader: '[data-js-news-loader]',
    }

    constructor(nameAjax, content){
        this.loader = document.querySelector(this.elementClasses.loader);
        this.content = document.querySelector(content);
        this.nameAjax = nameAjax;

        this.initObserver();
    }

    fetch(){
        this.loader.classList.remove(this.stateClasses.isHide);

        const page = this.loader.dataset.jsNewsLoader;
        const url = `http://bit.jobmori1.beget.tech/wp-content/themes/bit/ajax/${this.nameAjax}.php?index=${page}`;

        ++this.loader.dataset.jsNewsLoader;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                this.content.insertAdjacentHTML('beforeend', data.data);

                if (!data.status) {
                    this.initObserver();
                }else{
                    this.loader.classList.add(this.stateClasses.isHide);
                }
            })
            .catch(error => {
                this.loader.classList.add(this.stateClasses.isHide);
                
                console.log('Произошла ошибка');
            });
    }
    

    initObserver(){
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.observer.unobserve(this.loader);

                    this.fetch();
                }
            });
        }, {
            threshold: 0.5 // 50% элемента должно быть видно
        });

        this.observer.observe(this.loader);
    }
}