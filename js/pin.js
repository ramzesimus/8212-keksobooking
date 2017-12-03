'use strict';

(function () {
  var MAP_MARKER_HEIGHT = 54;
  var MAP_MARKER_WIDTH = 40;

  // Map pin template
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  // Map pins Container
  var mapPinsContainer = document.querySelector('.map__pins');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  // Create Marker
  var createPin = function (post) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = post.location.x - MAP_MARKER_HEIGHT + 'px';
    pinElement.style.top = post.location.y - MAP_MARKER_WIDTH / 2 + 'px';
    pinElement.querySelector('img').src = post.author.avatar;

    return pinElement;
  };

  window.pin = {

    // Hide pins
    hidePins: function () {
      mapPins.forEach(function (elem) {
        window.util.hideElement(elem);
      });
    },

    // Remove active pins
    removeActivePins: function (arr) {
      arr.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
    },

    // Generate Pins
    generatePins: function () {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < window.data.length; i++) {
        fragment.appendChild(createPin(window.data[i]));
      }

      return mapPinsContainer.appendChild(fragment);
    }(),

  };

})();
