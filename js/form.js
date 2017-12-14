'use strict';

(function () {
  // Form Control Options
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var FORM_TYPES_MIN_PRICES = [1000, 0, 5000, 10000];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = ['1', '2', '3', '0'];

  // Form Controls
  var formControlTitle = document.querySelector('#title');
  var formControlAddress = document.querySelector('#address');
  var formControlType = document.querySelector('#type');
  var formControlTimein = document.querySelector('#timein');
  var formControlTimeout = document.querySelector('#timeout');
  var formControlPrice = document.querySelector('#price');
  var formControlRoomNumber = document.querySelector('#room_number');
  var formControlCapacity = document.querySelector('#capacity');

  // Synchronize Form Control values
  var syncFormControlValues = function (element, value) {
    element.value = value;
  };

  // Synchronize Form Control values with min values
  var syncFormControlMinValues = function (element, value) {
    element.min = value;
  };

  // Synchronize Form Controls
  window.synchronizeFields(formControlTimein, formControlTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues);
  window.synchronizeFields(formControlTimeout, formControlTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues);
  window.synchronizeFields(formControlType, formControlPrice, FORM_TYPES, FORM_TYPES_MIN_PRICES, syncFormControlMinValues);
  window.synchronizeFields(formControlRoomNumber, formControlCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncFormControlValues);


  // Custom Validation
  var customFormValidation = function (target) {
    target.style.borderColor = 'red';

    if (target.validity.tooShort) {
      target.setCustomValidity('Поле не должно содержать меньше ' + target.minLength + ' символов');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Поле не должно содержать больше ' + target.maxLength + ' символов');
    } else if (target.validity.rangeUnderflow || target.validity.rangeOverflow) {
      target.setCustomValidity('Число должно быть больше ' + target.min + ' и меньше ' + target.max);
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Это обязательное поле');
    } else {
      target.style.borderColor = '#d9d9d3';
      target.setCustomValidity('');
    }
  };

  formControlAddress.addEventListener('invalid', function () {
    customFormValidation(formControlAddress);
  });

  formControlTitle.addEventListener('invalid', function () {
    customFormValidation(formControlTitle);
  });

  formControlPrice.addEventListener('invalid', function () {
    customFormValidation(formControlPrice);
  });

  // Form Submit
  var form = document.querySelector('.notice__form');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.backend.onError);

  });

})();
