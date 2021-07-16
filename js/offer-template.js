import { getRandomNumber } from './random-number.js';

const template = document.querySelector('#card').content;

const setTitle = (newTemplate, title) => {
  const popupTitle = newTemplate.querySelector('.popup__title');
  popupTitle.textContent = title;
};

const setPrice = (newTemplate, price) => {
  const templatePriceArea = newTemplate.querySelector('.popup__text--price');
  templatePriceArea.textContent = price;
};

const setAddress = (newTemplate, address) => {
  const templateAddress = newTemplate.querySelector('.popup__text--address');
  templateAddress.textContent = address;
};

const setApartmentType = (newTemplate, type) => {
  const templateTypeOfApartment = newTemplate.querySelector('.popup__type');
  templateTypeOfApartment.textContent = type;
};

const setTimeArrival = (newTemplate, checkin, checkout) => {
  const templateTimeArea = newTemplate.querySelector('.popup__text--time');
  templateTimeArea.textContent = `Заезд  ${checkin},  ${checkout}`;
};

const setCapacity = (newTemplate, rooms, guests) => {
  const templateCapacity = newTemplate.querySelector('.popup__text--capacity');
  templateCapacity.textContent = `${rooms}  ${guests}`;
};

const setDescription = (newTemplate, description) => {
  const templateDescription = newTemplate.querySelector('.popup__description');
  templateDescription.textContent = description;
  if (description === '') {
    templateDescription.style.display = 'none';
  }
};

const setAvatar = (newTemplate, avatar) => {
  const templateAvatar = newTemplate.querySelector('.popup__avatar');
  templateAvatar.src = `${avatar + 0 + getRandomNumber(1,9)}.png`;
};

const setFeatures = (newTemplate, features) => {
  features.forEach((selectedFeature) => {
    const elem = newTemplate.querySelector(
      `.popup__feature--${selectedFeature}`,
    );
    elem.classList.add('show');
  });
};

const setPhotos = (newTemplate, photos) => {
  for (let index = 0; index < photos.length; index++) {
    const templatePhotos = newTemplate.querySelector('.popup__photos');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', photos[index]);
    imgElement.setAttribute('height', '40');
    imgElement.setAttribute('width', '45');
    imgElement.setAttribute('alt', 'Фотография жилья');
    templatePhotos.appendChild(imgElement);
  }
};

export const getOfferTemplate = (offer) => {
  const newItemTemplate = template.querySelector('.popup');
  const newTemplate = newItemTemplate.cloneNode(true);
  const author = {
    avatar: 'img/avatars/user',
  };
  if (offer.features) {
    setFeatures(newTemplate, offer.features);
  }
  if (offer.photos) {
    setPhotos(newTemplate, offer.photos);
  }

  setTitle(newTemplate, offer.title);
  setAddress(newTemplate, offer.address);
  setPrice(newTemplate, offer.price);
  setApartmentType(newTemplate, offer.type);
  setTimeArrival(newTemplate, offer.checkin, offer.checkout);
  setCapacity(newTemplate, offer.rooms, offer.guests);
  setDescription(newTemplate, offer.description);
  setAvatar(newTemplate, author.avatar);
  return newTemplate;
};
