"use strict";
jQuery(function () {

  /* Handle scroll */

  $(window).scroll(() => {
    const scrollPosition = $(window).scrollTop();
    // const articlePoster = $(`#articlePoster`);
    const header = $(`#mainHeader`);
    const windowWidth = $(window).width();
    // if (articlePoster) {
    //   if (windowWidth >= 768) {
    //     if (scrollPosition > 350) {
    //       articlePoster.addClass(`article__poster--smallHeight`);
    //     } else {
    //       articlePoster.removeClass(`article__poster--smallHeight`);
    //     }
    //   }
    //   if (windowWidth < 768) {
    //     if (scrollPosition > 350) {
    //       articlePoster.addClass(`article__poster--smallHeight`);
    //     } else {
    //       articlePoster.removeClass(`article__poster--smallHeight`);
    //     }
    //   }
    // }
    if (header) {
      if (windowWidth >= 768) {
        if (scrollPosition > 150) {
          header.addClass(`header--smallHeight`);
        } else {
          header.removeClass(`header--smallHeight`);
        }
      }
      if (windowWidth < 768) {
        if (scrollPosition > 150) {
          header.addClass(`header--smallHeight`);
        } else {
          header.removeClass(`header--smallHeight`);
        }
      }
    }
  });

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
      $(this).attr(`data-commenturl`, `http://localhost:3000/ajax/response.json`);
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
    postCommentsBlock[0].scrollIntoView({block: `start`, behavior: `smooth`});
  });

  const scrollToSection = (dataLink) => {
    const sectionsWithData = $(`section.short-section`);
    sectionsWithData.each(function () {
      const sectionWithData = $(this);
      if (dataLink === sectionWithData.attr(`data-id`)) {
        sectionWithData[0].scrollIntoView({block: `start`, behavior: `smooth`});
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

  const commentsForm = $(`#commentsForm`);
  commentsForm[0].reset();

  commentsForm.validate({
    rules: {
      comment: {
        required: true,
        minlength: 2
      }
    },
    messages: {
      comment: {
        required: `Заполните поле!`,
        minlength: `Допустимо минимум два символа при вводе имени`
      }
    },
    submitHandler(form) {
      let comment = $(`textarea`).val();
      $.ajax({
          type: "GET",
          url: "/ajax/response.json",
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
const postBookmark = document.querySelector(`.post-bookmark`);
const postBookmarkMob = document.querySelector(`.post-bookmark--mob`);

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

function checkCookieInArray(list, cookie) {
  let result = undefined;

  for (let item of list) {
    if (item[1] === cookie[1]) {
      result = true;
      console.log(`In array`);
    } else {
      result = false;
      console.log(`Out of array`);
    }
  }

  return result;
}

/* Working with cookie array */

let articleCookies = [];

if (postBookmark) {
  postBookmark.addEventListener(`click`, (evt)=>{
    evt.preventDefault();

    let articleId = article.getAttribute(`data-id`);
    let postBookmarkIcon = postBookmark.querySelector(`img`);

    if (postBookmarkIcon.getAttribute(`src`) === `img/icons/icon-bookmark.svg`) {
      postBookmarkIcon.setAttribute(`src`, `img/icons/icon-bookmark-fill.svg`);
    } else {
      postBookmarkIcon.setAttribute(`src`, `img/icons/icon-bookmark.svg`);
    }

    let newCookie = [`dataId`, articleId];
    let articlesList = JSON.parse(getCookie('articlesList')) || [];

    const filterResult = checkCookieInArray(articlesList, newCookie);
    console.log(filterResult)

    if (filterResult) {
      console.log(`removing from array...`);
      const filteredArray = articlesList.filter((item) => {
        if (item[1] !== newCookie[1]) {
          return item;
        }
      });
      deleteCookie(`articlesList`);
      console.log(`Filtered array...`, filteredArray);
      setCookie('articlesList', JSON.stringify(filteredArray), {'max-age': 3600, expires: `Tue, 19 Jan 2038 03:14:07 GMT`});
    } else {
      console.log(`Add to array...`);
      articlesList = articlesList.concat([newCookie]);
      console.log(`Array with new id...`, articlesList);
      setCookie('articlesList', JSON.stringify(articlesList), {'max-age': 3600, expires: `Tue, 19 Jan 2038 03:14:07 GMT`});
    }
  });
}

if (postBookmarkMob) {
  postBookmarkMob.addEventListener(`click`, (evt)=>{
    evt.preventDefault();

    let articleId = article.getAttribute(`data-id`);
    let articleCookieName = `data-id`;
    let postBookmarkIcon = postBookmarkMob.querySelector(`img`);

    if (postBookmarkIcon.getAttribute(`src`) === `img/icons/icon-bookmark.svg`) {
      postBookmarkIcon.setAttribute(`src`, `img/icons/icon-bookmark-fill.svg`);
    } else {
      postBookmarkIcon.setAttribute(`src`, `img/icons/icon-bookmark.svg`);
    }

    let cookieDate = new Date();
    cookieDate.setTime(cookieDate.getTime() + (1440 * 60 * 1000));
    let date = cookieDate.toUTCString();

    document.cookie = encodeURIComponent(articleCookieName) + `=` + encodeURIComponent(articleId) + `expires=` + date;
  });
}
