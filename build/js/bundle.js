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
mobileNav.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mobileMenu.classList.add(`show`);
});
mobileClose.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mobileMenu.classList.remove(`show`);
});


// mobileNav.addEventListener(`click`, (evt) => {
//   console.log(`check`);
//   evt.preventDefault();
// });


// const onSuccess = (response) => {
//   const videosList = [];
//   const barnetSupportNavElement = document.querySelector(`#barnetSuppportNav ul`);
//   console.log(barnetSupportNavElement);
//   const loadVideosResult = response.items;

//   loadVideosResult.forEach((video) => {
//     const videoName = checkUndefinedValue(video.snippet.title);
//     const videoId = checkUndefinedValue(video.snippet.resourceId.videoId);
//     const videoObject = new Video(videoName, videoId);
//     videosList.push(videoObject);
//   });
//   console.log(videosList);
//   videosList.forEach((item) => {
//     const listItem = document.createElement(`li`);
//     const listItemLink = document.createElement(`a`);
//     listItemLink.setAttribute(`href`, `#`);
//     listItemLink.setAttribute(`data-id`, item.id);
//     listItemLink.innerText = item.title;
//     listItem.insertAdjacentElement(`afterbegin`, listItemLink);
//     barnetSupportNavElement.insertAdjacentElement(`afterbegin`, listItem);
//   });


// }
// const onError = (message) => {
//   console.log(message)
// }
// window.network.load(onSuccess, onError);

})();

/******/ })()
;