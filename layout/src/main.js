import { useDynamicAdapt } from './script/dynamicAdapt';
import ControllerScroll from './script/controllerScroll';
import {OpenModal, CloseModal} from './script/controllerModal';

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
});




