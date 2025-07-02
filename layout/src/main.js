import { useDynamicAdapt } from './script/dynamicAdapt';
import ControllerScroll from './script/controllerScroll';
import {OpenModal, CloseModal} from './script/controllerModal';
import ControllerShow from './script/controllerShow';
import ControllerTabs from './script/controllerTabs';
import ControllerVideo from './script/controllerVideo';

useDynamicAdapt();

let controllerScroll = new ControllerScroll();

new OpenModal(controllerScroll.stop.bind(controllerScroll));
new CloseModal(controllerScroll.play.bind(controllerScroll));

Inputmask({"mask": "+7 (999) 999-99-99"}).mask(document.querySelector('[data-js-phone]'));

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.modal__block-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      // Удаляем старое сообщение, если есть
      let oldMsg = form.querySelector('.form-msg');
      if (oldMsg) oldMsg.remove();

      try {
        const response = await fetch('send.php', {
          method: 'POST',
          body: formData
        });
        const text = await response.text();
        let msg = document.createElement('div');
        msg.className = 'form-msg';
        msg.style.marginTop = '10px';
        msg.style.color = response.ok ? 'green' : 'red';
        msg.textContent = response.ok ? 'Заявка успешно отправлена!' : ('Ошибка: ' + text);
        form.appendChild(msg);
        if (response.ok) form.reset();
      } catch (err) {
        let msg = document.createElement('div');
        msg.className = 'form-msg';
        msg.style.marginTop = '10px';
        msg.style.color = 'red';
        msg.textContent = 'Ошибка отправки. Попробуйте позже.';
        form.appendChild(msg);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });


    //gsap
    function initScrollHeader() {
        const header = document.querySelector('.header');
        
        ScrollTrigger.create({
          start: 0, // начинаем отслеживать с верха страницы
          end: "max", // до конца страницы
          onUpdate: (self) => {
            // Если прокрутка больше 10px - добавляем класс, иначе удаляем
            if (self.scroll() > 10) {
              header.classList.add('is-scroll');
            } else {
              header.classList.remove('is-scroll');
            }
          }
        });
    }

    initScrollHeader();

    document.querySelectorAll(".parent-w").forEach((parent) => {
      const scrollContainer = parent.querySelector(".scroll-container-w");
      const children = scrollContainer.querySelectorAll(".child-w");
      
      // Вычисляем ширину прокрутки (общая ширина контейнера минус ширина родителя)
      const scrollWidth = scrollContainer.scrollWidth - parent.offsetWidth;

      gsap.to(scrollContainer, {
        x: -scrollWidth, // Прокручиваем влево на ширину контента
        ease: "none", // Без смягчения, чтобы анимация была линейной
        scrollTrigger: {
          trigger: parent, // Триггер — родительский блок
          start: "top +=20%", // Начало: верх родителя достигает верха окна
          end: () => `+=${scrollWidth}`, // Конец: зависит от ширины прокрутки
          pin: true, // Фиксируем родительский блок
          scrub: 0.5, // Плавная синхронизация (0.5 для легкой инерции)
          invalidateOnRefresh: true, // Пересчитываем при ресайзе
        }
      });
    });

    document.querySelectorAll(".parent").forEach((parent, index) => {
      const stickyChild = parent.querySelector(".sticky-child");
      stickyChild.classList.add(`sticky-child-${index}`)

      gsap.to(stickyChild, {
        scrollTrigger: {
          trigger: parent,
          start: "top +=20%", // Начало: верх родителя достигает верха окна
          end: "bottom +=32%", // Конец: низ родителя достигает низа окна
          pin: `.sticky-child-${index}`, // Фиксируем дочерний блок
          pinSpacing: false, // Отключаем дополнительное пространство
          scrub: true // Плавная синхронизация с прокруткой
        },
        ease: "power1.out"
      });
    });


});

new ControllerShow('.header__city', '.header__city-title', '.header__city-wrapper', '.header__city-select');
new ControllerShow('.header', '.button--menu', '.header__menu', '.header__menu-content');

new ControllerTabs('.teachers', '.teachers__item', '.teachers__item-banner-flag', '.teachers__item-banner-description');

new ControllerVideo('.button--play', '.button--play__video');




