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

    // Get random number
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Used to shuffle array order
    compareRandom: function () {
      return Math.random() - 0.5;
    },

    // Get random key in Array
    getRandomArrayKeys: function (arr) {
      return arr[window.util.getRandomInt(0, arr.length - 1)];
    },

    // Shuffle keys in Object
    getRandomObjectKeys: function (obj) {
      var keys = Object.keys(obj);
      return obj[window.util.getRandomArrayKeys(keys)];
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
