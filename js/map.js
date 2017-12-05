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
  var popup = document.querySelector('.popup');
  var popupClose = document.querySelector('.popup__close');

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

  // Hide Popup by default
  window.util.hideElement(popup);

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

    /*
     * Show all markers
     * show popup
     * add active class for map markers on click
     */
    mapPins.forEach(function (elem, i) {
      window.util.showElement(elem);

      elem.addEventListener('click', function () {
        window.pin.removeActivePins(mapPins);
        window.util.showElement(popup);
        elem.classList.add('map__pin--active');
        window.card.outputMapCard(i);
        document.addEventListener('keydown', window.card.onPopupEscPress);
      });
    });
  };

  // Activate map on mouseup
  mapPinMain.addEventListener('mouseup', activateMap);

  /*
   * Close Popup
   * remove all active pins
   * remove listener onPopupEscPress
   */
  popupClose.addEventListener('click', window.card.closePopup);


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
