'use strict';

(function () {
  // Form Control Options
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var FORM_TYPES_MIN_PRICES = [1000, 0, 5000, 10000];
  var FORM_CONTROL_ERROR_COLOR = 'red';
  var FORM_CONTROL_DEFAULT_COLOR = '#d9d9d3';
  var FORM_CONTROL_TITLE_MIN_LENGTH = 30;
  var FORM_CONTROL_TITLE_MAX_LENGTH = 100;
  var formRoomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

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

  var syncCapacityWithRoomNumber = function () {
    var guests = formRoomCapacity[formControlRoomNumber.value];
    formControlCapacity.value = guests[0];

    // Disable non-valid options
    Array.from(formControlCapacity.options).forEach(function (element) {
      if (guests.includes(element.value)) {
        element.disabled = false;
      } else {
        element.disabled = true;
      }
    });
  };

  var syncRoomNumberWithCapacity = function () {
    if (!formRoomCapacity[formControlRoomNumber.value].includes(formControlCapacity.value)) {
      for (var property in formRoomCapacity) {
        if (formRoomCapacity[property].includes(formControlCapacity.value)) {
          formControlRoomNumber.value = property;
          syncCapacityWithRoomNumber();
          return;
        }
      }
    }
  };

  // Set Form Controls Values
  var setControlTimeinValue = function () {
    window.synchronizeFields(formControlTimein, formControlTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues);
  };

  var setControlTimeoutValue = function () {
    window.synchronizeFields(formControlTimeout, formControlTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues);
  };

  var setControlPriceMinValue = function () {
    window.synchronizeFields(formControlType, formControlPrice, FORM_TYPES, FORM_TYPES_MIN_PRICES, syncFormControlMinValues);
  };

  // Set min prices on form init
  setControlPriceMinValue();

  // Synchronize Form Controls on change
  formControlTimein.addEventListener('change', setControlTimeinValue);
  formControlTimeout.addEventListener('change', setControlTimeoutValue);
  formControlType.addEventListener('change', setControlPriceMinValue);
  formControlRoomNumber.addEventListener('change', syncCapacityWithRoomNumber);
  formControlCapacity.addEventListener('change', syncRoomNumberWithCapacity);


  // Form Validation

  // Title Control validation
  var onFormControlTitleValid = function () {
    if (!formControlTitle.validity.valid) {
      if (formControlTitle.validity.tooShort) {
        formControlTitle.setCustomValidity('Длина заголовка не менее ' + FORM_CONTROL_TITLE_MIN_LENGTH + ' символов');
      } else if (formControlTitle.validity.tooLong) {
        formControlTitle.setCustomValidity('Длина заголовка не более ' + FORM_CONTROL_TITLE_MAX_LENGTH + ' символов');
      } else if (formControlTitle.validity.valueMissing) {
        formControlTitle.setCustomValidity('Обязательное поле');
      } else {
        formControlTitle.setCustomValidity('');
      }
    } else {
      formControlPrice.style.borderColor = FORM_CONTROL_DEFAULT_COLOR;
      formControlPrice.setCustomValidity('');
    }
  };

  // Additional validation for min length (Edge doesn't support minlength)
  formControlTitle.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.value.length < FORM_CONTROL_TITLE_MIN_LENGTH) {
      target.style.borderColor = FORM_CONTROL_ERROR_COLOR;
      target.setCustomValidity('Длина заголовка не менее ' + FORM_CONTROL_TITLE_MIN_LENGTH + ' символов');
    } else {
      target.style.borderColor = FORM_CONTROL_DEFAULT_COLOR;
      target.setCustomValidity('');
    }
  });

  // Price Control validation
  var onFormControlPriceInvalid = function () {
    if (formControlPrice.validity.rangeUnderflow) {
      formControlPrice.setCustomValidity('Цена не менее ' + formControlPrice.min);
    } else if (formControlPrice.validity.rangeOverflow) {
      formControlPrice.setCustomValidity('Цена не более ' + formControlPrice.max);
    } else if (formControlPrice.validity.valueMissing) {
      formControlPrice.setCustomValidity('Обязательное поле');
    } else {
      formControlPrice.setCustomValidity('');
    }
  };

  // Address Control validation
  var onFormControlAddressInvalid = function () {
    if (formControlAddress.validity.valueMissing) {
      formControlAddress.setCustomValidity('Обязательное поле');
    } else {
      formControlAddress.setCustomValidity('');
    }
  };

  var resetInvalidFormControlStyle = function (field) {
    field.style.borderColor = '';
  };

  // Title
  formControlTitle.addEventListener('input', onFormControlTitleValid);

  formControlTitle.addEventListener('input', function () {
    resetInvalidFormControlStyle(formControlTitle);
  });

  formControlTitle.addEventListener('blur', function () {
    formControlTitle.checkValidity();
  });

  // Price
  formControlPrice.addEventListener('invalid', onFormControlPriceInvalid);

  formControlPrice.addEventListener('input', function () {
    resetInvalidFormControlStyle(formControlPrice);
  });

  formControlPrice.addEventListener('blur', function () {
    formControlPrice.checkValidity();
  });

  // Address
  formControlAddress.addEventListener('invalid', onFormControlAddressInvalid);


  var noticeForm = document.querySelector('.notice__form');
  var noticeFormControlReset = document.querySelector('.form__reset');

  // Reset Form
  var resetForm = function (form) {
    var requiredFormControls = form.querySelectorAll('input[required]');

    form.reset();
    setControlPriceMinValue();
    window.setMainPinCoords();

    requiredFormControls.forEach(function (element) {
      resetInvalidFormControlStyle(element);
    });
  };

  noticeForm.addEventListener('invalid', function (evt) {
    var invalidFormControl = evt.target;
    invalidFormControl.style.borderColor = FORM_CONTROL_ERROR_COLOR;

    if (invalidFormControl.validity.valueMissing) {
      invalidFormControl.setCustomValidity('Обязательное поле');
    } else {
      invalidFormControl.setCustomValidity('');
    }
  }, true);

  noticeFormControlReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm(noticeForm);
  });

  // Form Submit
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(noticeForm), function () {
      resetForm(noticeForm);
    }, window.backend.onError);

  });

})();
