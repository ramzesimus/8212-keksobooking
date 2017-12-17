'use strict';

(function () {

  var PRICE_FROM = 10000;
  var PRICE_TO = 50000;

  // Map
  var map = document.querySelector('.map');

  // Map Pin Main
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  // Disable all fields by setting up 'disabled' on fieldset tags
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  // Activate map
  window.map = {

    activateMap: function () {

      // show map
      map.classList.remove('map--faded');

      // activate notice form
      noticeForm.classList.remove('notice__form--disabled');

      // make all fields activated
      noticeFormFieldsets.forEach(function (elem) {
        elem.disabled = false;
      });

      // show all pins
      window.pin.pinsList.forEach(function (elem) {
        window.util.showElement(elem);
      });
    }
  };


  /*
   * Generate pins, show map and cards if data loaded
   */
  var onSuccessLoad = function (data) {
    dataCopy = data.slice();
    window.pin.generatePins(data);
    window.pin.hidePins(window.pin.pinsList);

    mapPinMain.addEventListener('mouseup', window.map.activateMap);

    window.showCard(window.pin.pinsList, data);
  };

  window.backend.load(onSuccessLoad, window.backend.onError);


  // Filter Fields
  var filterForm = document.querySelector('.map__filters');
  var typeControl = document.querySelector('#housing-type');
  var priceControl = document.querySelector('#housing-price');
  var roomsControl = document.querySelector('#housing-rooms');
  var guestsControl = document.querySelector('#housing-guests');
  var featuresControls = document.querySelectorAll('#housing-features input[type="checkbox"]');
  var dataCopy = [];

  // Updates map pins
  var updateMapPins = function () {
    var filteredData = dataCopy;
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.removeAllPins(pins);
    window.card.closePopup();

    // Filter select field values
    var controlSelectFilter = function (control, type) {
      if (control.value !== 'any') {
        filteredData = filteredData.filter(function (post) {
          return post.offer[type].toString() === control.value;
        });
      }
      return filteredData;
    };

    // Filter select range values
    var controlRangeFilter = function (control) {
      switch (control.value) {
        case 'any':
          break;
        case 'low':
          filteredData = filteredData.filter(function (post) {
            return post.offer.price <= PRICE_FROM;
          });
          break;
        case 'middle':
          filteredData = filteredData.filter(function (post) {
            return post.offer.price > PRICE_FROM && post.offer.price < PRICE_TO;
          });
          break;
        case 'high':
          filteredData = filteredData.filter(function (post) {
            return post.offer.price >= PRICE_TO;
          });
          break;
      }
      return filteredData;
    };

    // Filter checkboxes
    var controlCheckboxFilter = function (controls) {
      controls.forEach(function (element) {
        if (element.checked) {
          filteredData = filteredData.filter(function (post) {
            return post.offer.features.indexOf(element.value) !== -1;
          });
        }
      });

      return filteredData;
    };

    // Fireup filter functions for each form control
    controlSelectFilter(typeControl, 'type');
    controlRangeFilter(priceControl);
    controlSelectFilter(roomsControl, 'rooms');
    controlSelectFilter(guestsControl, 'guests');
    controlCheckboxFilter(featuresControls);

    // Generate all pins based on filtered data
    window.pin.generatePins(filteredData);
    // Show card for newly generated pins
    window.showCard(document.querySelectorAll('.map__pin:not(.map__pin--main)'), filteredData);
  };

  filterForm.addEventListener('change', function () {
    window.debounce(updateMapPins);
  });

})();
