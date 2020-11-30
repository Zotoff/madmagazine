/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*****************************!*\
  !*** ./dev/js/constants.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  // this function is strict...
}());

})();

(() => {
/*!***************************!*\
  !*** ./dev/js/network.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  // this function is strict...
}());

})();

(() => {
/*!************************!*\
  !*** ./dev/js/main.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

jQuery(function () {
  $(window).scroll((evt) => {
    const scrollPosition = $(window).scrollTop();
    const articlePoster = $(`#articlePoster`);
    const header = $(`#mainHeader`);
    const windowWidth = $(window).width();
    if (articlePoster) {
      if (windowWidth >= 768) {
        if (scrollPosition > 900) {
          articlePoster.addClass(`article__poster--smallHeight`);
        } else {
          articlePoster.removeClass(`article__poster--smallHeight`);
        }
      }
      if (windowWidth < 768) {
        if (scrollPosition > 500) {
          articlePoster.addClass(`article__poster--smallHeight`);
        } else {
          articlePoster.removeClass(`article__poster--smallHeight`);
        }
      }
    }
    if (header) {
      if (windowWidth >= 768) {
        if (scrollPosition > 900) {
          header.addClass(`header--smallHeight`);
        } else {
          header.removeClass(`header--smallHeight`);
        }
      }
      if (windowWidth < 768) {
        if (scrollPosition > 500) {
          header.addClass(`header--smallHeight`);
        } else {
          header.removeClass(`header--smallHeight`);
        }
      }
    }
  });

  const mobileNav = $(`#headerMobileNav`);
  const mobileMenu = $(`#headerMobileMenu`);
  const mobileClose = $(`#headerMobileClose`);
  const mobileSubscribe = $(`#headerMobileSubscribe`);
  const footerSubscribeForm = $(`#footerSubscribe`);
  const headerSubscribeButton = $(`#headerSubscribeButton`);

  mobileNav.click((evt) => {
    evt.preventDefault();
    mobileMenu.addClass(`show`);
  });
  mobileClose.click((evt) => {
    evt.preventDefault();
    mobileMenu.removeClass(`show`);
  });
  headerSubscribeButton.click((evt) => {
    footerSubscribeForm.scrollIntoView({block: `center`, behavior: `smooth`});
  });

  if (mobileSubscribe) {
    mobileSubscribe.click((evt) => {
      evt.preventDefault();
      console.log(footerSubscribeForm.offset());
      // footerSubscribeForm.offset().top = 0;
      mobileMenu.removeClass(`show`);
    });
  }

  // const mobileNav = document.querySelector(`#headerMobileNav`);
  // const mobileMenu = document.querySelector(`#headerMobileMenu`);
  // const mobileClose = document.querySelector(`#headerMobileClose`);
  // const mobileSubscribe = mobileMenu.querySelector(`#headerMobileSubscribe`);
  // const footerSubscribeForm = document.querySelector(`#footerSubscribe`);
  // const headerSubscribeButton = document.querySelector(`#headerSubscribeButton`);


  // mobileNav.addEventListener(`click`, (evt) => {
  //   evt.preventDefault();
  //   mobileMenu.classList.add(`show`);
  // });
  // mobileClose.addEventListener(`click`, (evt) => {
  //   evt.preventDefault();
  //   mobileMenu.classList.remove(`show`);
  // });

  // headerSubscribeButton.addEventListener(`click`, (evt)=> {
  //   evt.preventDefault();
  //   footerSubscribeForm.scrollIntoView({block: "center", behavior: "smooth"});
  // });


  // if (mobileSubscribe) {
  //   mobileSubscribe.addEventListener(`click`, (evt) => {
  //     evt.preventDefault();
  //     footerSubscribeForm.scrollIntoView({block: "center", behavior: "smooth"});
  //     mobileMenu.classList.remove(`show`);
  //   });
  // }


});

const articleCarousel = document.querySelector(`#articleCarousel`);
if (articleCarousel) {
  const slider = tns({
    container: `#articleCarousel`,
    slideBy: `page`,
    autoplay: true,
    items: 1,
    controlsContainer: `#articleSliderControls`,
    navContainer: `#articleSliderNav`
  });
}

const desktopPromoSlider = document.querySelector(`#desktopPromoSlider`);
if (desktopPromoSlider) {
  const desktopPromoSlider = tns({
    container: `#desktopPromoSlider`,
    slideBy: `page`,
    autoplay: true,
    items: 1,
    controls: false,
    nav: false,
  });
}

const mobilePromoSlider = document.querySelector(`#mobilePromoSlider`);
if (mobilePromoSlider) {
  const mobilePromoSlider = tns({
    container: `#mobilePromoSlider`,
    slideBy: `page`,
    autoplay: true,
    items: 1,
    controls: false,
    nav: false,
  });
}

const mainPromoSlider = document.querySelector(`#mainPromoCarousel`);
if (mainPromoSlider) {
  const mainPromoSlider = tns({
    container: `#mainPromoCarousel`,
    slideBy: `page`,
    autoplay: true,
    items: 1,
    controls: false,
    nav: false,
  });
}



})();

/******/ })()
;