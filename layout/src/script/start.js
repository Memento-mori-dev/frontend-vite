const tl = gsap.timeline();

// // 1. Анимация всех элементов
tl.to(".start__loading-item", {
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)",
    duration: 1.5,
    ease: "power1.inOut",
    stagger: {
        each: 0.01, // небольшой каскад
        from: "random" // случайный порядок
    }
});

// // 2. Затем анимация .start
tl.from(".start__logo", {
    scale: 0.8,  // Начальный масштаб (можно изменить)
    filter: "blur(20px)",  // Начальное размытие
    opacity: 0,  // Начальная прозрачность
    duration: 1,  // Длительность анимации
    ease: "power2.out",  // Функция плавности
    onComplete: function() {
        // Действия после завершения анимации
        console.log("Анимация завершена");
        // document.querySelector(".start").style.display = "none";
    }
}, "-=1.5");