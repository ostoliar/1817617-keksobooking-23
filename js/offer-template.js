import { getRandomNumber } from './random-number.js';
import { author, offer } from './create-offer.js';

const template = document.querySelector('#card').content;

function setTitle(newTemplate, title) {
  const popupTitle = newTemplate.querySelector('.popup__title');
  popupTitle.textContent = title;
}

function setPrice(newTemplate, price) {
  const templatePriceArea = newTemplate.querySelector('.popup__text--price');
  templatePriceArea.textContent = price;
}

function setAddress(newTemplate, address) {
  const templateAddress = newTemplate.querySelector('.popup__text--address');
  templateAddress.textContent = address;
}

function setApartmentType(newTemplate, appartmentType) {
  const templateTypeOfApartment = newTemplate.querySelector('.popup__type');
  templateTypeOfApartment.textContent = appartmentType;
}

function setTimeArrival(newTemplate, timeIn, timeOut) {
  const templateTimeArea = newTemplate.querySelector('.popup__text--time');
  templateTimeArea.textContent = `Заезд  ${timeIn},  ${timeOut}`;
}

function setCapacity(newTemplate, roomNumber, capacity) {
  const templateCapacity = newTemplate.querySelector('.popup__text--capacity');
  templateCapacity.textContent = `${roomNumber}  ${capacity}`;
}

function setDescription(newTemplate, description) {
  const templateDescription = newTemplate.querySelector('.popup__description');
  templateDescription.textContent = description;
  if (description === '') {
    templateDescription.style.display = 'none';
  }
}
function setAvatar(newTemplate, avatar) {
  const templateAvatar = newTemplate.querySelector('.popup__avatar');
  templateAvatar.src = `${avatar + 0 + getRandomNumber(1, 9).result}.png`;
}

function setFeatures(newTemplate, selectedFeatures) {
  selectedFeatures.forEach((selectedFeature) => {
    const elem = newTemplate.querySelector(`.popup__feature--${selectedFeature}`);
    elem.classList.add('show');
  });
}

function setPhotos(newTemplate, photos) {
  for(let index= 0; index < photos.length; index++) {
    const templatePhotos = newTemplate.querySelector('.popup__photos');
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', photos[index]);
    imgElement.setAttribute('height', '40');
    imgElement.setAttribute('width', '45');
    imgElement.setAttribute('alt', 'Фотография жилья');
    templatePhotos.appendChild(imgElement);
  }
}

export function getOfferTemplate(formData){
  const newItemTemplate = template.querySelector('.popup');
  const newTemplate = newItemTemplate.cloneNode(true);

  setFeatures(newTemplate, formData.selectedFeatures);
  setPhotos(newTemplate, offer.photos);
  setTitle(newTemplate, formData.title);
  setAddress(newTemplate, formData.address);
  setPrice(newTemplate, formData.price);
  setApartmentType(newTemplate, formData.appartmentType);
  setTimeArrival(newTemplate, formData.timeIn, formData.timeOut);
  setCapacity(newTemplate, formData.roomNumber, formData.capacity);
  setDescription(newTemplate, formData.description);
  setAvatar(newTemplate, author.avatar);
  return newTemplate;
}

export { template };
