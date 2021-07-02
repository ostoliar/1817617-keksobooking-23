import { result } from './random-number.js';
import { author, offer } from './create-offer.js';


const form = document.querySelector('.ad-form');
const template = document.querySelector('#card').content;
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');


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

function setTimeArrival(newTemplate) {
  const timeIn = form.querySelector('#timein');
  const timeOut = form.querySelector('#timeout');
  const selectedTimeIn = timeIn.options[timeIn.selectedIndex].text;
  const selectedTimeOut = timeOut.options[timeOut.selectedIndex].text;
  const templateTimeArea = newTemplate.querySelector('.popup__text--time');
  templateTimeArea.textContent = `Заезд  ${selectedTimeIn},  ${selectedTimeOut}`;
}

function setCapacity(newTemplate) {
  const selectedRoomNumber = roomNumber.options[roomNumber.selectedIndex].text;
  const selectedCapacity = capacity.options[capacity.selectedIndex].text;
  const templateCapacity = newTemplate.querySelector('.popup__text--capacity');
  templateCapacity.textContent = `${selectedRoomNumber}  ${selectedCapacity}`;
}

function setDescription(newTemplate) {
  const description = form.querySelector('#description');
  const descriptionAdded = description.value;
  const templateDescription = newTemplate.querySelector('.popup__description');
  templateDescription.textContent = descriptionAdded;
  if (descriptionAdded === '') {
    templateDescription.style.display = 'none';
  }
}
function setAvatar(newTemplate) {
  const templateAvatar = newTemplate.querySelector('.popup__avatar');
  templateAvatar.src = `${author.avatar + 0 + result.data}.png`;
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

function getFormData(dataForm){
  const appartmentTypeElement = form.querySelector('#type');
  return {
    title: dataForm.querySelector('#title').value,
    price: dataForm.querySelector('#price').value,
    selectedFeatures: [...dataForm.querySelectorAll('.features input:checked')].map((element) => element.value),
    address: dataForm.querySelector('#address').value,
    appartmentType: appartmentTypeElement.options[appartmentTypeElement.selectedIndex].text,
  };
}

function cleanupForm(dataForm){
  dataForm.querySelector('#title').value = '';
  dataForm.querySelector('#address').value = '';
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newItemTemplate = template.querySelector('.popup');
  const newTemplate = newItemTemplate.cloneNode(true);

  const formData = getFormData(form);

  setFeatures(newTemplate, formData.selectedFeatures);
  setPhotos(newTemplate, offer.photos);
  setTitle(newTemplate, formData.title);
  setAddress(newTemplate, formData.address);
  setPrice(newTemplate, formData.price);
  setApartmentType(newTemplate, formData.appartmentType);
  setTimeArrival(newTemplate);
  setCapacity(newTemplate);
  setDescription(newTemplate);
  setAvatar(newTemplate);

  form.appendChild(newTemplate);

  cleanupForm(form);
});

export { template, form, roomNumber as roomNumber, capacity as capacity};
