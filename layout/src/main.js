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
