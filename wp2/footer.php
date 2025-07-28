<?
    $indexACF = 9;
    $mainACF = get_field('основа', $indexACF);
    $mainCityArr = wp_get_nav_menu_items('city');
?>
        <footer class="footer opacity-bottom">
            <div class="container">
                <div class="footer__main">
                <div class="footer__main-item">
                    <p>ИП <?=$mainACF['ип'];?></p>
                </div>
                <div class="footer__main-item">
                    <p>ИНН: <?=$mainACF['инн_номер'];?></p>
                </div>
                <div class="footer__main-item">
                    <p>ОРГНИП: <?=$mainACF['оргнип_номер'];?></p>
                </div>
                <div class="footer__main-item">
                    <a href="/politics/">Политика конфиденциальности</a>
                </div>
                <div class="footer__main-item">
                    <a href="#" class="button-up" data-da=".up-button-phone,767.98,1">
                    <span>Наверх</span>
                    <span class="icon-right"><img src="data:image/svg+xml,%3csvg%20width='11'%20height='13'%20viewBox='0%200%2011%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4.79999%2012.0553C4.79999%2012.4419%205.11339%2012.7553%205.49999%2012.7553C5.88659%2012.7553%206.19999%2012.4419%206.19999%2012.0553L4.79999%2012.0553ZM5.99497%200.246609C5.7216%20-0.0267583%205.27839%20-0.0267585%205.00502%200.246609L0.550247%204.70138C0.27688%204.97475%200.27688%205.41796%200.550247%205.69133C0.823614%205.9647%201.26683%205.9647%201.5402%205.69133L5.49999%201.73153L9.45979%205.69133C9.73316%205.9647%2010.1764%205.9647%2010.4497%205.69133C10.7231%205.41796%2010.7231%204.97475%2010.4497%204.70138L5.99497%200.246609ZM5.49999%2012.0553L6.19999%2012.0553V0.741583L5.49999%200.741583L4.79999%200.741583V12.0553L5.49999%2012.0553Z'%20fill='white'/%3e%3c/svg%3e" alt="arrow"></span>
                    </a>
                </div>
                </div>

                <div class="footer__about">
                <div class="footer__about-left">
                    <p class="footer__about-text">* Meta, в том числе ее продукты Facebook и Instagram, признана экстремистской организацией в России</p>
                </div>
                <div class="footer__about-right">
                    <p class="footer__about-text">Разработка и продвижение сайта:</p>
                    <a href="https://ledoffsky.agency/" class="footer__about-logo">
                    <img src="data:image/png;base64,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" alt="logo" width="160" height="26">
                    </a>
                </div>
                </div>
            </div>
        </footer>

    <div class="up-button-phone">

    </div>
</div>

  <div class="modal" data-js-modal>
    <div class="modal__item modal__item--sticks" data-js-modal-item="1">
      <div class="modal__block">
        <div class="modal__block-title">
          <p class="text-up">
            Перезвоним в течение <span class="text-line">30 минут</span> и согласуем дату и время урока
          </p>
        </div>

        <form action="send.php" method="POST" class="modal__block-form" data-js-crm>
          <div class="modal__block-item">
            <label class="input__new">
              <input type="text" class="input__new-input" placeholder=" " name="name" >
              <span class="input__new-name">Введите ваше имя</span>
            </label>
          </div>

          <div class="modal__block-item">
            <label class="input__new">
              <input type="text" class="input__new-input" placeholder=" " name="phone" data-js-phone>
              <span class="input__new-name">Введите ваш номер телефона</span>
            </label>
          </div>

          <div class="modal__block-item">
            <button type="submit" class="button button--85 button--blue button--submit">
              <span class="button__pc">
                Записаться на пробный урок!
              </span>

              <span class="button__phone">
                Связаться с нами
              </span>

              <span class="icon-right">
                <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="29" height="29" rx="14.5" fill="#F8F8F8"></rect>
                  <path
                    d="M10.505 18.005C10.2317 18.2784 10.2317 18.7216 10.505 18.995C10.7784 19.2683 11.2216 19.2683 11.495 18.995L10.505 18.005ZM19.7 10.5C19.7 10.1134 19.3866 9.8 19 9.8H12.7C12.3134 9.8 12 10.1134 12 10.5C12 10.8866 12.3134 11.2 12.7 11.2H18.3V16.8C18.3 17.1866 18.6134 17.5 19 17.5C19.3866 17.5 19.7 17.1866 19.7 16.8V10.5ZM11 18.5L11.495 18.995L19.495 10.995L19 10.5L18.505 10.005L10.505 18.005L11 18.5Z"
                    fill="#12B0EA"></path>
                </svg>
              </span>
            </button>
          </div>
        </form>

        <div class="modal__block-item">
          <div class="modal__block-about">
            <p class="modal__block-about-text">
              Оставляя заявку, вы даете согласие на обработку
            </p>
            <p class="modal__block-about-text">
              <a href="/politics/">своих персональных данных</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal__item modal__item--sticks" data-js-modal-item="2">
      <div class="modal__block city-modal">
        <div class="modal__block-title">
          <p class="text-up">
            выберите ваш город
          </p>
        </div>

        <div class="city__content">

          <? foreach ($mainCityArr as $key => $value): ?>
            <a href="<?=$value->url;?>" class="button button--78 button--blue">
              <?=$value->post_title;?>
            </a>
          <? endforeach; ?>

        </div>
      </div>
    </div>

    <div class="modal__item" data-js-video>
      <div class="modal__block city-modal">
        <video src="" controls width="1000"></video>
      </div>
    </div>
  </div>



  <? wp_footer();?>


</body>

</html>