'use strict';

(function () {
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

})();
