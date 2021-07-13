import { getOfferTemplate } from './offer-template.js';
import { setSubmittedMapMarker, resetMainMarker } from './map.js';
import { offer } from './create-offer.js';
import { postOffer } from './data.js';

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

function getFormData() {
  return {
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
  };
}

function cleanCheckBoxes() {
  const checkboxes = document.querySelectorAll('.features__checkbox');
  for (let item = 0; item < checkboxes.length; item++) {
    checkboxes[item].checked = false;
  }
}

function cleanupForm() {
  titleElement.value = '';
  addressElement.value = '';
  descriptionElement.value = '';
  appartmentTypeElement.selectedIndex = 1;
  appartmentTypeElement.dispatchEvent(new Event('change'));
  priceElement.value = '';
  roomNumberElement.selectedIndex = 0;
  capacityElement.selectedIndex = 2;
  timeInElement.selectedIndex = 0;
  timeOutElement.selectedIndex = 0;
  avatarPhoto.src = 'img/muffin-grey.svg';
  document.querySelectorAll('.user-photo').forEach((item)=>{
    item.parentNode.removeChild(item);
  });
  cleanCheckBoxes();
}


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = getFormData();
  const offerTemplate = getOfferTemplate(formData);
  setSubmittedMapMarker(offerTemplate);
  const offerData = new FormData(form);

  postOffer(offerData, () => {
    resetMainMarker();
    cleanupForm();
  });
});


export { form, roomNumberElement as roomNumber, capacityElement as capacity };
