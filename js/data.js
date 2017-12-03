'use strict';

(function () {

  var POST_NUM = 8;
  var POST_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var POST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var POST_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
  var POST_CHECKINS = ['12:00', '13:00', '14:00'];
  var POST_CHECKOUTS = ['12:00', '13:00', '14:00'];

  // Shuffle Titles array
  POST_TITLES.sort(window.util.compareRandom);

  // Create an empty array
  var posts = [];

  // Generates post data array
  window.data = function () {
    for (var i = 0; i < POST_NUM; i++) {

      /*
        * Create a new array
        * Slice the random number of elements
        * starting from the beginning
        * where max value is a length of origin Features array
        * and min value is 1
        */
      var featuresNew = POST_FEATURES.slice(0, window.util.getRandomInt(1, POST_FEATURES.length));

      /*
        * Location position
        * generate it outside to have ability to insert it offer.address and location.x and location.y
        */
      var locationX = window.util.getRandomInt(300, 900);
      var locationY = window.util.getRandomInt(100, 500);

      posts[i] = {
        author: {
          avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        offer: {
          title: POST_TITLES[i],
          address: locationX + ', ' + locationY,
          price: window.util.getRandomInt(1000, 1000000),
          type: window.util.getRandomObjectKeys(POST_TYPES),
          rooms: window.util.getRandomInt(1, 5),
          guests: window.util.getRandomInt(1, 10),
          checkin: window.util.getRandomArrayKeys(POST_CHECKINS),
          checkout: window.util.getRandomArrayKeys(POST_CHECKOUTS),
          features: featuresNew,
          description: '',
          photos: []
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }
  }();

  window.data = posts;

})();
