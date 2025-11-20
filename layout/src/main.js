import { useDynamicAdapt } from "./script/dynamicAdapt";
import { initSwiper } from "./script/swiper";
import Video from "./script/Video";
import { Inst } from "./script/Inst";
import { AjaxNews } from "./script/AjaxNews";

import AjaxAuthor from "./script/AjaxAuthor";

import AjaxQuestions from "./script/AjaxQuestions";

useDynamicAdapt();

document.addEventListener("DOMContentLoaded", () => {
  initSwiper();

  if (document.querySelector(".video")) {
    new Video();
  }

  if (document.querySelector(".swiper-inst")) {
    new Inst();
  }

  if (document.querySelector(".news__item--big")) {
    new AjaxNews("news", ".main__content-news");
  }
});

if (document.getElementById("shareBtn")) {
    document.getElementById("shareBtn").addEventListener("click", async (e) => {
        e.preventDefault(); // ❗ чтобы ссылка не перезагружала страницу

        if (navigator.share) {
            try {
            await navigator.share({
                title: document.title || "Посмотри это!", // берём реальный заголовок
                text: "Нашёл интересную ссылку 👇",
                url: window.location.href, // текущая страница
            });
            console.log("Ссылка успешно отправлена!");
            } catch (err) {
            console.log("Отмена или ошибка:", err);
            }
        } else {
            alert("Функция 'Поделиться' не поддерживается этим браузером 😕");
        }
    });
}

