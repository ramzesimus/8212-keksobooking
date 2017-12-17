'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var SUCCESS_CODE = 200;
  var alertMessages = {
    errorLoad: 'Произошла ошибка',
    errorConnection: 'Произошла ошибка соединения',
    errorTimeout: 'Запрос не успел выполниться'
  };

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError(alertMessages.errorLoad);
      }
    });
    xhr.addEventListener('error', function () {
      onError(alertMessages.errorConnection);
    });
    xhr.addEventListener('timeout', function () {
      onError(alertMessages.errorTimeout);
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {

    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    onError: function (message) {
      var node = document.createElement('div');

      node.className = 'form-alert';

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(function () {
        node.classList.add('form-alert--show');
      }, 100);
    }
  };
})();
