'use strict';

(function () {
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  window.showCard = function (pins, callback) {

    if (typeof callback === 'function') {
      pins.forEach(function (elem, i) {

        elem.addEventListener('click', function () {
          window.pin.removeActivePins(mapPins);
          elem.classList.add('map__pin--active');
          callback(i);
        });

      });
    }
  };
})();
