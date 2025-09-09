export class AjaxNews{
    stateClasses = {
        isHide: 'is-hide',
    }

    elementClasses = {
        btn: '[data-js-get-post]',
        pageBtn: '.page__btn',
    }

    constructor(nameAjax, content){
        this.btn = document.querySelector(this.elementClasses.btn);
        this.pageBtn = document.querySelector(this.elementClasses.pageBtn);
        this.content = document.querySelector(content);
        this.nameAjax = nameAjax;

        this.init();
    }

    click(){
        const page = this.btn.dataset.jsPage;
        const url = `/wp-content/themes/la-theme/ajax/${this.nameAjax}.php?page=${page}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка сети: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.status == true) {
                    this.pageBtn.classList.add(this.stateClasses.isHide);
                }

                this.content.insertAdjacentHTML('beforeend', data.data);
                this.btn.dataset.jsPage = Number(page) + 1;
            })
            .catch(error => {
                this.pageBtn.classList.add(this.stateClasses.isHide);
                
                console.error('Произошла ошибка');
            });
    }
    

    init(){
        this.btn.onclick = () => {
            this.click();
        }
    }
}