"use strict";
jQuery(function () {

  /* Handle scroll */

  $(window).scroll(() => {
    const scrollPosition = $(window).scrollTop();
    const articlePoster = $(`#articlePoster`);
    const header = $(`#mainHeader`);
    const windowWidth = $(window).width();
    if (articlePoster) {
      if (windowWidth >= 768) {
        if (scrollPosition > 350) {
          articlePoster.addClass(`article__poster--smallHeight`);
        } else {
          articlePoster.removeClass(`article__poster--smallHeight`);
        }
      }
      if (windowWidth < 768) {
        if (scrollPosition > 350) {
          articlePoster.addClass(`article__poster--smallHeight`);
        } else {
          articlePoster.removeClass(`article__poster--smallHeight`);
        }
      }
    }
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
    footerSubscribeForm[0].scrollIntoView({block: `center`, behavior: `smooth`});
  });

  if (mobileSubscribe) {
    mobileSubscribe.on(`click`, (evt) => {
      evt.preventDefault();
      footerSubscribeForm[0].scrollIntoView({block: `center`, behavior: `smooth`});
      mobileMenu.removeClass(`show`);
    });
  }

  postCommentsLink.on(`click`, (evt) => {
    evt.preventDefault();
    postCommentsBlock[0].scrollIntoView({block: `center`, behavior: `smooth`});
  });

  const scrollToSection = (dataLink) => {
    const sectionsWithData = $(`section.short-section`);
    sectionsWithData.each(function () {
      const sectionWithData = $(this);
      if (dataLink === sectionWithData.attr(`data-id`)) {
        sectionWithData[0].scrollIntoView({block: `center`, behavior: `smooth`});
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
      form.submit();
    }
  });


  /* Handle article Slider */
  const sliderPrevInactiveArrow = $(`.article__slider__prev[aria-disabled=true]`);
  const sliderPrevArrow = $(`.article__slider__prev`);
  const sliderNextArrow = $(`.article__slider__next`);
  const sliderFirstNav = $(`.article__slider__nav`).find(`div:nth-child(1)`);
  const sliderLastNav = $(`.article__slider__nav`).find(`div:last-child`);
  if (sliderPrevInactiveArrow) {
    const sliderArrowIcon = sliderPrevInactiveArrow.find(`img`);
    sliderArrowIcon.attr(`src`, `img/icons/article-slider-prevarrow--inactive.svg`);
  }
  sliderNextArrow.on(`click`, () => {
    const sliderArrowIcon = sliderPrevInactiveArrow.find(`img`);
    sliderArrowIcon.attr(`src`, `img/icons/article-slider-prevarrow.svg`);
  });

  sliderPrevArrow.on(`click`, () => {
    if (sliderFirstNav.hasClass(`tns-nav-active`)) {
      const sliderArrowIcon = sliderPrevArrow.find(`img`);
      sliderArrowIcon.attr(`src`, `img/icons/article-slider-prevarrow--inactive.svg`);
    }
    if (!sliderLastNav.hasClass(`tns-nav-active`)) {
      const sliderArrowIcon = sliderNextArrow.find(`img`);
      sliderArrowIcon.attr(`src`, `img/icons/article-slider-nextarrow.svg`);
    }
  });

  sliderNextArrow.on(`click`, () => {
    if (sliderLastNav.hasClass(`tns-nav-active`)) {
      const sliderArrowIcon = sliderNextArrow.find(`img`);
      sliderArrowIcon.attr(`src`, `img/icons/article-slider-nextarrow--inactive.svg`);
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

if (postBookmark) {
  postBookmark.addEventListener(`click`, (evt)=>{
    evt.preventDefault();

    let articleId = article.getAttribute(`data-id`);
    let articleCookieName = `data-id`;
    let postBookmarkIcon = postBookmark.querySelector(`img`);

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
