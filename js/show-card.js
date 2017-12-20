'use strict';

(function () {

  var map = document.querySelector('.map');

  window.showCard = function (pins, data) {

    pins.forEach(function (elem, i) {
      elem.addEventListener('click', function () {

        // deactivate all active pins
        window.pin.removeActive(pins);
        // activate the current pin
        elem.classList.add('map__pin--active');

        // remove popup
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }

        // add newly generated map card
        map.insertBefore(window.card.create(data[i]), map.querySelector('.map__filters-container'));

        // close on esc key
        document.addEventListener('keydown', window.card.onPopupEscPress);

        // close on click
        window.card.onPopupCloseClick();
      });

    });

  };
})();
