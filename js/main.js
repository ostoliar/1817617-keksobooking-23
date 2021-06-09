const author = {
  avatar: 'img/avatars/user',
};

const offer = {
  title: 'Offer header',
  address: '',
  price: '',
  type: ['palace', 'flat', 'house', 'bungalow', 'hotel'],
  rooms: '',
  guests: '',
  checkin: ['12:00', '13:00', '14:00'],
  checkout: ['12:00', '13:00', '14:00'],
  features: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  description: 'Apartment description',
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const offerLocation = {
  lat: 'latitude - ',
  lng: 'longitude - ',
};

function generateErrorMessage(err) {
  const message = document.querySelector('.notice__title');
  function showErrorMessage() {
    message.innerHTML = `Переданное значение ${err.message}`;
  }
  showErrorMessage();
}

function validate(from, to){
  try {
    if (to < from) {
      throw new Error('«до» меньшее, чем значение «от»');
    }
    if (to === from) {
      throw new Error('«до» равное значению «от».');
    }
    return true;
  } catch (err) {
    generateErrorMessage(err);
    return false;
  }
}

function getRandomNumber(from, to) {
  if (!validate(from, to)) {
    return;
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);

  return (
    Math.floor(Math.random() * (roundedTo - roundedFrom + 1)) + roundedFrom
  );
}

function getRandomCoordinates(from, to, quantityAfterDecimal) {
  if (!validate(from, to)) {
    return;
  }
  const roundedFrom = Math.ceil(from);
  const roundedTo = Math.floor(to);
  const randomNumber =
    Math.random() * (roundedTo - roundedFrom) + roundedFrom;

  return randomNumber.toFixed(quantityAfterDecimal);
}

const getRandomArrayElement = (elements) => (elements[getRandomNumber(0, elements.length - 1)]);

const { type, checkin, checkout, features, photos } = offer;

const createOffer = () => ({
  author: `${author.avatar + 0 + getRandomNumber(1, 8)}.png`,
  title: offer.title,
  address:
      `location x - ${getRandomCoordinates(0, 10.5, 3)}; location y - ${getRandomCoordinates(0, 20.5, 3)}`,
  price: getRandomNumber(1, 100),
  type: getRandomArrayElement(type),
  rooms: getRandomNumber(1, 500),
  guests: getRandomNumber(1, 3000),
  checkin: getRandomArrayElement(checkin),
  checkout: getRandomArrayElement(checkout),
  features: getRandomArrayElement(features),
  photos: getRandomArrayElement(photos),
  location:
      `${offerLocation.lat + getRandomCoordinates(35.65, 35.7, 5) }; ${offerLocation.lng }${getRandomCoordinates(139.7, 139.8, 5)}`,
});

const SIMILAR_OFFER_COUNT = 10;

const similarOffer = new Array(SIMILAR_OFFER_COUNT)
  .fill(null)
  .map(() => createOffer());

similarOffer();
