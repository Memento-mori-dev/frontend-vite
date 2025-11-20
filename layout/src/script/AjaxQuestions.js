export default class AjaxQuestions{
    stateClasses = {
        isActive: 'is-active',
        isHide: 'is-hide',
    }

    classQuery = {
        main: '[data-js-question]',
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
            base: null,
            main: null,
            ready: null,

            params: {
                postType: 'news',
                page: 1,
                pageMax: null,
                template: 'news',
                arrTax: [],
            }
        }
    }

    constructor() {
        this.url = window.location.pathname;

        this.state.url.base = window.location.origin;
        this.state.url.main = new URL('/wp-json/site/v1/content-block', this.state.url.base);

        this.main = document.querySelector(this.classQuery.main);
        this.content = this.main.querySelector(this.classQuery.content);

        this.pag = this.main.querySelector(this.classQuery.pag);
        this.mainPag = this.pag.querySelector(this.classQuery.mainPag);

        this.init();
    }

    init() {
        this.clickPag();
        this.buildUrl();
        this.getPosts();
    }

    setPage(index) {
        this.state.url.params.page = index;
    }

    buildUrl() {
        const url = new URL(this.state.url.main.href);

        url.searchParams.set('template', this.state.url.params.template);
        url.searchParams.set('page', this.state.url.params.page);
        url.searchParams.set('post_type', this.state.url.params.postType);

        this.state.url.ready = url;
    }

    renderContent(content) {
        if (content) {
            this.content.innerHTML = content;
        } else {
            this.content.innerHTML = '';
            console.log('renderContent не возможен т.к. нет контента');
        }
    }

    renderPagButton(index) {
        if (typeof index === 'number') {
            const button = document.createElement('a');
            button.setAttribute('data-js-page', index);
            button.textContent = index;

            if (index == this.state.url.params.page) {
                button.classList.add(this.stateClasses.isActive);
            }

            return button;
        } else {
            const span = document.createElement('span');
            span.classList.add('news__pagination-ellipsis');
            span.textContent = '...';

            return span;
        }
    }

    renderPagButtons(total, page, edge = 1, around = 2) {
        let pages = [];
        const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

        if (!Number.isFinite(total) || total < 1) return pages;
        if (!Number.isFinite(page)) page = 1;

        page = clamp(Math.round(page), 1, total);

        if (total <= edge * 2 + around * 2 + 1) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages.map(e => this.renderPagButton(e));
        }

        const L = Array.from({ length: Math.max(0, edge) }, (_, i) => i + 1);
        const R = Array.from({ length: Math.max(0, edge) }, (_, i) => total - edge + 1 + i);

        const start = clamp(page - around, edge + 1, total - edge);
        const end = clamp(page + around, edge + 1, total - edge);

        const S = start <= end
            ? Array.from({ length: end - start + 1 }, (_, i) => start + i)
            : [];

        pages.push(...L);

        const leftTailEnd = L.length ? L[L.length - 1] : 0;
        if (S.length && S[0] > leftTailEnd + 1) pages.push('…');
        if (S.length) pages.push(...S);

        const lastNumberOnLeft = S.length ? S[S.length - 1] : leftTailEnd;
        if (R.length && R[0] > lastNumberOnLeft + 1) pages.push('…');

        pages.push(...R);

        pages = pages.map(e => this.renderPagButton(e));
        return pages;
    }

    renderPag(arr, maxPage) {
        if (maxPage > 1) {
            this.pag.classList.remove(this.stateClasses.isHide);
        } else {
            this.pag.classList.add(this.stateClasses.isHide);
        }

        const fragment = document.createDocumentFragment();

        arr.forEach(btn => fragment.appendChild(btn));

        this.mainPag.textContent = '';
        this.mainPag.appendChild(fragment);
    }

    async getPosts() {
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

    clickPag() {
        this.pag.addEventListener('click', (event) => {

            if (event.target.hasAttribute('data-js-page')) {
                this.state.url.params.page = Number(event.target.dataset.jsPage);
                this.buildUrl();
                this.getPosts();
            }

            if (event.target.hasAttribute('data-js-next')) {
                if (this.state.url.params.page + 1 <= this.state.url.params.pageMax) {
                    this.state.url.params.page++;
                    this.buildUrl();
                    this.getPosts();
                }
            }

            if (event.target.hasAttribute('data-js-prev')) {
                if (this.state.url.params.page - 1 >= 1) {
                    this.state.url.params.page--;
                    this.buildUrl();
                    this.getPosts();
                }
            }
        });
    }
}