"use strict";
jQuery(function () {

  /* Handle comments like buttons */

  const mobileNav = $(`#headerMobileNav`);
  const mobileMenu = $(`#headerMobileMenu`);
  const mobileClose = $(`#headerMobileClose`);
  const mobileSubscribe = $(`#headerMobileSubscribe`);
  const footerSubscribeForm = $(`#footerSubscribe`);
  const headerSubscribeButton = $(`#headerSubscribeButton`);
  const postCommentsLink = $(`#postCommentsLink`);
  const postCommentsBlock = $(`#postComments`);

  const checkCommentLike = (item) => {
    const commentLikeButton = item.find(`.comments__like__btn--like`);
    const commentDisLikeButton = item.find(`.comments__like__btn--dislike`);
    const commentCount = item.find(`.comments__views`);
    let commentCountValue = +commentCount.attr(`data-count`);


    commentLikeButton.on(`click`, (evt) => {
      evt.preventDefault();
      commentDisLikeButton.removeClass(`comments__like__btn--active`);
      commentLikeButton.addClass(`comments__like__btn--active`);
      commentCountValue += 1;
      commentCount.text(`+${commentCountValue}`);
      commentCount.attr(`data-count`, commentCountValue);

      let commentId = item.attr(`data-commentid`);
      let commentURL = item.attr(`data-commentURL`);

      $.ajax({
        method: `GET`,
        url: commentURL,
        data: {
          commentId,
          commentCount: commentCountValue
        },
        success(response) {
          console.log(response);
        },
        error(response) {
          console.log(response);
        }
      });
    });
    commentDisLikeButton.on(`click`, (evt) => {
      evt.preventDefault();
      commentDisLikeButton.addClass(`comments__like__btn--active`);
      commentLikeButton.removeClass(`comments__like__btn--active`);
      commentCountValue -= 1;
      commentCount.text(`+${commentCountValue}`);
      commentCount.attr(`data-count`, commentCountValue);

      let commentId = item.attr(`data-commentid`);
      let commentURL = item.attr(`data-commentURL`);

      $.ajax({
        method: `GET`,
        url: commentURL,
        data: {
          commentId,
          commentCount: commentCountValue
        },
        success(response) {
          console.log(response);
        },
        error(response) {
          console.log(response);
        }
      });
    });
  };

  const commentBlocks = $(`.comments__block:not(.comments__block__form)`);
  commentBlocks.each(function () {
    const commentItems = $(this).find(`.comments__item`);
    commentItems.each(function () {
      checkCommentLike($(this));
      $(this).attr(`data-commentid`, `comment-${generateRandomId(8)}`);
      $(this).attr(`data-commenturl`, `./ajax/response.json`);
    });
  });

  mobileNav.on(`click`, (evt) => {
    evt.preventDefault();
    mobileMenu.addClass(`show`);
  });
  mobileClose.on(`click`, (evt) => {
    evt.preventDefault();
    mobileMenu.removeClass(`show`);
  });
  headerSubscribeButton.on(`click`, (evt) => {
    evt.preventDefault();
    footerSubscribeForm[0].scrollIntoView({block: `start`, behavior: `smooth`});
  });

  if (mobileSubscribe) {
    mobileSubscribe.on(`click`, (evt) => {
      evt.preventDefault();
      footerSubscribeForm[0].scrollIntoView({block: `start`, behavior: `smooth`});
      mobileMenu.removeClass(`show`);
    });
  }

  postCommentsLink.on(`click`, (evt) => {
    evt.preventDefault();
    $('html,body').animate({scrollTop: $(`.comments__filter`).offset().top - $('#mainHeader').outerHeight() + 15}, 500);
  });

  const scrollToSection = (dataLink) => {
    const sectionsWithData = $(`section.short-section`);
    sectionsWithData.each(function () {
      const sectionWithData = $(this);
      if (dataLink === sectionWithData.attr(`data-id`)) {
        $('html,body').animate({scrollTop: $(this).offset().top - $('#mainHeader').outerHeight() + 15}, 500);
      }
    });
  };

  const categoryNavList = $(`#categoryNavList li a`);
  categoryNavList.each(function (item) {
    const navLink = $(this);
    navLink.on(`click`, (evt) => {
      evt.preventDefault();
      const navLinkDataLink = $(this).attr(`data-link`);
      scrollToSection(navLinkDataLink);
    });
  });

  /* Comments form */

  const commentsForm = $(`#commentsForm`);

  if (commentsForm) {
    const commentsUrl =  commentsForm.attr(`action`);
    if (commentsForm[0]) {
      commentsForm[0].reset();
    }

    commentsForm.validate({
      submitHandler(form) {
        let comment = $(`textarea`).val();
        $.ajax({
            type: "GET",
            url: commentsUrl,
            data: {name: `Author`, message: comment}
          }).done(function( msg ) {
            console.log(msg);
            form.reset();
            let commentMessage = $(`#commentMessage`);
            commentMessage.text(`Ваш комментарий успешно отправлен`);
            commentMessage.attr(`data-success`, true);
          }).fail(function() {
            let commentMessage = $(`#commentMessage`);
            commentMessage.text(`При отправке вашего запроса возникла ошибка`)
            console.log(`Something wrong`);
            commentMessage.attr(`data-success`, false);
          })
      }
    });
  }

  /* Subscribe form */

  const subscribeForm = $(`#subscribeForm`);

  if (subscribeForm) {
    const subscribeUrl = subscribeForm.attr(`action`);
    if (subscribeForm[0]) {
      subscribeForm[0].reset();
    }

    subscribeForm.validate({
      submitHandler(form) {
        let email = $(`#subscribeEmail`).val();
        $.ajax({
            type: "GET",
            url: subscribeUrl,
            data: {name: `Author`, email: email}
          }).done(function( msg ) {
            console.log(msg);
            form.reset();
            let subscribeMessage = $(`#subscribeMessage`);
            subscribeMessage.text(`Вы успешно подписались на рассылку!`);
            subscribeMessage.attr(`data-success`, true);
          }).fail(function() {
            let subscribeMessage = $(`#subscribeMessage`);
            subscribeMessage.text(`При отправке вашего запроса возникла ошибка`)
            console.log(`Something wrong`);
            subscribeMessage.attr(`data-success`, false);
          })
      }
    });
  }

  /* Illustration handle */
  const articleIllustrations = $(`.article__illustration`);
  articleIllustrations.each(function() {
    const illustration = $(this);
    const img = $(this).find(`img`);
    const figCaption = $(this).find(`figcaption`);
    const imgWidth = $(this).data(`width`);
    const imgHeight = $(this).data(`height`);
    const imgAlign = $(this).data(`align`);
    img.attr(`width`, imgWidth);
    img.attr(`height`, imgHeight);
    switch(imgAlign) {
      case `center`:
        illustration.css(`justify-content`, `center`);
        figCaption.css(`text-align`, `center`);
        break;
      case `left`:
        illustration.css(`justify-content`, `flex-start`);
        figCaption.css(`text-align`, `left`);
        break;
      default:
        illustration.css(`justify-content`, `flex-end`);
        figCaption.css(`text-align`, `right`);
    }
  });
});

