import { useDynamicAdapt } from './script/dynamicAdapt';
import ControllerScroll from './script/controllerScroll';
import {OpenModal, CloseModal} from './script/controllerModal';
import ControllerShow from './script/controllerShow';
import ControllerTabs from './script/controllerTabs';
import ControllerVideo from './script/controllerVideo';
import ControllerToggle from './script/controllerToggle';

useDynamicAdapt();

let controllerScroll = new ControllerScroll();

new OpenModal(controllerScroll.stop.bind(controllerScroll));
new CloseModal(controllerScroll.play.bind(controllerScroll));

Inputmask({"mask": "+7 (999) 999-99-99"}).mask(document.querySelectorAll('[data-js-phone]'));

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('[data-js-crm]');
    if (!forms) return;

    forms.forEach(form => {
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
    })
    
    gsapAnimation();
});

function gsapAnimation() {
  let width = window.innerWidth;

      document.querySelectorAll(".parent-w").forEach((parent) => {
      const scrollContainer = parent.querySelector(".scroll-container-w");
      const children = scrollContainer.querySelectorAll(".child-w");

      // Вычисляем ширину прокрутки (общая ширина контейнера минус ширина родителя)
      const scrollWidth = scrollContainer.scrollWidth - parent.offsetWidth;

      // Анимация появления родительского контейнера
      gsap.fromTo(
        parent,
        {
          opacity: 0,
          x: -100, // Начальное смещение влево
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 80%", // Начало анимации появления, когда верх родителя достигает 80% окна
            end: "top 50%", // Конец анимации появления
            scrub: false, // Анимация появления не синхронизируется с прокруткой
            toggleActions: "play none none none", // Проигрывается один раз
          },
        }
      );
      if (width >= 1400.98) {
        // Горизонтальная прокрутка (ваш исходный код)
        gsap.to(scrollContainer, {
          x: -scrollWidth, // Прокручиваем влево на ширину контента
          ease: "none", // Без смягчения, чтобы анимация была линейной
          scrollTrigger: {
            trigger: parent, // Триггер — родительский блок
            start: "top +=20%", // Начало горизонтальной прокрутки: верх родителя прижат к верху окна
            end: () => `+=${scrollWidth}`, // Конец: зависит от ширины прокрутки
            pin: true, // Фиксируем родительский блок
            scrub: 0.5, // Плавная синхронизация (0.5 для легкой инерции)
            invalidateOnRefresh: true, // Пересчитываем при ресайзе
          },
        });
      }
    });


  gsap.fromTo(
    '.opacity-top',
    {
      opacity: 0,
      y: -50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.opacity-top', // Элемент, который запускает анимацию
        start: 'top 80%', // Анимация начинается, когда верх элемента достигает 80% высоты окна
        end: 'top 20%', // Анимация заканчивается, когда верх элемента достигает 20% высоты окна
        scrub: false, // Анимация не привязана к скроллу (выполняется один раз)
        toggleActions: 'play none none none', // Поведение: play при входе, ничего при других событиях
      },
    }
  );

  document.querySelectorAll('.opacity-bottom').forEach((bottom, index) => {
    const newClass = `opacity-bottom-${index}`;

    bottom.classList.add(newClass);

    gsap.fromTo(
      `.${newClass}`,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${newClass}`, // Элемент, который запускает анимацию
          start: 'top 80%', // Анимация начинается, когда верх элемента достигает 80% высоты окна
          end: 'top 20%', // Анимация заканчивается, когда верх элемента достигает 20% высоты окна
          scrub: false, // Анимация не привязана к скроллу (выполняется один раз)
          // toggleActions: 'play none none none', // Поведение: play при входе, ничего при других событиях
        },
      }
    );
  })

  document.querySelectorAll('.opacity-left').forEach((bottom, index) => {
    const newClass = `opacity-left-${index}`;

    bottom.classList.add(newClass);
    gsap.fromTo(
      `.${newClass}`,
      {
        opacity: 0,
        x: -100, // Смещение влево
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${newClass}`,
          start: "top 80%", // Начало анимации, когда верх секции достигает 80% окна
          end: "top 30%",
          scrub: false,
          toggleActions: "play none none none",
        },
      }
    );
  })

  document.querySelectorAll('.opacity-right').forEach((bottom, index) => {
    const newClass = `opacity-right-${index}`;

    bottom.classList.add(newClass);
    gsap.fromTo(
      `.${newClass}`,
      {
        opacity: 0,
        x: 100, // Смещение влево
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${newClass}`,
          start: "top 80%", // Начало анимации, когда верх секции достигает 80% окна
          end: "top 30%",
          scrub: false,
          toggleActions: "play none none none",
        },
      }
    );
  })

  document.querySelectorAll(".swiper-section").forEach((slider, index) => {
    const newClass = `swiper-section-${index}`;

    slider.classList.add(newClass);

    gsap.fromTo(
      `.${newClass}`,
      {
        opacity: 0,
        y: 50, // Смещение вниз
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${newClass}`, // Элемент, который запускает анимацию
          start: "top 80%", // Начало анимации, когда верх секции достигает 80% высоты окна
          end: "top 30%", // Конец анимации
          scrub: false, // Анимация не будет "скроллиться" назад
          toggleActions: "play none none none", // Анимация проигрывается только один раз
        },
      }
    );
  })

  // const header = document.querySelector('.header');
      
  // ScrollTrigger.create({
  //   start: 0, // начинаем отслеживать с верха страницы
  //   end: "max", // до конца страницы
  //   onUpdate: (self) => {
  //     // Если прокрутка больше 10px - добавляем класс, иначе удаляем
  //     if (self.scroll() > 10) {
  //       header.classList.add('is-scroll');
  //     } else {
  //       header.classList.remove('is-scroll');
  //     }
  //   }
  // });

  if (width >=  1023.98) {
    document.querySelectorAll(".parent").forEach((parent, index) => {
      const stickyChild = parent.querySelector(".sticky-child");
      stickyChild.classList.add(`sticky-child-${index}`)

      gsap.to(stickyChild, {
        scrollTrigger: {
          trigger: parent,
          start: "top +=20%", // Начало: верх родителя достигает верха окна
          end: "bottom +=40%", // Конец: низ родителя достигает низа окна
          pin: `.sticky-child-${index}`, // Фиксируем дочерний блок
          pinSpacing: false, // Отключаем дополнительное пространство
          scrub: true // Плавная синхронизация с прокруткой
        },
        ease: "power1.out"
      });
    }); 
  }else{
    // ScrollTrigger.normalizeScroll({
    //   allowNestedScroll: true
    // });
    // gsap.registerPlugin(ScrollToPlugin);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Отменяем стандартное поведение
        const targetId = this.getAttribute('href'); // Получаем ID цели
        gsap.to(window, { 
          duration: 1, 
          scrollTo: { 
            y: targetId, 
            offsetY: 50 // Добавляем отступ в 50 пикселей
          } 
        }); // Плавная прокрутка с отступом
      });
    });
  }

  // ScrollTrigger.refresh();
}

new ControllerShow('.header', '.button--menu', '.header__menu', '.header__menu-content', '.header__menu-content a', '.header');

new ControllerTabs('.teachers', '.teachers__item', '.teachers__item-banner-flag', '.teachers__item-banner-description');

new ControllerVideo('.button--play');

new ControllerToggle('.questions__cards-item', '.questions__cards-button', '.questions__cards-content', '.questions__cards-text');

new ControllerToggle('.seo', '.seo__active', '.seo__wrapper', '.seo__block');



