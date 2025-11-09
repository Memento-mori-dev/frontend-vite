export default class AjaxAuthor{
    stateClasses = {
        isActive: 'is-active',
        isHide: 'is-hide',
    }

    classQuery = {
        main: '[data-js-author]',

        // tabs
        tab: '[data-js-url-temp]',

        content: '[data-js-content]',

        // пагинация
        pag: '[data-js-pag]',
        mainPag: '[data-js-pag-main]',
        prev: '[data-js-prev]',
        next: '[data-js-next]',
    }

    state = {
        ready: true,

        url: {
            base: 'http://bit.jobmori1.beget.tech',
            main: null, // не изменяемая часть для хранения основы запроса
            ready: null, // url готовый к запросу

            params: {
                postType: 'news',

                authorTax: 'news-author',
                author: 'prokhorov-andrey-vladimirovich', // slug

                page: 1,
                pageMax: null,

                template: 'news',

                arrTax: [],
            }
        }


    }

    constructor(){
        // подготовка url
        this.state.url.main = new URL('/wp-json/site/v1/content-block', this.state.url.base);

        // this.state.url = new URL(this.state.mainUrl);

        this.main = document.querySelector(this.classQuery.main);

        this.arrTab = this.main.querySelectorAll(this.classQuery.tab)

        this.content = this.main.querySelector(this.classQuery.content);

        this.pag = this.main.querySelector(this.classQuery.pag);
        this.mainPag = this.pag.querySelector(this.classQuery.mainPag);

        this.init();
    }

    init(){
        this.clickTags();

        this.clickPag();

        this.buildUrl();

        this.getPosts();
    }

    setPage(index){
        this.state.url.params.page = index;
    }

    setTabsState(template, postType, tax){
        this.state.url.params.template = template;
        this.state.url.params.postType = postType;

        if (tax) {
            const arrNewTax = [];

            tax.split('/').forEach(tax => {
                arrNewTax.push(tax);
            });

            this.state.url.params.arrTax = arrNewTax;
        }else{
            this.state.url.params.arrTax = [];
        }
    }

    buildUrl(){
        const url = new URL(this.state.url.main.href);

        // настройки выходных данных
        url.searchParams.set('template', this.state.url.params.template);
        url.searchParams.set('page', this.state.url.params.page);

        // основа для запроса
        url.searchParams.set('post_type', this.state.url.params.postType);
        url.searchParams.append(`tax[${this.state.url.params.authorTax}]`, this.state.url.params.author);

        if (this.state.url.params.arrTax.length > 0) { // переделать
            this.state.url.params.arrTax.forEach((strTax) => {
                const [tax, slug] = strTax.split(',');

                url.searchParams.append(`tax[${tax}]`,slug);
            });            
        }

        this.state.url.ready = url;
    }

    renderContent(content){
        if (content) {
            this.content.innerHTML = content;
        }else{
            this.content.innerHTML = '';

            console.log('renderContent не возможен т.к. нет контента');
        }
    }

    renderPagButton(index){
        if (typeof(index) == 'number') {
            const button = document.createElement('a');
            button.setAttribute('data-js-page', index);
            button.textContent = index;

            if (index == this.state.url.params.page) {
                button.classList.add(this.stateClasses.isActive);
            }

            return button;
        }else{
            const span = document.createElement('span');
            span.classList.add('news__pagination-ellipsis');
            span.textContent = '...';

            return span;
        }
    }
    
    renderPagButtons(total, page, edge = 1, around = 2) {
        const pages = [];
        const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

        // гварды
        if (!Number.isFinite(total) || total < 1) return pages;
        if (!Number.isFinite(page)) page = 1;

        // нормализуем текущую страницу
        page = clamp(Math.round(page), 1, total);

        // если страниц мало — выводим все подряд
        if (total <= edge * 2 + around * 2 + 1) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages.map(e => this.renderPagButton(e));
        }

        // левый и правый «края»
        const L = Array.from({ length: Math.max(0, edge) }, (_, i) => i + 1);
        const R = Array.from({ length: Math.max(0, edge) }, (_, i) => total - edge + 1 + i);

        // окно вокруг текущей страницы, ограниченное краями
        const start = clamp(page - around, edge + 1, total - edge);
        const end   = clamp(page + around, edge + 1, total - edge);

        const S = start <= end
            ? Array.from({ length: end - start + 1 }, (_, i) => start + i)
            : [];

        // сборка с «…» по разрывам
        pages.push(...L);

        const leftTailEnd = L.length ? L[L.length - 1] : 0;
        if (S.length && S[0] > leftTailEnd + 1) pages.push('…');
        if (S.length) pages.push(...S);

        const lastNumberOnLeft = S.length ? S[S.length - 1] : leftTailEnd;
        if (R.length && R[0] > lastNumberOnLeft + 1) pages.push('…');

        pages.push(...R);

        pages = pages.map(e => this.renderPagButton(e));

        return pages
    }

    renderPag(arr, maxPage){
        if (maxPage > 1) {
            this.pag.classList.remove(this.stateClasses.isHide);
        }else{
            this.pag.classList.add(this.stateClasses.isHide);
        }

        const fragment = document.createDocumentFragment();

        arr.forEach(btn => fragment.appendChild(btn));
        this.mainPag.textContent = '';
        this.mainPag.appendChild(fragment);
    }

    async getPosts(){
        try {
            const response = await fetch(this.state.url.ready);
            const data = await response.json();
            
            this.state.url.params.pageMax = data.max_page;

            this.renderContent(data.html);

            this.renderPag(this.renderPagButtons(data.max_page, data.this_page), data.max_page);

            this.state.ready = true;

        } catch (error) {
            console.error('Ошибка запроса:', error);
        }
    }

    clickTags(){
        this.arrTab.forEach(tab => {
            tab.onclick = (e) => {
                e.preventDefault();

                if (!this.state.ready) return;

                this.state.ready = false;

                const data = tab.dataset,
                template = data?.jsUrlTemp || '',
                postType = data?.jsUrlPost || '',
                tax = data?.jsUrlTax || '';

                this.state.url.params.page = 1;
            
                this.setTabsState(template, postType, tax);

                this.buildUrl();

                this.getPosts();
            }
        })
    }

    clickPag(){
        this.pag.addEventListener('click', (event) => {

            if (event.target.hasAttribute('data-js-page')) {
                this.state.url.params.page = event.target.dataset.jsPage;

                this.buildUrl();

                this.getPosts();
            }
            
            if (event.target.hasAttribute('data-js-next')) {
                if (this.state.url.params.page + 1 <= this.state.url.params.pageMax) {

                    this.state.url.params.page = this.state.url.params.page + 1;

                    this.buildUrl();

                    this.getPosts();
                }
            }

            if (event.target.hasAttribute('data-js-prev')) {
                if (this.state.url.params.page - 1 >= 1) {

                    this.state.url.params.page = this.state.url.params.page - 1;

                    this.buildUrl();

                    this.getPosts();
                }
            }
        });
    }

}



