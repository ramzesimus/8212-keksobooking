'use strict';

(function () {

  // Map Card Template
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);

  // Create Map Card
  var createMapCard = function (post) {

    // Features popup
    var featuresContainer = mapCardElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';

    mapCardElement.querySelector('h3').textContent = post.offer.title;
    mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
    mapCardElement.querySelector('.popup__price').innerHTML = post.offer.price + '&#x20bd;/ночь';
    mapCardElement.querySelector('h4').textContent = post.offer.type;
    mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
    mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
    for (var i = 0; i < post.offer.features.length; i++) {
      featuresContainer.innerHTML += '<li class="feature feature--' + post.offer.features[i] + '"></li>';
    }
    mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
    mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

    return mapCardElement;
  };

  window.card = {

    // Output Map Card
    outputMapCard: function (arrIndex) {
      var target = document.querySelector('.map');
      var mapCardFragment = document.createDocumentFragment();
      mapCardFragment.appendChild(createMapCard(window.data[arrIndex]));

      return target.insertBefore(mapCardFragment, target.querySelector('.map__filters-container'));
    },

    onPopupEscPress: function (evt) {
      window.util.isEscEvent(evt, function () {
        window.card.closePopup();
      });
    },

    closePopup: function () {
      var popup = document.querySelector('.popup');
      var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      window.util.hideElement(popup);
      window.pin.removeActivePins(mapPins);

      document.removeEventListener('keydown', window.card.onPopupEscPress);
    },
  };

  // Output Map Card placeholder
  window.card.outputMapCard(0);

})();
