'use strict';

function guidelineAnimation() {
  var controller = new ScrollMagic.Controller({ container: 'body' });
  var animation = new TimelineLite();
  animation.fromTo($('.guideline__item:nth-child(1)'), 0.5, { opacity: 0, y: 500 }, { opacity: 1, y: 0 }, 0.1).fromTo($('.guideline__item:nth-child(2)'), 0.5, { opacity: 0, y: 500 }, { opacity: 1, y: 0 }, 0.2).fromTo($('.guideline__item:nth-child(3)'), 0.5, { opacity: 0, y: 500 }, { opacity: 1, y: 0 }, 0.3).fromTo($('.guideline__item:nth-child(4)'), 0.5, { opacity: 0, y: 500 }, { opacity: 1, y: 0 }, 0.4).fromTo($('.guideline__item:nth-child(5)'), 0.5, { opacity: 0, y: 500 }, { opacity: 1, y: 0 }, 0.5);
  var scene = new ScrollMagic.Scene({
    triggerHook: 0.8,
    triggerElement: '.guideline',
    duration: $('.guideline').outerHeight()
  });
  scene.setTween(animation);
  // .addIndicators()
  scene.addTo(controller);
}

guidelineAnimation();
