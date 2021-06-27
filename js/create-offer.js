import {getRandomNumber, getRandomCoordinates} from './random-number.js';

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

export {similarOffer, author, offer};
