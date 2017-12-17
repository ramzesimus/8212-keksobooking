'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.util = {
    // Check if Escape key is pressed
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    // Hide element
    hideElement: function (target) {
      target.classList.add('hidden');
    },

    // Show Element
    showElement: function (target) {
      target.classList.remove('hidden');
    },

  };
})();
