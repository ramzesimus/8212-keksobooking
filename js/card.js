'use strict';

(function () {

  // Map Card Template
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mapCardFragment = document.createDocumentFragment();
  var target = document.querySelector('.map');

  window.card = {

    createMapCard: function (post) {
      var mapCardElement = mapCardTemplate.cloneNode(true);

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
    },

    getMapCard: function (arrIndex) {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      mapCardFragment.appendChild(window.card.createMapCard(window.data[arrIndex]));
      target.insertBefore(mapCardFragment, target.querySelector('.map__filters-container'));

      document.addEventListener('keydown', window.card.onPopupEscPress);
      window.card.onPopupCloseClick();
    },

    onPopupEscPress: function (evt) {
      window.util.isEscEvent(evt, function () {
        window.card.closePopup();
      });
    },

    onPopupCloseClick: function () {
      var popup = document.querySelector('.popup');
      var popupClose = document.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        window.util.hideElement(popup);
        window.pin.removeActivePins(mapPins);
      });
    },

    closePopup: function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      window.pin.removeActivePins(mapPins);
      document.removeEventListener('keydown', window.card.onPopupEscPress);
    },
  };

})();