/* Initiate sliders */
const articleCarousel = document.querySelector(`#articleCarousel`);
if (articleCarousel) {
  const slider = tns({
    container: `#articleCarousel`,
    slideBy: `page`,
    items: 1,
    controlsContainer: `#articleSliderControls`,
    navContainer: `#articleSliderNav`,
    loop: false,
  });
}

const desktopPromoSlider = document.querySelector(`#desktopPromoSlider`);
if (desktopPromoSlider) {
  const desktopPromoSlider = tns({
    container: `#desktopPromoSlider`,
    slideBy: `page`,
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
    items: 1,
    controls: false,
    nav: false,
  });
}

/* Generate random ID */

const generateRandomId = (length) => {
  const letters = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`.split(``);

  if (!length) {
    length = Math.floor(Math.random() * letters.length);
  }

  let str = ``;

  for (let i = 0; i < length; i++) {
    str += letters[Math.floor(Math.random() * letters.length)];
  }
  return str;
};

/* Post bookmark click */

const article = document.querySelector(`.article`);
const postBookmark = document.querySelectorAll(`.post-bookmark`);

if (article) {
  article.setAttribute(`data-id`, generateRandomId(8));
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : '[]';
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

/* Working with cookies on bookmarks */
if (postBookmark) {
  postBookmark.forEach((bookmark) => {
    bookmark.addEventListener(`click`, (evt)=>{
      evt.preventDefault();

      let articleId = article.getAttribute(`data-id`);

      let state = 0;

      bookmark.classList.toggle('post-bookmark--active');
      bookmark.toggleAttribute(`enabled`);

      if (bookmark.classList.contains('post-bookmark--active')) {
        state = 1;
      }
      let articlesList = JSON.parse(getCookie('articlesList')) || [];

      if (state && articlesList.indexOf(articleId) == -1) {
        articlesList.push(articleId);
      } else if (!state && articlesList.indexOf(articleId) != -1) {
        articlesList = articlesList.filter(item => item != articleId);
      }
      setCookie('articlesList', JSON.stringify(articlesList), {'max-age': 3600, expires: `Tue, 19 Jan 2038 03:14:07 GMT`});
    });
  });
}

