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
  var syncFormControls = function (firstControl, secondControl, firstOptions, secondOptions, callbackFunction) {
    firstControl.addEventListener('change', function () {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callbackFunction(secondControl, secondOptions[indexOfValue]);
    });
  };

  syncFormControls(formControlTimein, formControlTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues);
  syncFormControls(formControlTimeout, formControlTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues);
  syncFormControls(formControlType, formControlPrice, FORM_TYPES, FORM_TYPES_MIN_PRICES, syncFormControlMinValues);
  syncFormControls(formControlRoomNumber, formControlCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncFormControlValues);


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
})();
