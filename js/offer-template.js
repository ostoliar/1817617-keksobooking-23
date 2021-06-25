import { result } from './random-number.js';
import { author, offer } from './create-offer.js';

const template = document.querySelector('#card').content;
const newItemTemplate = template.querySelector('.popup');
const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const addressValue = form.querySelector('#address');
const typeOfApartment = form.querySelector('#type');
const priceArea = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const description = form.querySelector('#description');
const photos = offer.photos;
const newTemplate = newItemTemplate.cloneNode(true);
const templateTimeArea = newTemplate.querySelector('.popup__text--time');

function addTitle() {
  const title = formTitle.value;
  const popupTitle = newTemplate.querySelector('.popup__title');
  popupTitle.textContent = title;
}

function addPrice() {
  const formPrice = priceArea.value;
  const templatePriceArea = newTemplate.querySelector('.popup__text--price');
  templatePriceArea.textContent = formPrice;
}

function addAddress() {
  const formAddress = addressValue.value;
  const templateAddress = newTemplate.querySelector('.popup__text--address');
  templateAddress.textContent = formAddress;
}

function addTypeOfApartment() {
  const selectedTypeOfApartment = typeOfApartment.options[typeOfApartment.selectedIndex].text;
  const templateTypeOfApartment = newTemplate.querySelector('.popup__type');
  templateTypeOfApartment.textContent = selectedTypeOfApartment;
}

function addTimeArrival() {
  const selectedTimeIn = timeIn.options[timeIn.selectedIndex].text;
  const selectedTimeOut = timeOut.options[timeOut.selectedIndex].text;
  templateTimeArea.textContent = `Заезд  ${selectedTimeIn},  ${selectedTimeOut}`;
}

function addCapacity() {
  const selectedRoomNumber = roomNumber.options[roomNumber.selectedIndex].text;
  const selectedCapacity = capacity.options[capacity.selectedIndex].text;
  const templateCapacity = newTemplate.querySelector('.popup__text--capacity');
  templateCapacity.textContent = `${selectedRoomNumber}  ${selectedCapacity}`;
}

function addDescription() {
  const descriptionAdded = description.value;
  const templateDescription = newTemplate.querySelector('.popup__description');
  templateDescription.textContent = descriptionAdded;
  if (descriptionAdded === '') {
    templateDescription.style.display = 'none';
  }
}
function addAvatar() {
  const templateAvatar = newTemplate.querySelector('.popup__avatar');
  templateAvatar.src = `${author.avatar + 0 + result.data}.png`;
}

function addFeatures() {
  const featureElements = form.querySelectorAll('.features input');
  featureElements.forEach((featureElement) => {
    if (featureElement.checked) {
      return;
    }
    const value = featureElement.value;
    const elem = newTemplate.querySelector(`.popup__feature--${value}`);
    elem.parentNode.removeChild(elem);
  });
}

function addPhotos() {
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


form.addEventListener('submit', (evt) => {
  evt.preventDefault();


  addFeatures(newTemplate);
  addPhotos();
  addTitle();
  addAddress();
  addPrice();
  addTypeOfApartment();
  addTimeArrival();
  addCapacity();
  addDescription();
  addAvatar();

  form.appendChild(newTemplate);

  formTitle.value = '';
  addressValue.value = '';
});

export { template, form };
