'use strict';

(function () {

  // Map Card Template
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.card = {

    convertPropertyType: function (type) {
      var convertedType = '';

      switch (type) {
        case 'flat':
          convertedType = 'Квартира';
          break;
        case 'bungalo':
          convertedType = 'Бунгало';
          break;
        case 'house':
          convertedType = 'Дом';
          break;
      }

      return convertedType;
    },

    createMapCard: function (post) {
      var mapCardElement = mapCardTemplate.cloneNode(true);

      // Features popup
      var featuresContainer = mapCardElement.querySelector('.popup__features');
      featuresContainer.innerHTML = '';

      mapCardElement.querySelector('h3').textContent = post.offer.title;
      mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
      mapCardElement.querySelector('.popup__price').innerHTML = post.offer.price + '&#x20bd;/ночь';
      mapCardElement.querySelector('h4').textContent = window.card.convertPropertyType(post.offer.type);
      mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
      mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
      for (var i = 0; i < post.offer.features.length; i++) {
        featuresContainer.innerHTML += '<li class="feature feature--' + post.offer.features[i] + '"></li>';
      }
      mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
      mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

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
        window.pin.removeActivePins(window.pin.pinsList);
      });
    },

    closePopup: function () {
      var popup = document.querySelector('.popup');
      window.util.hideElement(popup);
      window.pin.removeActivePins(window.pin.pinsList);
    },
  };

})();
