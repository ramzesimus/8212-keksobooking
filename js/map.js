'use strict';

var POST_NUM = 8;
var MAP_MARKER_HEIGHT = 54;
var MAP_MARKER_WIDTH = 40;
var POST_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var POST_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var POST_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var POST_CHECKINS = ['12:00', '13:00', '14:00'];
var POST_CHECKOUTS = ['12:00', '13:00', '14:00'];

var ESC_KEYCODE = 27;

// Show map
var map = document.querySelector('.map');

// Map pins Container
var mapPinsContainer = document.querySelector('.map__pins');

// Map pin template
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

// Map Card Template
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapCardElement = mapCardTemplate.cloneNode(true);

// Get random number
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Used to shuffle array order https://learn.javascript.ru/task/shuffle-array
var compareRandom = function () {
  return Math.random() - 0.5;
};

// Get random key in Array
var getRandomArrayKeys = function (arr) {
  return arr[getRandomInt(0, arr.length - 1)];
};

// Shuffle keys in Object
var getRandomObjectKeys = function (obj) {
  var keys = Object.keys(obj);
  return obj[getRandomArrayKeys(keys)];
};

// Generates post data array
var getPosts = function (count, titles, types, checkins, checkouts, features) {
  var posts = [];

  // Shuffle Titles array
  titles.sort(compareRandom);

  for (var i = 0; i < count; i++) {

    /*
     * Create a new array
     * Slice the random number of elements
     * starting from the beginning
     * where max value is a length of origin Features array
     * and min value is 1
     */
    var featuresNew = features.slice(0, getRandomInt(1, features.length));

    /*
     * Location position
     * generate it outside to have ability to insert it offer.address and location.x and location.y
     */
    var locationX = getRandomInt(300, 900);
    var locationY = getRandomInt(100, 500);

    posts[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomInt(1000, 1000000),
        type: getRandomObjectKeys(types),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomArrayKeys(checkins),
        checkout: getRandomArrayKeys(checkouts),
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

  return posts;
};

// Get Posts
var posts = getPosts(POST_NUM, POST_TITLES, POST_TYPES, POST_CHECKINS, POST_CHECKOUTS, POST_FEATURES);

// Create Marker
var createMapMarker = function (post) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = post.location.x - MAP_MARKER_HEIGHT + 'px';
  pinElement.style.top = post.location.y - MAP_MARKER_WIDTH / 2 + 'px';
  pinElement.querySelector('img').src = post.author.avatar;

  return pinElement;
};

// Generate Map Markers
var generateMapMarkers = function (markers, target) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < markers.length; i++) {
    fragment.appendChild(createMapMarker(markers[i]));
  }

  return target.appendChild(fragment);
};

// generate markers
generateMapMarkers(posts, mapPinsContainer);


// Create Map Card
var createMapCard = function (post) {

  // Features popup
  var featuresContainer = mapCardElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';

  mapCardElement.querySelector('h3').textContent = post.offer.title;
  mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
  mapCardElement.querySelector('.popup__price').innerHTML = post.offer.price + '&#x20bd;/ночь';
  mapCardElement.querySelector('h4').textContent = post.offer.type;
  mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
  for (var i = 0; i < post.offer.features.length; i++) {
    featuresContainer.innerHTML += '<li class="feature feature--' + post.offer.features[i] + '"></li>';
  }
  mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

  return mapCardElement;
};

// Output Map Card
var outputMapCard = function (arrIndex) {
  var target = document.querySelector('.map');
  var mapCardFragment = document.createDocumentFragment();
  mapCardFragment.appendChild(createMapCard(posts[arrIndex]));

  return target.insertBefore(mapCardFragment, target.querySelector('.map__filters-container'));
};

outputMapCard(0);


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

var hideElement = function (target) {
  target.classList.add('hidden');
};

var showElement = function (target) {
  target.classList.remove('hidden');
};

var removeActivePins = function (arr) {
  arr.forEach(function (elem) {
    elem.classList.remove('map__pin--active');
  });
};

var onPopupEscPress = function (e) {
  if (e.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Find all the pins excepts the main one
var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
mapPins.forEach(function (elem) {
  hideElement(elem);
});

// Hide Popup by default
hideElement(popup);

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
    showElement(elem);

    elem.addEventListener('click', function () {
      removeActivePins(mapPins);
      showElement(popup);
      elem.classList.add('map__pin--active');
      outputMapCard(i);
      document.addEventListener('keydown', onPopupEscPress);
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
var closePopup = function () {
  hideElement(popup);
  removeActivePins(mapPins);

  document.removeEventListener('keydown', onPopupEscPress);
};
popupClose.addEventListener('click', closePopup);