// | Параметр                     | Тип            | Обязательный | По умолчанию | Описание                                                                                                                                                                                                                                                           | Пример значения                                       |
// | ---------------------------- | -------------- | ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
// | **post_type**                | string         | ✅ Да         | —            | Один или несколько типов записей, через запятую. Используется в `WP_Query` (`'post_type' => [...]`).                                                                                                                                                               | `news` / `news,project`                               |
// | **taxonomy**                 | string         | ❌ Нет        | —            | Ключ одной таксономии для фильтрации (устаревший параметр, используется только вместе с `term`).                                                                                                                                                                   | `news-type`                                           |
// | **term**                     | string         | ❌ Нет        | —            | Slug термина для одиночной фильтрации. Работает только если указана `taxonomy`.                                                                                                                                                                                    | `analytics`                                           |
// | **tax**                      | object / array | ❌ Нет        | —            | Новый формат мульти-фильтра: позволяет фильтровать сразу по нескольким таксономиям. Ключ — название таксономии, значение — slug(и) терминов. Может быть строкой (`a,b`) или массивом (`['a','b']`). Пример: `tax[news-type]=analytics,weekly&tax[autor]=john-doe`. | `tax[news-type]=analytics,weekly&tax[autor]=john-doe` |
// | **tax_relation**             | string         | ❌ Нет        | `AND`        | Логика объединения нескольких таксономий в `tax_query`:<br>• `AND` — запись должна соответствовать **всем** условиям;<br>• `OR` — достаточно хотя бы одного совпадения.                                                                                            | `AND` / `OR`                                          |
// | **per_page**                 | integer        | ❌ Нет        | `6`          | Количество записей на странице. Минимум 1. Используется в `WP_Query` как `posts_per_page`.                                                                                                                                                                         | `9`                                                   |
// | **page**                     | integer        | ❌ Нет        | `1`          | Номер страницы (1-based, не 0). Используется в `WP_Query` как `paged`.                                                                                                                                                                                             | `2`                                                   |
// | **template**                 | string         | ❌ Нет        | `card`       | Имя шаблона для рендера записей (файл `/templates/{template}.php` внутри плагина). Если файла нет — используется `default.php`.                                                                                                                                    | `grid-2col` / `author-card`                           |
// | **orderby**                  | string         | ❌ Нет        | `date`       | Поле сортировки (`date`, `title`, `modified`, `menu_order`, `meta_value_num`, `rand` и т.д.). Используется в `WP_Query` как `orderby`.                                                                                                                             | `title`                                               |
// | **order**                    | string         | ❌ Нет        | `DESC`       | Направление сортировки: `ASC` или `DESC`. Любое другое значение автоматически заменяется на `DESC`.                                                                                                                                                                | `ASC`                                                 |
// | **tax_input** *(внутренний)* | array          | —            | —            | Используется внутри кэша для уникального ключа. Не передаётся вручную.                                                                                                                                                                                             | —                                                     |
// | **ver** *(внутренний)*       | string         | —            | —            | Внутренняя версия кэша (`cbajax_cache_version`), обновляется при изменениях контента или терминов. Не используется напрямую.                                                                                                                                       | —                                                     |
