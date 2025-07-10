<?
    $indexACF = 9;
    $mainACF = get_field('основа', $indexACF);
    $heroACF = get_field('hero', $indexACF);
    $whyACF = get_field('why-us', $indexACF);
    $watchACF = get_field('watch', $indexACF);
    $lessonACF = get_field('lesson', $indexACF);
    $whomACF = get_field('whom', $indexACF);
    $teachersACF = get_field('teachers', $indexACF);
    $remainedACF = get_field('remained', $indexACF);
    $concertACF = get_field('concert', $indexACF);
    $questionsACF = get_field('questions', $indexACF);
    $mapACF = get_field('map', $indexACF);
    
    

    // echo '<pre>';
    // print_r($remainedACF);
    // echo '</pre>';
?>

<?php get_header();?>
  <main>
    <section class="hero opacity-bottom">
      <div class="hero__container container">
        <div class="hero__content">
          <div class="hero__title">
            <p class="h1 text-up complex-text">
              <?=$heroACF['title'];?> <span class="hero__title-add"><?=$heroACF['sub_title'];?></span>
            </p>
          </div>

          <div class="hero__button">
            <button class="button button--100 button--blue blink"  data-js-modal-open="1">
              <span>
                Записаться на <span class="hero__button-span">пробный</span> урок!
              </span>

              <span class="icon-right">
                <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" width="29" height="29" rx="14.5" fill="#F8F8F8" />
                  <path d="M10.505 18.005C10.2317 18.2784 10.2317 18.7216 10.505 18.995C10.7784 19.2683 11.2216 19.2683 11.495 18.995L10.505 18.005ZM19.7 10.5C19.7 10.1134 19.3866 9.8 19 9.8H12.7C12.3134 9.8 12 10.1134 12 10.5C12 10.8866 12.3134 11.2 12.7 11.2H18.3V16.8C18.3 17.1866 18.6134 17.5 19 17.5C19.3866 17.5 19.7 17.1866 19.7 16.8V10.5ZM11 18.5L11.495 18.995L19.495 10.995L19 10.5L18.505 10.005L10.505 18.005L11 18.5Z" fill="#12B0EA" />
                </svg>
              </span>
            </button>

            <div class="hero__button-line">
              <svg width="74" height="136" viewBox="0 0 74 136" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.1771 0.802521C54.4769 26.4682 129.543 89.1237 3.41199 134.421" stroke="white" stroke-opacity="0.3" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>

        <div class="hero__banner">
          <div class="banner">
            <img src="<?=$heroACF['images']['url'];?>" alt="<?=$heroACF['images']['alt'];?>">
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="школа">
      <div class="container">
        <p class="section__title h2 text-up why-us__title opacity-bottom">
          <?=$whyACF['title'];?>
        </p>

        <div class="section__content">
          <div class="why-us">

            <? foreach ($whyACF['item'] as $key => $value): ?>
              <div class="why-us__item <?=($key % 2 == 0) ? "opacity-left" : "why-us__item--reverse opacity-right"?>">
                <div class="why-us__item-content">
                  <p class="why-us__item-number">0<?=$key+1;?></p>
                  <p class="why-us__item-title"><?=$value['title'];?></p>
                  <p class="why-us__item-text">
                    <?=$value['text'];?>
                  </p>
                </div>

                <div class="why-us__item-banner">
                  <div class="banner banner--reverse">
                    <img src="<?=$value['images']['url'];?>" alt="<?=$value['images']['alt'];?>">
                  </div>
                </div>
              </div>
            <? endforeach; ?>

          </div>
        </div>
      </div>
    </section>

    <section class="section" id="где">
      <div class="container">
        <p class="section__title h2 text-up watch__title opacity-bottom ">
          <?=$watchACF['title'];?>
        </p>

        <div class="section__sub opacity-bottom">
          <div class="section__sub-item">
            <div class="section__sub-icon">
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_187_190)">
                  <path opacity="0.994" fill-rule="evenodd" clip-rule="evenodd" d="M3.16602 0.487549C10.0384 0.487549 16.9108 0.487549 23.7832 0.487549C25.2389 0.826091 26.1361 1.72322 26.4746 3.17896C26.4746 10.0513 26.4746 16.9238 26.4746 23.7961C26.1361 25.2519 25.2389 26.149 23.7832 26.4875C16.9108 26.4875 10.0384 26.4875 3.16602 26.4875C1.71028 26.149 0.813151 25.2519 0.474609 23.7961C0.474609 16.9238 0.474609 10.0513 0.474609 3.17896C0.813151 1.72322 1.71028 0.826091 3.16602 0.487549ZM3.72461 2.11255C10.2246 2.10408 16.7246 2.11255 23.2246 2.13794C24.1979 2.23104 24.7311 2.76424 24.8242 3.73755C24.8581 10.2375 24.8581 16.7375 24.8242 23.2375C24.7311 24.2109 24.1979 24.7441 23.2246 24.8372C16.7246 24.871 10.2246 24.871 3.72461 24.8372C2.7513 24.7441 2.2181 24.2109 2.125 23.2375C2.09114 16.7375 2.09114 10.2375 2.125 3.73755C2.22712 2.76373 2.76032 2.22206 3.72461 2.11255Z" fill="#12B0EA" />
                  <path opacity="0.976" fill-rule="evenodd" clip-rule="evenodd" d="M5.9082 5.36255C7.44865 5.35409 8.989 5.36255 10.5293 5.38794C10.9854 5.61508 11.1462 5.97903 11.0117 6.47973C10.9186 6.70825 10.7578 6.86907 10.5293 6.96216C9.73371 6.97907 8.93817 6.99603 8.14258 7.01294C9.42059 8.29095 10.6986 9.56891 11.9766 10.8469C12.0104 10.8808 12.0104 10.9146 11.9766 10.9485C11.6126 11.3124 11.2487 11.6763 10.8848 12.0403C10.8509 12.0742 10.8171 12.0742 10.7832 12.0403C9.52215 10.7792 8.26105 9.51813 7 8.25708C6.98309 9.0188 6.96613 9.78052 6.94922 10.5422C6.72208 10.9984 6.35813 11.1592 5.85742 11.0247C5.62891 10.9316 5.4681 10.7708 5.375 10.5422C5.34115 8.98493 5.34115 7.42767 5.375 5.87036C5.49868 5.63666 5.67644 5.46738 5.9082 5.36255Z" fill="#12B0EA" />
                  <path opacity="0.976" fill-rule="evenodd" clip-rule="evenodd" d="M16.4199 5.36255C17.9604 5.35409 19.5007 5.36255 21.041 5.38794C21.2821 5.47664 21.4599 5.63743 21.5742 5.87036C21.6081 7.42767 21.6081 8.98493 21.5742 10.5422C21.3471 10.9984 20.9831 11.1592 20.4824 11.0247C20.2539 10.9316 20.0931 10.7708 20 10.5422C19.9831 9.78052 19.9661 9.0188 19.9492 8.25708C18.6882 9.51813 17.4271 10.7792 16.166 12.0403C16.1322 12.0742 16.0983 12.0742 16.0645 12.0403C15.7005 11.6763 15.3366 11.3124 14.9727 10.9485C14.9388 10.9146 14.9388 10.8808 14.9727 10.8469C16.2507 9.56891 17.5286 8.29095 18.8067 7.01294C18.0111 6.99603 17.2155 6.97907 16.4199 6.96216C15.9638 6.73501 15.803 6.37106 15.9375 5.87036C16.0402 5.64083 16.201 5.47156 16.4199 5.36255Z" fill="#12B0EA" />
                  <path opacity="0.976" fill-rule="evenodd" clip-rule="evenodd" d="M10.7832 14.9094C11.2019 15.2517 11.5997 15.6241 11.9766 16.0266C12.0104 16.0605 12.0104 16.0943 11.9766 16.1282C10.6986 17.4062 9.42059 18.6841 8.14258 19.9622C8.93817 19.9791 9.73371 19.996 10.5293 20.0129C10.9854 20.2401 11.1462 20.604 11.0117 21.1047C10.9186 21.3333 10.7578 21.4941 10.5293 21.5872C8.93507 21.6368 7.34389 21.6199 5.75586 21.5364C5.59956 21.4184 5.47259 21.2745 5.375 21.1047C5.34115 19.5474 5.34115 17.9902 5.375 16.4329C5.60215 15.9767 5.9661 15.8159 6.4668 15.9504C6.69531 16.0435 6.85614 16.2043 6.94922 16.4329C6.96613 17.1946 6.98309 17.9563 7 18.718C8.27131 17.4552 9.53236 16.1857 10.7832 14.9094Z" fill="#12B0EA" />
                  <path opacity="0.976" fill-rule="evenodd" clip-rule="evenodd" d="M16.0645 14.9094C17.3805 16.1492 18.6754 17.4187 19.9492 18.718C19.9661 17.9563 19.9831 17.1946 20 16.4329C20.2272 15.9767 20.5911 15.8159 21.0918 15.9504C21.3203 16.0435 21.4811 16.2043 21.5742 16.4329C21.6081 17.9902 21.6081 19.5474 21.5742 21.1047C21.4611 21.3363 21.2834 21.4971 21.041 21.5872C19.5007 21.621 17.9603 21.621 16.4199 21.5872C15.9638 21.36 15.803 20.9961 15.9375 20.4954C16.0306 20.2668 16.1914 20.106 16.4199 20.0129C17.2155 19.996 18.0111 19.9791 18.8067 19.9622C17.5286 18.6841 16.2507 17.4062 14.9727 16.1282C14.9388 16.0943 14.9388 16.0605 14.9727 16.0266C15.3469 15.6609 15.7108 15.2885 16.0645 14.9094Z" fill="#12B0EA" />
                </g>
                <defs>
                  <clipPath id="clip0_187_190">
                    <rect width="26" height="26" fill="white" transform="translate(0.5 0.512939)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div class="section__sub-item">
            <p class="section__sub-text">
              <?=$watchACF['sub_title'];?>
            </p>
          </div>
        </div>

        <div class="watch__video opacity-bottom">
          <button class="button button--play button--blue pulse">
            <img src="<?=get_template_directory_uri()?>/svg/play.svg" alt="">

            <video width="320" height="240" class="button--play__video">
              <source src="<?=$watchACF['video']['file']['url'];?>" type="<?=$watchACF['video']['file']['mime_type'];?>">
            </video>
          </button>

          <div class="watch__video-content">
            <p class="watch__video-content-title"><?=$watchACF['video']['title'];?></p>
            <p class="watch__video-content-subtitle"><?=$watchACF['video']['time'];?></p>
            <div class="watch__video-content-line">
              <svg width="212" height="163" viewBox="0 0 212 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.498469 160C56.6685 176.522 295.288 92.5582 179.079 0.908271" stroke="white" stroke-opacity="0.3" stroke-width="1.5"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="section__content">
          <div class="watch">
            <? foreach ($watchACF['item'] as $key => $value): ?>
              <div class="watch__item watch__item-<?=$key;?> opacity-right">
                <div class="swiper-wrapper">
                  <? foreach ($value['images'] as $keyImage => $image): ?>
                    <div class="swiper-slide">
                      <div class="watch__block <?=($image['b']) ? "watch__block--big" : "watch__block--small"?>">
                        <div class="banner banner--reverse">
                          <img src="<?=$image['img']['url'];?>" alt="<?=$image['img']['url'];?>">
                        </div>
                      </div>
                    </div>
                  <? endforeach; ?>
                </div>
                <div class="watch__item-sub">
                  <p class="watch__item-text"><?=$value['title'];?></p>

                  <div class="watch__item-controller">
                    <div class="button-slider">
                      <button class="button-slider__item button-slider__item--prev">
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.695267 5.05421C0.434934 5.2983 0.434934 5.69402 0.695267 5.9381L4.93793 9.91558C5.19827 10.1597 5.62033 10.1597 5.88073 9.91558C6.14107 9.6715 6.14107 9.27577 5.88073 9.03169L2.10947 5.49616L5.88073 1.9606C6.14107 1.71653 6.14107 1.32085 5.88073 1.07672C5.62033 0.832658 5.19827 0.832658 4.93793 1.07672L0.695267 5.05421ZM14.5 5.49616L14.5 4.87116L1.16667 4.87116L1.16667 5.49616L1.16667 6.12116L14.5 6.12116L14.5 5.49616Z" fill="white" />
                        </svg>
                      </button>

                      <button class="button-slider__item button-slider__item--next">
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_187_235)">
                            <path d="M14.3047 6.1704C14.5651 5.92632 14.5651 5.53059 14.3047 5.28651L10.0621 1.30903C9.80173 1.06496 9.37967 1.06496 9.11927 1.30903C8.85893 1.55311 8.85893 1.94884 9.11927 2.19292L12.8905 5.72845L9.11927 9.26402C8.85893 9.50808 8.85893 9.90376 9.11927 10.1479C9.37967 10.392 9.80173 10.392 10.0621 10.1479L14.3047 6.1704ZM0.5 5.72845V6.35345H13.8333V5.72845V5.10345H0.5V5.72845Z" fill="white" />
                          </g>
                          <defs>
                            <clipPath id="clip0_187_235">
                              <rect width="14" height="10" fill="white" transform="translate(0.5 0.728516)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            <? endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="урок">
      <div class="container">
        <p class="section__title h2 text-up opacity-bottom">
          <?=$lessonACF['title'];?>
        </p>

        <div class="section__sub opacity-bottom">
          <ul class="section__sub-list">
            <? foreach ($lessonACF['list'] as $key => $value): ?>
              <li>
                <p class="section__sub-text">
                  <?=$value['text'];?>
                </p>
              </li>
            <? endforeach; ?>
          </ul>
        </div>

        <div class="section__content">
          <div class="lesson parent-w">
            <div class="lesson__content scroll-container-w">
              <? foreach ($lessonACF['card'] as $key => $value): ?>
                <div class="lesson__content-item child-w">
                  <p class="lesson__content-number">0<?=$key+1;?></p>
                  <p class="lesson__content-title"><?=$value['title'];?></p>
                  <p class="lesson__content-text"><?=$value['text'];?></p>
                </div>
              <? endforeach; ?>
            </div>

            <div class="lesson__button">
              <button class="button button--85 button--blue" data-js-modal-open="1">
                <span>
                  Записаться на урок
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
        </div>
      </div>
    </section>

    <section class="section" id="кому">
      <div class="container ">
        <div class="whom">
          <div class="whom__header parent">
            <div class="whom__title sticky-child">
              <p class="h2 text-up"><?=$whomACF['title'];?></p>
            </div>
          </div>

          <div class="whom__cards">
            <? foreach ($whomACF['item'] as $key => $value): ?>
              <div class="whom__cards-item">
                <div class="whom__cards-banner">
                  <div class="banner banner--reverse">
                    <img src="<?=$value['images']['url'];?>" alt="">
                  </div>
                </div>
                <div class="whom__cards-content">
                  <p class="whom__cards-title">
                    <?=$value['title'];?>
                  </p>
                  <p class="whom__cards-text">
                    <?=$value['text'];?>
                  </p>
                </div>
              </div>
            <? endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <section class="section swiper-section" id="преподаватели">
      <div class="container">
        <p class="section__title h2 text-up">
          <?=$teachersACF['title'];?>
        </p>

        <div class="section__sub">
          <p class="section__sub-text">
            <?=$teachersACF['sub_title'];?>
          </p>
        </div>

        <div class="section__content">
          <div class="teachers">
            <div class="swiper-wrapper">
              <? foreach ($teachersACF['item'] as $key => $value): ?>
                <div class="swiper-slide">
                  <div class="teachers__item">
                    <div class="teachers__item-banner">
                      <button class="button teachers__item-banner-flag"></button>

                      <div class="teachers__item-banner-description">
                        <? foreach ($value['description'] as $keyDes => $description): ?>
                          <p class="teachers__item-banner-description-text">
                            <?=$description['text'];?>
                          </p>
                        <? endforeach; ?>
                      </div>

                      <div class="banner banner--reverse">
                        <img src="<?=$value['images']['url'];?>" alt="">
                      </div>
                    </div>

                    <div class="teachers__item-content">
                      <p class="teachers__item-name"><?=$value['Name'];?></p>
                      <p class="teachers__item-value"><?=$value['years'];?></p>
                    </div>
                  </div>
                </div>
              <? endforeach; ?>
            </div>

            <div class="teachers__button">
              <div class="button-slider button-slider--big">
                <button class="button-slider__item button-slider__item--prev">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.695267 5.05421C0.434934 5.2983 0.434934 5.69402 0.695267 5.9381L4.93793 9.91558C5.19827 10.1597 5.62033 10.1597 5.88073 9.91558C6.14107 9.6715 6.14107 9.27577 5.88073 9.03169L2.10947 5.49616L5.88073 1.9606C6.14107 1.71653 6.14107 1.32085 5.88073 1.07672C5.62033 0.832658 5.19827 0.832658 4.93793 1.07672L0.695267 5.05421ZM14.5 5.49616L14.5 4.87116L1.16667 4.87116L1.16667 5.49616L1.16667 6.12116L14.5 6.12116L14.5 5.49616Z" fill="white" />
                  </svg>
                </button>

                <button class="button-slider__item button-slider__item--next">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_187_235)">
                      <path d="M14.3047 6.1704C14.5651 5.92632 14.5651 5.53059 14.3047 5.28651L10.0621 1.30903C9.80173 1.06496 9.37967 1.06496 9.11927 1.30903C8.85893 1.55311 8.85893 1.94884 9.11927 2.19292L12.8905 5.72845L9.11927 9.26402C8.85893 9.50808 8.85893 9.90376 9.11927 10.1479C9.37967 10.392 9.80173 10.392 10.0621 10.1479L14.3047 6.1704ZM0.5 5.72845V6.35345H13.8333V5.72845V5.10345H0.5V5.72845Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_187_235">
                        <rect width="14" height="10" fill="white" transform="translate(0.5 0.728516)" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section swiper-section" id="отзывы">
      <div class="container">

        <p class="section__title h2 text-up">
          <?=$remainedACF['title'];?>
        </p>

        <div class="section__content">
          <div class="remained swiper-remained">
            <div class="swiper-wrapper">
              <? foreach ($remainedACF['item'] as $key => $value): ?>
                <div class="swiper-slide">
                  <div class="remained__item">
                    <? if($value['video']):?>
                      <div class="remained__item-img video">
                        <div class="video__wrapper">
                          <button class="button button--play button--blue">
                            <img src="<?=get_template_directory_uri()?>/svg/play.svg" alt="">

                            <video width="320" height="240" class="button--play__video">
                              <source src="<?=$value['video']['url'];?>" type="video/mp4">
                            </video>
                          </button>
                        </div>

                        <img src="<?=$value['images']['url'];?>" alt="">
                      </div>
                    <? else: ?>
                      <div class="remained__item-img">
                        <img src="<?=$value['images']['url'];?>" alt="">
                      </div>
                    <? endif; ?>
                  </div>
                </div>
              <? endforeach; ?>
            </div>

            <div class="remained__button">
              <div class="button-slider button-slider--big">
                <button class="button-slider__item button-slider__item--prev" tabindex="0" aria-label="Previous slide" aria-controls="swiper-wrapper-ec3abe6d2ea5e92f" aria-disabled="false">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.695267 5.05421C0.434934 5.2983 0.434934 5.69402 0.695267 5.9381L4.93793 9.91558C5.19827 10.1597 5.62033 10.1597 5.88073 9.91558C6.14107 9.6715 6.14107 9.27577 5.88073 9.03169L2.10947 5.49616L5.88073 1.9606C6.14107 1.71653 6.14107 1.32085 5.88073 1.07672C5.62033 0.832658 5.19827 0.832658 4.93793 1.07672L0.695267 5.05421ZM14.5 5.49616L14.5 4.87116L1.16667 4.87116L1.16667 5.49616L1.16667 6.12116L14.5 6.12116L14.5 5.49616Z" fill="white"></path>
                  </svg>
                </button>

                <button class="button-slider__item button-slider__item--next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-ec3abe6d2ea5e92f" aria-disabled="false">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_187_235)">
                      <path d="M14.3047 6.1704C14.5651 5.92632 14.5651 5.53059 14.3047 5.28651L10.0621 1.30903C9.80173 1.06496 9.37967 1.06496 9.11927 1.30903C8.85893 1.55311 8.85893 1.94884 9.11927 2.19292L12.8905 5.72845L9.11927 9.26402C8.85893 9.50808 8.85893 9.90376 9.11927 10.1479C9.37967 10.392 9.80173 10.392 10.0621 10.1479L14.3047 6.1704ZM0.5 5.72845V6.35345H13.8333V5.72845V5.10345H0.5V5.72845Z" fill="white"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_187_235">
                        <rect width="14" height="10" fill="white" transform="translate(0.5 0.728516)"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section swiper-section" id="">
      <div class="container">
        <p class="section__title h2 text-up">
          <?=$concertACF['title'];?>
        </p>

        <div class="section__sub">
          <p class="section__sub-text section__sub-text--center section-text-phone">
            <?=$concertACF['sub_title'];?>
          </p>
        </div>

        <div class="concert__video watch__video">
          <button class="button button--play button--blue pulse">
            <img src="<?=get_template_directory_uri()?>/svg/play.svg" alt="">

            <video width="320" height="240" class="button--play__video">
              <source src="<?=$concertACF['video']['file']['url'];?>" type="<?=$concertACF['video']['file']['mime_type'];?>">
            </video>
          </button>

          <div class="watch__video-content">
            <p class="watch__video-content-title"><?=$concertACF['video']['text'];?></p>
            <p class="watch__video-content-subtitle"><?=$concertACF['video']['time'];?></p>
            <div class="watch__video-content-line">
              <svg width="212" height="163" viewBox="0 0 212 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.498469 160C56.6685 176.522 295.288 92.5582 179.079 0.908271" stroke="white" stroke-opacity="0.3" stroke-width="1.5"></path>
              </svg>
            </div>
          </div>

          <div class="concert__video-line">
            <svg width="365" height="154" viewBox="0 0 365 154" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.998615 152.001C22.1523 150.338 511.485 180.989 318.498 1.50053" stroke="white" stroke-opacity="0.3" stroke-width="1.5" />
            </svg>
          </div>
        </div>

        <div class="section__content">
            <div class="concert">
              <div class="swiper-wrapper">

              <? foreach ($concertACF['item'] as $key => $value): ?>
                <div class="swiper-slide">
                  <div class="concert__item concert__item--big">
                    <img src="<?=$value['big']['url'];?>" alt="">
                  </div>
                </div>

                <div class="swiper-slide">
                  <div class="concert__item concert__item--small">
                    <img src="<?=$value['small_2']['url'];?>" alt="">

                    <img src="<?=$value['small_3']['url'];?>" alt="">
                  </div>
                </div>
              <? endforeach; ?>
              </div>
            </div>

            <div class="concert__button">
              <div class="button-slider button-slider--big">
                <button class="button-slider__item button-slider__item--prev">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.695267 5.05421C0.434934 5.2983 0.434934 5.69402 0.695267 5.9381L4.93793 9.91558C5.19827 10.1597 5.62033 10.1597 5.88073 9.91558C6.14107 9.6715 6.14107 9.27577 5.88073 9.03169L2.10947 5.49616L5.88073 1.9606C6.14107 1.71653 6.14107 1.32085 5.88073 1.07672C5.62033 0.832658 5.19827 0.832658 4.93793 1.07672L0.695267 5.05421ZM14.5 5.49616L14.5 4.87116L1.16667 4.87116L1.16667 5.49616L1.16667 6.12116L14.5 6.12116L14.5 5.49616Z" fill="white" />
                  </svg>
                </button>

                <button class="button-slider__item button-slider__item--next">
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_187_235)">
                      <path d="M14.3047 6.1704C14.5651 5.92632 14.5651 5.53059 14.3047 5.28651L10.0621 1.30903C9.80173 1.06496 9.37967 1.06496 9.11927 1.30903C8.85893 1.55311 8.85893 1.94884 9.11927 2.19292L12.8905 5.72845L9.11927 9.26402C8.85893 9.50808 8.85893 9.90376 9.11927 10.1479C9.37967 10.392 9.80173 10.392 10.0621 10.1479L14.3047 6.1704ZM0.5 5.72845V6.35345H13.8333V5.72845V5.10345H0.5V5.72845Z" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_187_235">
                        <rect width="14" height="10" fill="white" transform="translate(0.5 0.728516)" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
            
        </div>
      </div>
    </section>

    <section class="section" id="вопросы">
      <div class="container">
        <div class="questions">
          <div class="questions__header parent">
            <div class="questions__title sticky-child">
              <p class="h2 text-up"><?=$questionsACF['title'];?></span>
            </div>
          </div>

          <div class="questions__cards">
              <? foreach ($questionsACF['item'] as $key => $value): ?>
                <div class="questions__cards-item">
                  <p class="questions__cards-title"><?=$value['title'];?></p>
                  <div class="questions__cards-content">
                    <p class="questions__cards-text"><?=$value['text'];?></p>
                  </div>
                  <button class="questions__cards-button">
                    <img src="data:image/svg+xml,%3csvg%20width='10'%20height='11'%20viewBox='0%200%2010%2011'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_282_308)'%3e%3cpath%20d='M0.478583%200.543152C0.298895%200.590027%200.140692%200.718933%200.0586606%200.886902C-0.00969874%201.02557%20-0.00969874%201.27362%200.0567075%201.41425C0.0938169%201.49237%200.492254%201.90057%202.10749%203.51971L4.11139%205.52557L2.10749%207.53339C-0.0702455%209.71307%200.0254575%209.60761%200.00397314%209.8537C-0.0155581%2010.0998%200.107489%2010.3224%200.332098%2010.4455C0.451239%2010.5099%200.47077%2010.5158%200.625067%2010.5139C0.757879%2010.5139%200.810614%2010.5041%200.888739%2010.467C0.968817%2010.4299%201.3653%2010.0432%202.99421%208.41815L5.00007%206.41425L7.00788%208.41815C8.63483%2010.0432%209.03132%2010.4299%209.11139%2010.467C9.18952%2010.5041%209.24225%2010.5139%209.37507%2010.5139C9.52741%2010.5158%209.55085%2010.5099%209.66413%2010.4494C9.80085%2010.3752%209.85944%2010.3127%209.93757%2010.1662C10.0079%2010.0275%2010.0118%209.78339%209.94147%209.6369C9.90436%209.55682%209.51764%209.16034%207.89264%207.53339L5.88874%205.52557L7.89264%203.51776C9.51764%201.89081%209.90436%201.49432%209.94147%201.41425C9.97858%201.33612%209.98835%201.28339%209.98835%201.15057C9.9903%200.99823%209.98444%200.974792%209.92389%200.861511C9.84968%200.724792%209.78718%200.666199%209.64069%200.588074C9.50202%200.517761%209.25788%200.513855%209.11139%200.584167C9.03132%200.621277%208.63483%201.008%207.00788%202.633L5.00007%204.6369L2.99421%202.633C1.35749%200.99823%200.968817%200.621277%200.890692%200.586121C0.787176%200.539246%200.576239%200.515808%200.478583%200.543152Z'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_282_308'%3e%3crect%20width='10'%20height='10'%20fill='white'%20transform='translate(0%200.525391)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e" alt="open">
                  </button>
                </div>
              <? endforeach; ?>
            </div>
        </div>
      </div>
    </section>

    <section class="section opacity-bottom" id="контакты">
      <div class="container">
        <div class="billboard">
          <div class="billboard__header">
            <div class="h3 text-up billboard__header-title">
              Ты не просто учишься — ты становишься частью Drum Family
              <div class="billboard__header-title-line">
                <svg width="224" height="36" viewBox="0 0 224 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.499295 26.1873C41.0374 35.0794 197.355 47.6718 223.501 1.18636" stroke="white" stroke-opacity="0.3" />
                </svg>
              </div>
            </div>

            <p class="billboard__header-text">
              Начни с пробного урока!
            </p>
          </div>

          <div class="billboard__img">
            <div class="banner banner--reverse banner--white">
              <img src="<?=get_template_directory_uri()?>/images/dsds.webp" alt="Человек показывает лайк">
            </div>
          </div>

          <form action="send.php" method="POST" class="billboard__form form">
            <label for="name-billboard" class="input-wrapper">
              <p class="label label--white">Введите свое имя</p>
              <input type="text" id="name-billboard" class="input input--white" placeholder="Например, Иван">
            </label>
              
            <label for="phone-billboard" class="input-wrapper">
              <p class="label label--white">Введите свой телефон</p>
              <input type="text" id="phone-billboard" class="input input--white" placeholder="+7 (___) ___-____">
            </label>

            <div class="billboard__form-footer">
              <button type="submit" class="button button--78 button--white">
                <span>
                  Записаться на урок!
                </span>

                <span class="icon-right">
                  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.223633" width="24" height="24" rx="12" fill="#12B0EA" />
                    <path d="M8.50503 14.7287C8.23166 15.002 8.23166 15.4452 8.50503 15.7186C8.77839 15.992 9.22161 15.992 9.49497 15.7186L8.50503 14.7287ZM15.7 9.22363C15.7 8.83703 15.3866 8.52363 15 8.52363H8.7C8.3134 8.52363 8 8.83703 8 9.22363C8 9.61023 8.3134 9.92363 8.7 9.92363H14.3V15.5236C14.3 15.9102 14.6134 16.2236 15 16.2236C15.3866 16.2236 15.7 15.9102 15.7 15.5236V9.22363ZM9 15.2236L9.49497 15.7186L15.495 9.71861L15 9.22363L14.505 8.72866L8.50503 14.7287L9 15.2236Z" fill="white" />
                  </svg>
                </span>
              </button>

              <div class="form__about">
                Оставляя заявку, вы даете согласие на обработку <br>
                <a href="/politics/">своих персональных данных</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <section class="section opacity-bottom" id="">
      <div class="container">
        <p class="section__title h2 text-up">
          <span class="text-line">контакты</span> школы
        </p>

        <div class="section__content">
          <div class="map">
            <div class="map__header"></div>

            <div class="banner banner--reverse">
              <div class="map__banner">
                <img src="<?=get_template_directory_uri()?>/assets/map-B5RRhK3k.webp" alt="">

                <div class="map__address" data-da=".map__header,1023.98,1">
                  <div class="map__address-item">
                    <p class="map__address-name">Позвоните нам</p>
                    <a href="tel:<?=$mainACF['номер_телефона']['ссылка'];?>" class="map__address-phone"><?=$mainACF['номер_телефона']['название'];?></a>
                  </div>
                  <div class="map__address-buttons">
                    <? foreach ($mapACF['social'] as $key => $value): ?>
                      <div class="map__address-buttons-item">
                        <a href="<?=$value['link'];?>" class="button button-social">
                          <img src="<?=$value['images']['url'];?>" alt="">
                        </a>
                      </div>
                    <? endforeach; ?>
                  </div>
                  <div class="map__address-item">
                    <p class="map__address-name">Приходите в гости</p>
                    <p class="map__address-text"><?=$mapACF['addresses'];?></p>
                  </div>
                  <div class="map__address-item">
                    <p class="map__address-name">График работы</p>
                    <p class="map__address-text"><?=$mapACF['text'];?></p>
                  </div>
                  <div class="map__address-item">
                    <button class="button button--78 button--blue" data-js-modal-open="1">
                      <span>
                        Заказать звонок
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
<?php get_footer();?>