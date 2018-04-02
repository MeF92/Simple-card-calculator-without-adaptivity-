'use strict';

// @codekit-append '../blocks/header/header';
// @codekit-append '../blocks/calculator/calculator';
// @codekit-append '../blocks/form/form';

// javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

var checkMobile = function checkMobile() {
  var isMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return isMobile = document.body.clientWidth <= 980;
};
checkMobile();

document.addEventListener('DOMContentLoaded', function () {});

// Debounce and throttle
function debounce(func, delay) {
  var inDebounce = undefined;
  return function () {
    var context = this,
        args = arguments;
    clearTimeout(inDebounce);
    return inDebounce = setTimeout(function () {
      return func.apply(context, args);
    }, delay);
  };
}

function throttle(func, limit) {
  var inThrottle = undefined;
  return function () {
    var args = arguments,
        context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      return setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
var getParents = function getParents(elem, selector) {

  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
  }

  // Setup parents array
  var parents = [];
  // Get matching parent elements
  for (; elem && elem !== document; elem = elem.parentNode) {
    // Add matching parents to array
    if (selector) {
      if (elem.matches(selector)) {
        parents.push(elem);
      }
    } else {
      parents.push(elem);
    }
  }
  return parents;
};

function ieVerification() {
  var ie = navigator.userAgent.toLowerCase().indexOf('msie') != -1 ? parseInt(navigator.userAgent.toLowerCase().split('msie')[1]) : false,
      ie11 = !!window.MSInputMethodContext && !!document.documentMode,
      edge = /Edge\/\d./i.test(navigator.userAgent),
      isIE = ie || ie11 || edge ? true : false;
  return isIE;
}
'use strict';

$('.header__arrows').on('click', function () {
  var scrollT = $('.guideline').position();
  var body = $("html, body");
  body.stop().animate({ scrollTop: scrollT.top }, 500, 'swing');
});

$('.header__calculator-source').on('click', function () {
  var scrollT = $('.calculator').position();
  var body = $("html, body");
  body.stop().animate({ scrollTop: scrollT.top }, 500, 'swing');
});
'use strict';

// Appear/Disappear cards

$('.calculator__item').on('click', function () {
  $(this).toggleClass('calculator__item_isActive');
  $(this).find('.input__label').toggleClass('input__label_isActive');
  $(this).find('.input__label-icon').toggleClass('input__label-icon_isActive');
});

$('.input__label').on('click', function () {
  if ($(this).parent().parent().parent().hasClass('calculator__item_isActive')) {
    $(this).parent().parent().parent().removeClass('calculator__item_isActive');
    $(this).removeClass('input__label_isActive');
    $(this).find('.input__label-icon').removeClass('input__label-icon_isActive');
  } else {
    $(this).parent().parent().parent().addClass('calculator__item_isActive');
    $(this).addClass('input__label_isActive');
    $(this).find('.input__label-icon').addClass('input__label-icon_isActive');
  }
});

// Calculating final price

var titleText;
var elem;
var price;
var sum = 0;

$('.calculator__item').on('click', function () {
  price = $(this).find('.calculator__item-cost').text().match(/\d+/).join();

  if ($(this).hasClass('calculator__item_isActive')) {
    titleText = $(this).find('.calculator__item-title').text();
    elem = $('<p></p>').text(titleText);
    elem.addClass('order__result-item');
    elem.addClass($(this).attr('id'));
    $('.order__result').append(elem);

    sum += +price;
    $('.order__price-amount').text(sum);
  } else {
    $('.' + $(this).attr('id')).remove();
    sum -= +price;
    $('.order__price-amount').text(sum);
  }
});

$('.input__label').on('click', function () {
  price = $(this).parent().parent().parent().find('.calculator__item-cost').text().match(/\d+/).join();

  if ($(this).parent().parent().parent().hasClass('calculator__item_isActive')) {
    sum += +price;
    $('.order__price-amount').text(sum);
  } else {
    sum -= +price;
    $('.order__price-amount').text(sum);
  }
});

// Types of business

$('.calculator__nav__link').click(function (evt) {
  evt.preventDefault();

  if ($(this).hasClass('calculator__nav__link_isActive')) {
    return false;
  } else {
    $('.calculator__item').removeClass('calculator__item_isActive');
    $('.input__label').removeClass('input__label_isActive');
    $('.input__label-icon').removeClass('input__label-icon_isActive');
    sum = 0;
    $('.order__price-amount').text(sum);
    $('.order__result').html('');
    $('.form').removeClass('form_isActive');
    $('.calculator__nav__link').removeClass('calculator__nav__link_isActive');
    $(this).addClass('calculator__nav__link_isActive');
  }
});

$('.calculator__nav__link').click(function () {
  $('.calculator__wrapper').removeClass('calculator__wrapper_isActive');
  if ($(this).text() === 'Визитка') {
    $('.calculator__wrapper1').addClass('calculator__wrapper_isActive');
  } else if ($(this).text() === 'Корпоративный') {
    $('.calculator__wrapper2').addClass('calculator__wrapper_isActive');
  } else if ($(this).text() === 'Магазин') {
    $('.calculator__wrapper3').addClass('calculator__wrapper_isActive');
  }
});
'use strict';

function animatePlaceholder() {
  $('.input_text .input__source').on('focus', function () {
    $(this).parent().find('.input__label').addClass('input__label_isActive');
  });

  $('.input_text .input__source').on('blur', function () {
    if ($(this).val() === '') {
      $(this).parent().find('.input__label').removeClass('input__label_isActive');
    }
  });
}

animatePlaceholder();

$('.order__price-ordering').click(function () {
  $('.form').addClass('form_isActive');
  var scrollT = $('.form').position();
  var body = $("html, body");
  body.stop().animate({ scrollTop: scrollT.top }, 500, 'swing');
});
