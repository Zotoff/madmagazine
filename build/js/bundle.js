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


const mobileNav = document.querySelector(`#headerMobileNav`);
const mobileMenu = document.querySelector(`#headerMobileMenu`);
const mobileClose = document.querySelector(`#headerMobileClose`);
const mobileSubscribe = mobileMenu.querySelector(`#headerMobileSubscribe`);
mobileNav.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mobileMenu.classList.add(`show`);
});
mobileClose.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mobileMenu.classList.remove(`show`);
});

if (mobileSubscribe) {
  mobileSubscribe.addEventListener(`click`, () => {
    mobileMenu.classList.remove(`show`);
  });
}


})();

/******/ })()
;