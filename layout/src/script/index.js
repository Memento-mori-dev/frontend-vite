document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      const scrollGsap = () => {
        const inner = document.querySelector(".slider__container");
        const block = document.querySelectorAll(".slider__item");
        const gap = Number(window.getComputedStyle(inner)['column-gap'].split('p')[0]);
        const blockWidth = block[0].offsetWidth;
        const newX = blockWidth + gap;

        // Удаляем предыдущую анимацию, если есть
        gsap.killTweensOf(inner);

        gsap.to(inner, {
          x: -newX,
          duration: 10,
          ease: "none",
          // repeat: -1,
          onComplete: function() {
            let newLastElement = document.querySelector(".slider__item");
            gsap.set(this.targets()[0], { x: -0});

            inner.appendChild(newLastElement)
            this.restart();
          },
        });
        
      }
      scrollGsap();

      let showElement = (querySelector) => {
        gsap.from(`${querySelector}`, {
          scrollTrigger: {
            trigger: `${querySelector}`,
            start: "top 80%", // когда верх элемента достигнет 80% высоты окна
            toggleActions: "play none none none" // play при входе в зону видимости
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
        });
      }

      showElement('.hero');
      showElement('.presentation');
      showElement('.footer');

      const stickyQuestion = () => {
        const width = window.innerWidth;

        gsap.killTweensOf(document.querySelector('.question__animate-content'));

        if (width >= 1401) {
          gsap.to(".question__animate-content", {
            scrollTrigger: {
              trigger: ".question__animate-wrapeer", // элемент, относительно которого работает sticky
              start: "top +=160",     // когда верх триггера достигнет верха viewport
              end: "bottom +=130", // когда низ триггера достигнет низа viewport
              pin: true,            // закрепляем элемент
            }
          });    
        }
      }
      stickyQuestion()

      // Обработка изменения размера окна
      const resizeObserverScroll = new ResizeObserver(scrollGsap);
      resizeObserverScroll.observe(document.querySelector('.slider__container'));

      const resizeObserverSticky = new ResizeObserver(stickyQuestion);
      resizeObserverSticky.observe(document.querySelector('.slider__container'));
})