if (document.querySelector(".podcasts__start")) {
  (() => {
    const pad = (n) => String(Math.floor(n)).padStart(2, '0');
    const fmt = (sec) => {
      if (!isFinite(sec) || sec < 0) sec = 0;
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${pad(m)}:${pad(s)}`;
    };

    const pods = Array.from(document.querySelectorAll('[data-js-pod]'));
    if (!pods.length) return;

    const audios = [];

    pods.forEach((root) => {
      const audio = root.querySelector('[data-js-audio]');
      if (!audio) return;
      audios.push(audio);

      // элементы
      const startBtn   = root.querySelector('[data-js-start]'); // кнопка play на превью
      const playBtn    = root.querySelector('[data-js-play]');
      const restartBtn = root.querySelector('[data-js-restart]');
      const backBtn    = root.querySelector('[data-js-back]');
      const nextBtn    = root.querySelector('[data-js-next]');
      const speakBtn   = root.querySelector('[data-js-speak]');
      const speedBtns  = Array.from(root.querySelectorAll('[data-js-pod-speed]'));
      const log        = root.querySelector('[data-js-loader]') || root.querySelector('.podcasts__start-control-log');
      const point      = root.querySelector('[data-js-point]');
      const timerEl    = root.querySelector('[data-js-timer]');
      const controller = root.querySelector('[data-js-pod-controller]'); // блок с контролами

      // НОВОЕ: все элементы с конечным временем
      const timerEndEls = Array.from(root.querySelectorAll('[data-js-timer-end]'));

      // позиция точки
      if (point) {
        point.style.position = 'absolute';
        point.style.top = '8px';
        point.style.transform = 'translate(-50%, -50%)';
        point.style.left = '0%';
      }

      const setPlayingUI = (isPlaying) => {
        root.classList.toggle('is-playing', isPlaying);
        if (playBtn) playBtn.classList.toggle('is-active', isPlaying);
      };

      // двигаем точку по прогрессу
      const renderProgress = () => {
        if (!point) return;
        const dur = audio.duration || 0;
        const ratio = dur ? Math.min(1, Math.max(0, audio.currentTime / dur)) : 0;
        point.style.left = (ratio * 100) + '%';
      };

      // текущее время
      const renderTimer = () => {
        if (!timerEl) return;
        timerEl.textContent = fmt(audio.currentTime || 0);
      };

      // НОВОЕ: конечное время (длительность)
      const renderDuration = () => {
        if (!timerEndEls.length) return;
        const d = (audio && isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 0;
        const text = fmt(d);
        timerEndEls.forEach(el => el.textContent = text);
      };

      // НОВОЕ: сброс конечного времени (например, при смене src/emptied)
      const resetDuration = () => {
        if (!timerEndEls.length) return;
        const text = fmt(0);
        timerEndEls.forEach(el => el.textContent = text);
      };

      const onTimeUpdate = () => {
        renderProgress();
        renderTimer();
      };

      // управление
      const pauseOthers = (me) => {
        audios.forEach(a => { if (a !== me && !a.paused) a.pause(); });
        pods.forEach(r => { if (r !== root) r.classList.remove('is-playing'); });
        document.querySelectorAll('[data-js-play].is-active').forEach(b => {
          if (b !== playBtn) b.classList.remove('is-active');
        });
      };
      const doPlay    = () => { pauseOthers(audio); audio.play().catch(()=>{}); };
      const doToggle  = () => (audio.paused ? doPlay() : audio.pause());
      const doRestart = () => { audio.currentTime = 0; doPlay(); };
      const doSeekRel = (delta) => {
        let t = (audio.currentTime || 0) + delta;
        if (isFinite(audio.duration)) t = Math.min(audio.duration - 0.01, Math.max(0, t));
        else t = Math.max(0, t);
        audio.currentTime = t;
      };
      const setSpeed = (rate) => {
        audio.playbackRate = rate;
        speedBtns.forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.jsPodSpeed) === rate)));
      };
      const toggleMute = () => {
        audio.muted = !audio.muted;
        if (speakBtn) speakBtn.classList.toggle('is-active', audio.muted);
      };

      // вычисление позиции по X
      const seekFromClientX = (clientX) => {
        if (!log) return;
        const rect = log.getBoundingClientRect();
        const x = Math.min(rect.right, Math.max(rect.left, clientX));
        const ratio = (x - rect.left) / rect.width;
        const dur = audio.duration || 0;
        if (dur > 0) audio.currentTime = ratio * dur;
      };

      // drag точки
      let dragging = false;
      const onPointerDown = (e) => {
        dragging = true;
        point?.setPointerCapture?.(e.pointerId);
        seekFromClientX(e.clientX);
        e.preventDefault();
      };
      const onPointerMove = (e) => { if (dragging) seekFromClientX(e.clientX); };
      const stopDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        point?.releasePointerCapture?.(e.pointerId);
      };

      // audio события
      audio.addEventListener('loadedmetadata', () => {
        renderProgress();
        renderTimer();
        renderDuration(); // НОВОЕ
      });
      audio.addEventListener('durationchange', renderDuration); // НОВОЕ
      audio.addEventListener('emptied', resetDuration); // НОВОЕ

      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('play',  () => setPlayingUI(true));
      audio.addEventListener('pause', () => setPlayingUI(false));
      audio.addEventListener('ended', () => setPlayingUI(false));

      // кнопки
      startBtn && startBtn.addEventListener('click', () => {
        // РАНЬШЕ: controller && controller.classList.add('is-active');
        // ТЕПЕРЬ: добавляем класс на сам контейнер подкаста
        root.classList.add('is-active');
        doPlay();
      });
      playBtn   && playBtn.addEventListener('click', () => {
        doToggle();
        playBtn.classList.toggle('is-active', !audio.paused);
      });
      restartBtn&& restartBtn.addEventListener('click', doRestart);
      backBtn   && backBtn.addEventListener('click', () => doSeekRel(-Number(backBtn.dataset.jsBack || 5)));
      nextBtn   && nextBtn.addEventListener('click', () => doSeekRel(+Number(nextBtn.dataset.jsNext || 5)));
      speakBtn  && speakBtn.addEventListener('click', toggleMute);
      speedBtns.forEach(btn => btn.addEventListener('click', () => setSpeed(Number(btn.dataset.jsPodSpeed || 1))));

      // клик по линии
      if (log) {
        if (!getComputedStyle(log).position || getComputedStyle(log).position === 'static') {
          log.style.position = 'relative';
        }
        log.addEventListener('click', (e) => {
          if (e.target === point) return;
          seekFromClientX(e.clientX);
        });
      }

      // перетаскивание точки
      if (point) {
        point.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup',   stopDrag);
        window.addEventListener('pointercancel', stopDrag);
        window.addEventListener('blur', stopDrag);
      }

      // init
      setSpeed(1);
      renderProgress();
      renderTimer();
      // НОВОЕ: сразу выставим длительность, если уже известна (метаданные успели загрузиться)
      if (isFinite(audio.duration) && audio.duration > 0) {
        renderDuration();
      } else {
        resetDuration();
      }
    });

    // авто-пауза остальных плееров
    audios.forEach(a => a.addEventListener('play', () => {
      audios.forEach(b => { if (b !== a && !b.paused) b.pause(); });
    }));
  })();
}

if (document.querySelector(".podcasts__single")) {
  (() => {
    const pad = (n) => String(Math.floor(n)).padStart(2, '0');
    const fmt = (sec) => {
      if (!isFinite(sec) || sec < 0) sec = 0;
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return `${pad(m)}:${pad(s)}`;
    };

    const root = document.querySelector('[data-js-pod-main]');
    if (!root) return;

    const audio      = root.querySelector('audio');
    if (!audio) return;

    const playBtn    = root.querySelector('[data-js-play]');
    const restartBtn = root.querySelector('[data-js-restart]');
    const backBtn    = root.querySelector('[data-js-back]');
    const nextBtn    = root.querySelector('[data-js-next]');
    const speakBtn   = root.querySelector('[data-js-speak]');
    const speedBtns  = Array.from(root.querySelectorAll('[data-js-pod-speed]'));
    const log        = root.querySelector('[data-js-loader]');
    const point      = root.querySelector('[data-js-point]');
    const timerEl    = root.querySelector('[data-js-timer]');
    const timerEndEls = Array.from(root.querySelectorAll('[data-js-timer-end]')); // NEW

    const setPlayingUI = (isPlaying) => {
      root.classList.toggle('is-playing', isPlaying);
      if (playBtn) playBtn.classList.toggle('is-active', isPlaying);
    };

    const renderProgress = () => {
      if (!point) return;
      const dur = audio.duration || 0;
      const ratio = dur ? Math.min(1, Math.max(0, audio.currentTime / dur)) : 0;
      point.style.left = (ratio * 100) + '%';
    };

    const renderTimer = () => {
      if (!timerEl) return;
      timerEl.textContent = fmt(audio.currentTime || 0);
    };

    // NEW: рендер длительности во все [data-js-timer-end] внутри root
    const renderTimerEnd = () => {
      if (!timerEndEls.length) return;
      const dur = (isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 0;
      const text = fmt(dur);
      timerEndEls.forEach(el => { el.textContent = text; });
    };

    const onTimeUpdate = () => {
      renderProgress();
      renderTimer();
    };

    const doPlay    = () => { audio.play().catch(()=>{}); };
    const doToggle  = () => { audio.paused ? doPlay() : audio.pause(); };
    const doRestart = () => { audio.currentTime = 0; doPlay(); };
    const doSeekRel = (delta) => {
      let t = (audio.currentTime || 0) + delta;
      if (isFinite(audio.duration)) t = Math.min(audio.duration - 0.01, Math.max(0, t));
      else t = Math.max(0, t);
      audio.currentTime = t;
    };
    const setSpeed = (rate) => {
      audio.playbackRate = rate;
      speedBtns.forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.jsPodSpeed) === rate)));
    };
    const toggleMute = () => {
      audio.muted = !audio.muted;
      if (speakBtn) speakBtn.classList.toggle('is-active', audio.muted);
    };

    const seekFromClientX = (clientX) => {
      if (!log) return;
      const rect = log.getBoundingClientRect();
      const x = Math.min(rect.right, Math.max(rect.left, clientX));
      const ratio = (x - rect.left) / rect.width;
      const dur = audio.duration || 0;
      if (dur > 0) audio.currentTime = ratio * dur;
    };

    // drag бегунка
    let dragging = false;
    const onPointerDown = (e) => {
      dragging = true;
      point?.setPointerCapture?.(e.pointerId);
      seekFromClientX(e.clientX);
      e.preventDefault();
    };
    const onPointerMove = (e) => { if (dragging) seekFromClientX(e.clientX); };
    const stopDrag = (e) => { if (dragging) { dragging = false; point?.releasePointerCapture?.(e.pointerId); } };

    // audio события
    audio.addEventListener('loadedmetadata', () => { renderProgress(); renderTimer(); renderTimerEnd(); }); // UPDATED
    audio.addEventListener('durationchange', renderTimerEnd); // NEW
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play',  () => setPlayingUI(true));
    audio.addEventListener('pause', () => setPlayingUI(false));
    audio.addEventListener('ended', () => setPlayingUI(false));

    // кнопки
    playBtn    && playBtn.addEventListener('click', doToggle);
    restartBtn && restartBtn.addEventListener('click', doRestart);
    backBtn    && backBtn.addEventListener('click', () => doSeekRel(-Number(backBtn.dataset.jsBack || 5)));
    nextBtn    && nextBtn.addEventListener('click', () => doSeekRel(+Number(nextBtn.dataset.jsNext || 5)));
    speakBtn   && speakBtn.addEventListener('click', toggleMute);
    speedBtns.forEach(btn => btn.addEventListener('click', () => setSpeed(Number(btn.dataset.jsPodSpeed || 1))));

    // клик по линии прогресса
    if (log) {
      const cs = getComputedStyle(log);
      if (!cs.position || cs.position === 'static') log.style.position = 'relative';
      log.addEventListener('click', (e) => {
        if (e.target === point) return;
        seekFromClientX(e.clientX);
      });
    }

    if (point) {
      point.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup',   stopDrag);
      window.addEventListener('pointercancel', stopDrag);
      window.addEventListener('blur', stopDrag);
    }

    // init
    setSpeed(1);
    renderProgress();
    renderTimer();
    // Если метаданные уже доступны (к примеру, при кэшированном источнике) — сразу выставим длительность
    if (audio.readyState >= 1) renderTimerEnd();
  })();
}


if (document.querySelector('[data-js-author]')) {
  new AjaxAuthor();
}

if (document.querySelector('[data-js-time]')) {
  (() => {
    const WPM = 190; // слов в минуту
    const EXCLUDE = [
      '.paper__title',
      '.paper__text',
      '.paper__line',
    ];

    const root = document.querySelector('.global__right');
    if (!root) return;

    // --- Собираем текст ---
    const isExcluded = (el) => el && EXCLUDE.some(s => el.closest(s));
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const t = node.nodeValue.trim();
        if (!t) return NodeFilter.FILTER_REJECT;
        if (isExcluded(node.parentElement)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let text = '';
    while (walker.nextNode()) text += ' ' + walker.currentNode.nodeValue;

    // --- Подсчёт слов ---
    const words = (text.match(/[\p{L}\p{N}'’-]+/gu) || []).length;

    // --- Подсчёт изображений ---
    const imgs = Array.from(root.querySelectorAll('img')).filter(img => !isExcluded(img));
    let imgSec = 0;
    for (let i = 0; i < imgs.length; i++) {
      imgSec += Math.max(3, 12 - i);
    }

    // --- Итог ---
    const totalSec = Math.ceil((words / WPM) * 60 + imgSec);

    // --- Вставляем в data-js-time ---
    const el = document.querySelector('[data-js-time]');
    if (el) {

      el.textContent = `${Math.round(totalSec / 60)} мин (${totalSec} сек)`;
      // если нужно — можно добавить в title для отладки:
      el.title = `≈ ${Math.round(totalSec / 60)} мин (${totalSec} сек)`;
    }
  })();
}

if (document.querySelector('[data-js-nav]')) {
  // Находим все заголовки
  const titles = document.querySelectorAll('.crypt__start-title, .paper__title');

  // Если заголовки найдены
  if (titles.length) {
    // Находим первый crypt__start-title
    const firstCryptTitle = document.querySelector('.crypt__start-title');

    // Находим все paper__title
    const paperTitles = document.querySelectorAll('.paper__title');

    // Создаём общий массив для навигации
    const allTitles = [];

    if (firstCryptTitle) allTitles.push(firstCryptTitle);
    paperTitles.forEach(el => allTitles.push(el));

    if (allTitles.length) {
      // Создаем основной контейнер
      const wrapper = document.createElement('div');
      wrapper.className = 'paper__content';

      // Заголовок навигации
      const title = document.createElement('p');
      title.className = 'paper__content-title';
      title.textContent = 'Содержание';
      wrapper.appendChild(title);

      // Список
      const ul = document.createElement('ul');
      ul.className = 'paper__content-list';

      let counter = 1;

      allTitles.forEach(el => {
        const text = el.textContent.trim();
        let id = el.id || `section-${counter}`;

        // Гарантируем уникальность
        if (document.getElementById(id)) id = `section-${counter}`;
        el.id = id;
        counter++;

        // Формируем ссылку
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = text;

        li.appendChild(a);
        ul.appendChild(li);
      });

      wrapper.appendChild(ul);

      // Вставляем в data-js-nav
      const navTarget = document.querySelector('[data-js-nav]');
      if (navTarget) {
        navTarget.innerHTML = ''; // очищаем
        navTarget.appendChild(wrapper);
      }
    }
  }
}

if (document.querySelector('.question__slider')) {
  const swiper = new Swiper('.swiper-author', {
    slidesPerView: 2,
    spaceBetween: 30,
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  });
}

if (document.querySelectorAll("[data-js-select-question]")) {
  const DURATION = 200; // ms

  const selects = document.querySelectorAll('[data-js-select-question]');

  selects.forEach((select) => {
    const btn = select.querySelector('[data-js-button]');
    const wrapper = select.querySelector('[data-js-wrapper]');
    const content = select.querySelector('[data-js-content]');
    const input = select.querySelector('[data-js-input]');

    if (!btn || !wrapper || !content || !input) return;

    let isOpen = false;
    let animating = false;

    // init accessible state
    btn.setAttribute('aria-expanded', 'false');
    // default styles for animation
    wrapper.style.display = wrapper.style.display || 'none';
    wrapper.style.overflow = 'hidden';

    const open = () => {
      if (animating || isOpen) return;
      animating = true;

      // add active class
      select.classList.add('is-active');

      wrapper.style.display = 'block';
      wrapper.style.height = '0px';

      requestAnimationFrame(() => {
        const targetH = content.offsetHeight;
        wrapper.style.transition = `height ${DURATION}ms ease`;
        wrapper.style.height = targetH + 'px';

        setTimeout(() => {
          wrapper.style.transition = '';
          wrapper.style.height = 'auto';
          wrapper.style.overflow = '';
          animating = false;
          isOpen = true;
          btn.setAttribute('aria-expanded', 'true');
        }, DURATION);
      });
    };

    const close = () => {
      if (animating || !isOpen) return;
      animating = true;

      // remove active class
      select.classList.remove('is-active');

      const startH = content.offsetHeight;
      wrapper.style.height = startH + 'px';
      wrapper.style.overflow = 'hidden';

      requestAnimationFrame(() => {
        wrapper.style.transition = `height ${DURATION}ms ease`;
        wrapper.style.height = '0px';

        setTimeout(() => {
          wrapper.style.transition = '';
          wrapper.style.display = 'none';
          wrapper.style.height = '';
          wrapper.style.overflow = '';
          animating = false;
          isOpen = false;
          btn.setAttribute('aria-expanded', 'false');
        }, DURATION);
      });
    };

    // toggle on button click
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (animating) return;
      isOpen ? close() : open();
    });

    // choose item (prevent default to avoid form submit / navigation)
    const items = select.querySelectorAll('[data-js-slug]');
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault(); // отключаем переход / submit

        const slug = item.getAttribute('data-js-slug') ?? '';
        const text = item.textContent.trim();

        // записываем в input.value
        input.value = slug;

        // заменяем видимый текст кнопки (если нужно сохранить иконки/HTML — скажи, переделаю)
        btn.textContent = text;

        // пометка что выбран элемент
        if (slug !== '') {
          select.classList.add('is-pick');
        } else {
          select.classList.remove('is-pick');
        }

        close();
      });
    });

    // Закрывать при клике вне селекта
    document.addEventListener('click', (e) => {
      if (!isOpen) return;
      if (select.contains(e.target)) return;
      close();
    });

    // Закрывать на ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    });
  });
}

if (document.querySelectorAll("[data-js-checkbox]")) {
  document.querySelectorAll('[data-js-checkbox]').forEach(btn => {
        const input = btn.querySelector('[data-js-input]');

        if (!input) return;

        const syncActiveClass = () => {
            btn.classList.toggle('is-active', input.checked);
        };

        // 1. Полностью отключаем любое поведение у кнопки
        btn.addEventListener('click', e => {
            e.preventDefault();      // отключаем submit у <button>
            e.stopPropagation();     // на всякий случай

            // если кликнули прямо по инпуту — ничего не делаем
            if (e.target === input) return;

            input.checked = !input.checked;
            syncActiveClass();
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // 2. Отключаем любое стандартное поведение у самого чекбокса
        input.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
        });

        // 3. Если чекбокс меняют через клавиатуру (пробел) — тоже не даём submit
        input.addEventListener('keydown', e => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
            }
        });

        // Синхронизация состояния
        input.addEventListener('change', syncActiveClass);
        syncActiveClass(); // при загрузке
    });
}


if (document.querySelector('[data-js-question]')) {
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('[data-js-question]');
    if (!forms.length) return;

    forms.forEach(form => initQuestionForm(form));

    function initQuestionForm(form) {
        // Отключаем стандартное поведение формы
        form.setAttribute('novalidate', 'novalidate');
        form.addEventListener('submit', (e) => e.preventDefault());

        // Блокируем Enter в inputs
        form.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName.toLowerCase() === 'input') {
                e.preventDefault();
            }
        });

        // Делаем все кнопки type="button"
        form.querySelectorAll('button').forEach(btn => {
            if (!btn.hasAttribute('type')) btn.setAttribute('type', 'button');
        });

        // Элементы формы
        const requiredBlocks = form.querySelectorAll('[data-js-input]');
        const submitBtn      = form.querySelector('[data-js-submit]');
        const authorInput    = form.querySelector('[name="author"]');

        // Модалки
        const modalTrue  = form.querySelector('[data-js-modal-true]');
        const modalFalse = form.querySelector('[data-js-modal-flase]');

        // -------- ВАЛИДАЦИЯ --------

        function validateBlock(block) {
            let field;

            if (block.matches('input, textarea')) {
                field = block;
            } else {
                field = block.querySelector('input, textarea');
            }
            if (!field) return true;

            let isValid = true;

            if (field.type === 'checkbox') {
                isValid = field.checked;
            } else {
                isValid = field.value.trim() !== '';
            }

            if (!isValid) block.classList.add('is-false');
            else block.classList.remove('is-false');

            return isValid;
        }

        function validateForm() {
            let ok = true;
            requiredBlocks.forEach(block => {
                if (!validateBlock(block)) ok = false;
            });
            return ok;
        }

        // Убираем ошибки при вводе
        requiredBlocks.forEach(block => {
            let field = block.matches('input, textarea')
                ? block
                : block.querySelector('input, textarea');

            if (!field) return;

            const handler = () => validateBlock(block);
            field.addEventListener('input', handler);
            if (field.type === 'checkbox') field.addEventListener('change', handler);
        });

        // -------- КАСТОМНЫЙ SELECT АВТОРА --------

        const authorButtons = form.querySelectorAll('[data-js-slug]');
        authorButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const slug = btn.dataset.jsSlug || '';
                authorInput.value = slug;

                let block = authorInput.matches('[data-js-input]')
                    ? authorInput
                    : authorInput.closest('[data-js-input]');

                if (block) validateBlock(block);
            });
        });

        // -------- ОТПРАВКА --------

        if (submitBtn) {
            submitBtn.addEventListener('click', async () => {
                // Скрываем модалки до отправки
                if (modalTrue)  modalTrue.classList.remove('is-active');
                if (modalFalse) modalFalse.classList.remove('is-active');

                // Валидация
                const valid = validateForm();
                if (!valid) {
                    console.log('❌ Ошибки в форме');
                    // Модалку ошибки показываем только ПОСЛЕ ответа сервера — значит не показываем её здесь
                    return;
                }

                // Собираем данные
                const nameField = form.querySelector('input[placeholder="Ваше имя"]');
                const mailField = form.querySelector('input[placeholder="Ваш e-mail"]');
                const textField = form.querySelector('textarea');

                const resultData = {
                    slug: authorInput ? authorInput.value.trim() : '',
                    name: nameField ? nameField.value.trim() : '',
                    mail: mailField ? mailField.value.trim() : '',
                    text: textField ? textField.value.trim() : '',
                };

                console.log('📤 Отправляем:', resultData);

                try {
                    const response = await fetch('http://bit.jobmori1.beget.tech/wp-admin/admin-ajax.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        },
                        body: new URLSearchParams({
                            action: 'send_question',
                            data: JSON.stringify(resultData),
                        }),
                    });

                    const json = await response.json();
                    console.log('📥 Ответ сервера:', json);

                    // ВАЖНО: только после ответа сервера показываем модалку
                    if (json.success) {
                        if (modalTrue) modalTrue.classList.add('is-active');
                    } else {
                        if (modalFalse) modalFalse.classList.add('is-active');
                    }

                } catch (err) {
                    console.log('❌ Ошибка сети/JS:', err);

                    // Показ модалки ошибки ПОСЛЕ ошибки сети
                    if (modalFalse) modalFalse.classList.add('is-active');
                }
            });
        }
    }
});

}

if (document.querySelector('[data-js-question]')) {
  new AjaxQuestions();
}