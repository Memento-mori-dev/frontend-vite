import { useDynamicAdapt } from "./script/dynamicAdapt";
import { initSwiper } from "./script/swiper";
import Video from "./script/Video";
import { Inst } from "./script/Inst";
import { AjaxNews } from "./script/AjaxNews";

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
      });
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
  audio.addEventListener('loadedmetadata', () => { renderProgress(); renderTimer(); });
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
})();
}