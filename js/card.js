'use strict';

(function () {

  // Map Card Template
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var localizedOfferType = {
    'flat': 'Квартира',
    'bungalo': 'Лачуга',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var getOfferFeatures = function (array, element) {
    array.forEach(function (i) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('feature');
      featureElement.classList.add('feature--' + i);
      element.appendChild(featureElement);
    });
  };

  window.card = {

    create: function (post) {
      var mapCardElement = mapCardTemplate.cloneNode(true);

      // Features popup
      var featuresContainer = mapCardElement.querySelector('.popup__features');
      featuresContainer.innerHTML = '';

      mapCardElement.querySelector('h3').textContent = post.offer.title;
      mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
      mapCardElement.querySelector('.popup__price > span').textContent = post.offer.price;
      mapCardElement.querySelector('h4').textContent = localizedOfferType[post.offer.type];
      mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
      mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
      mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
      mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

      if (post.offer.features.length > 0) {
        getOfferFeatures(post.offer.features, featuresContainer);
      }

      return mapCardElement;
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
        window.pin.removeActive(window.pin.pinsList);
      });
    },

    closePopup: function () {
      var popup = document.querySelector('.popup');
      if (popup) {
        window.util.hideElement(popup);
      }
      window.pin.removeActive(window.pin.pinsList);
      document.removeEventListener('keydown', window.card.onPopupEscPress);
    },
  };

})();
