'use strict';

const mobileNav = document.querySelector(`#headerMobileNav`);
const mobileMenu = document.querySelector(`#headerMobileMenu`);
const mobileClose = document.querySelector(`#headerMobileClose`);
const mobileSubscribe = mobileMenu.querySelector(`#headerMobileSubscribe`);
const footerForm = document.querySelector(`.footer_mob_middle form input[type=email]`);
mobileNav.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mobileMenu.classList.add(`show`);
});
mobileClose.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  mobileMenu.classList.remove(`show`);
});

if (mobileSubscribe) {
  mobileSubscribe.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    mobileMenu.classList.remove(`show`);
    footerForm.focus();
  });
}

