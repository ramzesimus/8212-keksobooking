'use strict';

(function () {
  var MAP_MARKER_HEIGHT = 54;
  var MAP_MARKER_WIDTH = 40;
  var PIN_COUNT = 5;

  // Map pin template
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  // Map pins Container
  var mapPinsContainer = document.querySelector('.map__pins');

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
    hide: function (pins) {
      pins.forEach(function (elem) {
        window.util.hideElement(elem);
      });
    },

    // Remove active pins
    removeActive: function (arr) {
      arr.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
    },

    // Remove all pins
    removeAll: function (arr) {
      arr.forEach(function (elem) {
        elem.remove();
      });
    },

    // Generate Pins
    generate: function (data) {
      var fragment = document.createDocumentFragment();
      var pinCount = data.length > PIN_COUNT ? PIN_COUNT : data.length;

      for (var i = 0; i < pinCount; i++) {
        fragment.appendChild(createPin(data[i]));
      }

      mapPinsContainer.appendChild(fragment);

      // All the pins except the main one
      window.pin.pinsList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    },

  };

})();
