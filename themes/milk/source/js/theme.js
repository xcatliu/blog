document.addEventListener('DOMContentLoaded', function () {

  //
  // Header
  //
  var themeHeaderTitle = document.querySelector('.theme-header-title');
  fitFontSize({ element: themeHeaderTitle, maxHeight: 36, maxFontSize: 20 });

  var firstH1 = document.getElementsByTagName('h1')[0];
  var originHeaderText = themeHeaderTitle.innerText;

  if (firstH1) {
    registerHeaderTitleAnimation(function () {
      var firstH1Bottom = firstH1.getBoundingClientRect().bottom;
      if (firstH1Bottom < 52) {
        return {
          text: firstH1.innerText,
          direction: 'top'
        };
      }
      return {
        text: originHeaderText,
        direction: 'bottom'
      };
    });
  }

  //
  // Show comment count is larger than 0
  //
  Array.prototype.forEach.call(document.querySelectorAll('.theme-comment-count-container'), function (countContainerNode) {
    var countNode = countContainerNode.querySelector('.theme-comment-count');
    var cycles = 0;
    var countInterval = setInterval(function () {
      cycles += 1;
      var count = countNode.innerText;
      if (count !== '' || cycles > 10) {
        clearInterval(countInterval);
      }
      if (count > 0) {
        countContainerNode.classList.remove('theme-hide');
        setTimeout(function () {
          countContainerNode.classList.remove('theme-comment-count-container-transparent');
        }, 0);
      }
    }, 1000);
  });

  //
  // Sidebar
  //
  var themeHeaderSidebarIcon = document.querySelector('.theme-header-sidebar-icon');
  var themeSidebarMask = document.querySelector('.theme-sidebar-mask');
  var themeBody = document.querySelector('.theme-body');

  themeHeaderSidebarIcon.addEventListener('click', function () {
    themeSidebarMask.classList.remove('theme-hide');
    setTimeout(function () {
      themeBody.classList.add('theme-body-open-sidebar');
    }, 0);
  });

  themeSidebarMask.addEventListener('click', function () {
    themeBody.classList.remove('theme-body-open-sidebar');
    setTimeout(function () {
      themeSidebarMask.classList.add('theme-hide');
    }, 300);
  });


  function registerHeaderTitleAnimation(getAction) {
    document.addEventListener('scroll', throttle(function () {
      var action = getAction();
      if (themeHeaderTitle.innerText === action.text) {
        return;
      }

      var styleTop = action.direction === 'top' ? -10 : 10;
      themeHeaderTitle.classList.add('theme-header-title-transparent');
      themeHeaderTitle.style.top = styleTop + 'px';

      setTimeout(function () {

        themeHeaderTitle.classList.add('theme-header-title-no-transition');
        themeHeaderTitle.style.top = -styleTop + 'px';

        setTimeout(function () {
          themeHeaderTitle.classList.remove('theme-header-title-no-transition');
          themeHeaderTitle.classList.remove('theme-header-title-transparent');
          themeHeaderTitle.style.top = '0';

          themeHeaderTitle.innerText = action.text;
          fitFontSize({ element: themeHeaderTitle, maxHeight: 36, maxFontSize: 20 });
        }, 17);
      }, 150);
    }, 300));
  }

  // Fit the font-size
  function fitFontSize(options) {
    var element = options.element;
    var maxHeight = options.maxHeight;
    var maxFontSize = options.maxFontSize;

    var currentFontSize = maxFontSize;
    do {
      themeHeaderTitle.style.fontSize = currentFontSize + 'px';
      currentFontSize -= 1;
    } while (getHeight(element) > maxHeight);
  }

  function getHeight(element) {
    return parseInt(getComputedStyle(element).height, 10);
  }



  /* eslint-disable */
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  /* eslint-enable */

});
