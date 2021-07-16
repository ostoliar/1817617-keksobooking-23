import { getOfferTemplate } from './offer-template.js';
import { setSubmittedMapMarker, resetMainMarker } from './map.js';
import { postOffer } from './data.js';
import { myMap } from './map.js';
import { resetCheckBoxes } from './utils.js';
import { reset as resetFilterForm}  from './filter.js';

const form = document.querySelector('.ad-form');
const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');
const appartmentTypeElement = form.querySelector('#type');
const titleElement = form.querySelector('#title');
const priceElement = form.querySelector('#price');
const addressElement = form.querySelector('#address');
const descriptionElement = form.querySelector('#description');
const avatarPhoto = document.querySelector('#avatar-image');
const resetButton = document.querySelector('.ad-form__reset');
const offer = {
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const getFormData = () => ({
  title: titleElement.value,
  price: priceElement.value,
  features: [
    ...form.querySelectorAll('.features input:checked'),
  ].map((element) => element.value),
  address: addressElement.value,
  type:
      appartmentTypeElement.options[appartmentTypeElement.selectedIndex].text,
  description: descriptionElement.value,
  rooms: roomNumberElement.options[roomNumberElement.selectedIndex].text,
  guests: capacityElement.options[capacityElement.selectedIndex].text,
  checkin: timeInElement.options[timeInElement.selectedIndex].text,
  checkout: timeOutElement.options[timeOutElement.selectedIndex].text,
  photos: offer.photos,
});

const resetForm = () => {
  titleElement.value = '';
  descriptionElement.value = '';
  appartmentTypeElement.selectedIndex = 1;
  appartmentTypeElement.dispatchEvent(new Event('change'));
  priceElement.value = '';
  roomNumberElement.selectedIndex = 0;
  capacityElement.selectedIndex = 2;
  timeInElement.selectedIndex = 0;
  timeOutElement.selectedIndex = 0;
  avatarPhoto.src = 'img/muffin-grey.svg';
  document.querySelectorAll('.user-photo').forEach((item) => {
    item.parentNode.removeChild(item);
  });
  const featuresCheckboxes = document.querySelectorAll('.features__checkbox');
  resetCheckBoxes(featuresCheckboxes);
};

const closePopup = () => {
  myMap.closePopup();
};

resetButton.addEventListener('click', () => {
  resetMainMarker();
  resetFilterForm();
  resetForm();
  closePopup();
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const formData = getFormData();
  const offerTemplate = getOfferTemplate(formData);
  const offerData = new FormData(form);

  try {
    await postOffer(offerData);
  }
  finally {
    resetMainMarker();
    closePopup();

  }
  setSubmittedMapMarker(offerTemplate);
  resetForm();
  resetFilterForm();
});


export { form, roomNumberElement as roomNumber, capacityElement as capacity };
