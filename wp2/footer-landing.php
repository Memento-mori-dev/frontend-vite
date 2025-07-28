    <footer class="footer section">
        <div class="footer__container container">
          <div class="footer__main">
            <p class="h1 text-up">мы <span class="text-line">ждем</span> тебя!</p>
            <div class="footer__main-button">
              <button class="button button--85 button--blue" data-js-modal-open="1">
                  <span>
                    Записаться на бесплатное занятие
                  </span>

                  <span class="icon-right">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" width="29" height="29" rx="14.5" fill="#F8F8F8"></rect>
                      <path d="M10.505 18.005C10.2317 18.2784 10.2317 18.7216 10.505 18.995C10.7784 19.2683 11.2216 19.2683 11.495 18.995L10.505 18.005ZM19.7 10.5C19.7 10.1134 19.3866 9.8 19 9.8H12.7C12.3134 9.8 12 10.1134 12 10.5C12 10.8866 12.3134 11.2 12.7 11.2H18.3V16.8C18.3 17.1866 18.6134 17.5 19 17.5C19.3866 17.5 19.7 17.1866 19.7 16.8V10.5ZM11 18.5L11.495 18.995L19.495 10.995L19 10.5L18.505 10.005L10.505 18.005L11 18.5Z" fill="#12B0EA"></path>
                    </svg>
                  </span>
                </button>
            </div>
          </div>
          <div class="footer__about">
            <p class="footer__about-text">Big Drum Family Барабанная школа для детей и взрослых</p>
            <div class="footer__about-link">
              <a href="https://drumfamily.ru/politika">Cогласие обработки персональных данных</a>
            </div>
          </div>
          <div class="footer__images">
            <img src="<?=get_template_directory_uri()?>/assets-landing/assets/footer-TV7ni7PO.webp" alt="барабан">
          </div>
        </div>
      </footer>
    </div>

    <div class="modal" data-js-modal>
      <div class="modal__item modal__item--sticks" data-js-modal-item="1">
        <div class="modal__block">
          <div class="modal__block-title">
            <p class="text-up">
              Запишитесь на <br> <span class="text-line">бесплатное</span> занятие
            </p>
          </div>

          <form action="send.php" method="POST" class="modal__block-form">
            <div class="modal__block-item">
              <input type="text" placeholder="Введите ваше имя" name="name" class="modal__block-input">
            </div>
            <div class="modal__block-item">
              <input type="text" placeholder="Введите ваш номер телефона" name="phone" class="modal__block-input" data-js-phone>
            </div>
            <div class="modal__block-item">
              <button type="submit" class="button button--85 button--blue button--submit">
                <span>
                  Записаться на бесплатное занятие
                </span>

                <span class="icon-right">
                  <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" width="29" height="29" rx="14.5" fill="#F8F8F8"></rect>
                    <path d="M10.505 18.005C10.2317 18.2784 10.2317 18.7216 10.505 18.995C10.7784 19.2683 11.2216 19.2683 11.495 18.995L10.505 18.005ZM19.7 10.5C19.7 10.1134 19.3866 9.8 19 9.8H12.7C12.3134 9.8 12 10.1134 12 10.5C12 10.8866 12.3134 11.2 12.7 11.2H18.3V16.8C18.3 17.1866 18.6134 17.5 19 17.5C19.3866 17.5 19.7 17.1866 19.7 16.8V10.5ZM11 18.5L11.495 18.995L19.495 10.995L19 10.5L18.505 10.005L10.505 18.005L11 18.5Z" fill="#12B0EA"></path>
                  </svg>
                </span>
              </button>
            </div>
          </form>

          <div class="modal__block-item">
            <div class="modal__block-about">
              <p class="modal__block-about-text">
                нажимая на кнопку, вы соглашаетесь с
              </p>
              <p class="modal__block-about-text">
                <a href="https://drumfamily.ru/politika">политикой обработки персональных</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
