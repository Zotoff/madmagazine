"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var $ = require("jquery");
var tiny_slider_1 = require("tiny-slider/src/tiny-slider");
$(document).ready(function () {
    /* Handle comments like buttons */
    var mobileNav = $("#headerMobileNav");
    var mobileMenu = $("#headerMobileMenu");
    var mobileClose = $("#headerMobileClose");
    var mobileSubscribe = $("#headerMobileSubscribe");
    var footerSubscribeForm = $("#footerSubscribe");
    var headerSubscribeButton = $("#headerSubscribeButton");
    var postCommentsLink = $("#postCommentsLink");
    var postCommentsBlock = $("#postComments");
    /* Handle comment like */
    var checkCommentLike = function (item) {
        var commentLikeButton = item.find(".comments__like__btn--like");
        var commentDisLikeButton = item.find(".comments__like__btn--dislike");
        var commentCount = item.find(".comments__views");
        var commentCountValue = +commentCount.attr("data-count");
        /* Handle comment like btn click */
        commentLikeButton.on("click", function (evt) {
            evt.preventDefault();
            commentDisLikeButton.removeClass("comments__like__btn--active");
            commentLikeButton.addClass("comments__like__btn--active");
            commentCountValue += 1;
            commentCount.text("+".concat(commentCountValue));
            commentCount.attr("data-count", commentCountValue);
            var commentId = item.attr("data-commentid");
            var commentURL = item.attr("data-commentURL");
            $.ajax({
                method: "GET",
                url: commentURL,
                data: {
                    commentId: commentId,
                    commentCount: commentCountValue
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        });
        /* Handle comment dislike btn click */
        commentDisLikeButton.on("click", function (evt) {
            evt.preventDefault();
            commentDisLikeButton.addClass("comments__like__btn--active");
            commentLikeButton.removeClass("comments__like__btn--active");
            commentCountValue -= 1;
            commentCount.text("+".concat(commentCountValue));
            commentCount.attr("data-count", commentCountValue);
            var commentId = item.attr("data-commentid");
            var commentURL = item.attr("data-commentURL");
            $.ajax({
                method: "GET",
                url: commentURL,
                data: {
                    commentId: commentId,
                    commentCount: commentCountValue
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        });
    };
    /* Handle comment blocks */
    var commentBlocks = $(".comments__block:not(.comments__block__form)");
    commentBlocks.each(function () {
        var $this = $(this);
        var commentItems = $this.find(".comments__item");
        commentItems.each(function () {
            checkCommentLike($(this));
            $(this).attr("data-commentid", "comment-".concat(generateRandomId(8)));
            $(this).attr("data-commenturl", "./ajax/response.json");
        });
    });
    /* Handle mobile nav */
    mobileNav.on("click", function (evt) {
        evt.preventDefault();
        mobileMenu.addClass("show");
    });
    mobileClose.on("click", function (evt) {
        evt.preventDefault();
        mobileMenu.removeClass("show");
    });
    headerSubscribeButton.on("click", function (evt) {
        evt.preventDefault();
        footerSubscribeForm[0].scrollIntoView({ block: "start", behavior: "smooth" });
    });
    if (mobileSubscribe) {
        mobileSubscribe.on("click", function (evt) {
            evt.preventDefault();
            footerSubscribeForm[0].scrollIntoView({ block: "start", behavior: "smooth" });
            mobileMenu.removeClass("show");
        });
    }
    ;
    /* Handle post comments click */
    postCommentsLink.on("click", function (evt) {
        evt.preventDefault();
        $('html,body').animate({ scrollTop: $(".comments__filter").offset().top - $('#mainHeader').outerHeight() + 15 }, 500);
    });
    /* Scroll to section function */
    var scrollToSection = function (dataLink) {
        var sectionsWithData = $("section.short-section");
        sectionsWithData.each(function (index, element) {
            var $this = $(this);
            if (dataLink === $this.attr("data-id")) {
                $('html,body').animate({ scrollTop: $this.offset().top - $('#mainHeader').outerHeight() + 15 }, 500);
            }
        });
    };
    /* Handle category nav list click */
    var categoryNavList = $("#categoryNavList li a");
    categoryNavList.each(function (index, element) {
        var $this = $(this);
        $this.on("click", function (evt) {
            evt.preventDefault();
            var navLinkDataLink = $this.attr("data-link");
            scrollToSection(navLinkDataLink);
        });
    });
    /* Comments form */
    var commentsForm = $("#commentsForm");
    var commentsUrl = commentsForm.attr("action");
    if (commentsForm) {
        commentsForm.trigger('reset');
        commentsForm.validate({
            submitHandler: function (form) {
                var comment = $("textarea").val();
                $.ajax({
                    type: "GET",
                    url: commentsUrl,
                    data: { name: "Author", message: comment }
                }).done(function (msg) {
                    console.log(msg);
                    form.reset();
                    var commentMessage = $("#commentMessage");
                    commentMessage.text("\u0412\u0430\u0448 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D");
                    commentMessage.attr("data-success", 'true');
                }).fail(function () {
                    var commentMessage = $("#commentMessage");
                    commentMessage.text("\u041F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430");
                    console.log("Something wrong");
                    commentMessage.attr("data-success", 'false');
                });
            }
        });
    }
    /* Subscribe form */
    var subscribeForm = $("#subscribeForm");
    if (subscribeForm) {
        var subscribeUrl_1 = subscribeForm.attr("action");
        if (subscribeForm) {
            subscribeForm.trigger('reset');
        }
        subscribeForm.validate({
            submitHandler: function (form) {
                var email = $("#subscribeEmail").val();
                $.ajax({
                    type: "GET",
                    url: subscribeUrl_1,
                    data: { name: "Author", email: email }
                }).done(function (msg) {
                    console.log(msg);
                    form.reset();
                    var subscribeMessage = $("#subscribeMessage");
                    subscribeMessage.text("\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043B\u0438\u0441\u044C \u043D\u0430 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443!");
                    subscribeMessage.attr("data-success", 'true');
                }).fail(function () {
                    var subscribeMessage = $("#subscribeMessage");
                    subscribeMessage.text("\u041F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430");
                    console.log("Something wrong");
                    subscribeMessage.attr("data-success", 'false');
                });
            }
        });
    }
    /* Illustration handle */
    var articleIllustrations = $(".article__illustration");
    articleIllustrations.each(function (index, element) {
        var $this = $(this);
        var img = $this.find("img");
        var figCaption = $this.find("figcaption");
        var imgWidth = $this.data("width");
        var imgHeight = $this.data("height");
        var imgAlign = $this.data("align");
        img.attr("width", imgWidth);
        img.attr("height", imgHeight);
        switch (imgAlign) {
            case "center":
                $this.css("justify-content", "center");
                figCaption.css("text-align", "center");
                break;
            case "left":
                $this.css("justify-content", "flex-start");
                figCaption.css("text-align", "left");
                break;
            default:
                $this.css("justify-content", "flex-end");
                figCaption.css("text-align", "right");
        }
    });
});
/* Initiate sliders */
var articleCarousel = document.querySelector("#articleCarousel");
if (articleCarousel) {
    // @ts-ignore
    var slider = (0, tiny_slider_1.tns)({
        container: "#articleCarousel",
        slideBy: "page",
        items: 1,
        controlsContainer: "#articleSliderControls",
        navContainer: "#articleSliderNav",
        loop: false
    });
}
var desktopPromoSlider = document.querySelector("#desktopPromoSlider");
if (desktopPromoSlider) {
    // @ts-ignore
    var desktopPromoSlider_1 = (0, tiny_slider_1.tns)({
        container: "#desktopPromoSlider",
        slideBy: "page",
        items: 1,
        controls: false,
        nav: false
    });
}
var mobilePromoSlider = document.querySelector("#mobilePromoSlider");
if (mobilePromoSlider) {
    // @ts-ignore
    var mobilePromoSlider_1 = (0, tiny_slider_1.tns)({
        container: "#mobilePromoSlider",
        slideBy: "page",
        items: 1,
        controls: false,
        nav: false
    });
}
var mainPromoSlider = document.querySelector("#mainPromoCarousel");
if (mainPromoSlider) {
    // @ts-ignore
    var mainPromoSlider_1 = (0, tiny_slider_1.tns)({
        container: "#mainPromoCarousel",
        slideBy: "page",
        items: 1,
        controls: false,
        nav: false
    });
}
/* Generate random ID */
var generateRandomId = function (length) {
    var letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
    if (!length) {
        length = Math.floor(Math.random() * letters.length);
    }
    var str = "";
    for (var i = 0; i < length; i++) {
        str += letters[Math.floor(Math.random() * letters.length)];
    }
    return str;
};
/* Post bookmark click */
var article = document.querySelector(".article");
var postBookmark = document.querySelectorAll(".post-bookmark");
if (article) {
    article.setAttribute("data-id", generateRandomId(8));
}
/* Work with cookies */
function setCookie(name, value, options) {
    if (options === void 0) { options = {}; }
    options = __assign({ path: '/' }, options);
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (var optionKey in options) {
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : '[]';
}
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    });
}
/* Working with cookies on bookmarks */
if (postBookmark) {
    postBookmark.forEach(function (bookmark) {
        bookmark.addEventListener("click", function (evt) {
            evt.preventDefault();
            var articleId = bookmark.getAttribute("data-id");
            var state = 0;
            bookmark.classList.toggle('post-bookmark--active');
            bookmark.toggleAttribute("enabled");
            if (bookmark.classList.contains('post-bookmark--active')) {
                state = 1;
            }
            var articlesList = JSON.parse(getCookie('articlesList')) || [];
            if (state && articlesList.indexOf(articleId) == -1) {
                articlesList.push(articleId);
            }
            else if (!state && articlesList.indexOf(articleId) != -1) {
                articlesList = articlesList.filter(function (item) { return item != articleId; });
            }
            setCookie('articlesList', JSON.stringify(articlesList), { 'max-age': 3600, expires: "Tue, 19 Jan 2038 03:14:07 GMT" });
        });
    });
}
