'use strict';

(function () {
  window.synchronizeFields = function (firstControl, secondControl, firstOptions, secondOptions, callback) {
    if (typeof callback === 'function') {
      firstControl.addEventListener('change', function () {
        var indexOfValue = firstOptions.indexOf(firstControl.value);
        callback(secondControl, secondOptions[indexOfValue]);
      });
    }
  };
})();
