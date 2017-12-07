'use strict';

(function () {
  var MAP_PIN_SIZES = {
    width: 62,
    height: 92
  };

  var COORDS_LIMITS = {
    top: 100,
    bottom: 500
  };

  // Show map
  var map = document.querySelector('.map');

  // Map Pin Main
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');

  // Disable all fields by setting up 'disabled' on fieldset tags
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  noticeFormFieldsets.forEach(function (elem) {
    elem.disabled = true;
  });

  // Find all the pins except the main one
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  mapPins.forEach(function (elem) {
    window.util.hideElement(elem);
  });

  // Activate map
  var activateMap = function () {
    // show map
    map.classList.remove('map--faded');

    // activate notice form
    noticeForm.classList.remove('notice__form--disabled');

    // make all fields activated
    noticeFormFieldsets.forEach(function (elem) {
      elem.disabled = false;
    });

    // show all pins
    mapPins.forEach(function (elem) {
      window.util.showElement(elem);
    });

    // show map card
    window.showCard(mapPins, window.card.getMapCard);
  };

  // Activate map on mouseup
  mapPinMain.addEventListener('mouseup', activateMap);


  /*
   * Move Main Pin
   */
  var formControlAddress = document.querySelector('#address');
  mapPinMain.style.zIndex = 2;

  var dragPinLimits = {
    minX: 0,
    minY: COORDS_LIMITS.top - MAP_PIN_SIZES.height / 2,
    maxX: map.clientWidth,
    maxY: COORDS_LIMITS.bottom - MAP_PIN_SIZES.height / 2
  };

  // Get Initial Map Pin coordinates
  var formControlAddressCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  // Set initial Main Pin coordinates as value for Address Field
  formControlAddress.value = 'x: ' + formControlAddressCoords.x + ', ' + 'y: ' + (formControlAddressCoords.y + MAP_PIN_SIZES.height / 2);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Get new coords for Address field
      formControlAddressCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if ((formControlAddressCoords.x >= dragPinLimits.minX && formControlAddressCoords.x <= dragPinLimits.maxX) &&
      (formControlAddressCoords.y >= dragPinLimits.minY && formControlAddressCoords.y <= dragPinLimits.maxY)) {
        mapPinMain.style.left = formControlAddressCoords.x + 'px';
        mapPinMain.style.top = formControlAddressCoords.y + 'px';

        // Set new coords for Address field
        formControlAddress.value = 'x: ' + formControlAddressCoords.x + ', ' + 'y: ' + (formControlAddressCoords.y + MAP_PIN_SIZES.height / 2);
      }


    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('moveup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
