import { getOfferTemplate } from './offer-template.js';
import { setSubmittedMapMarker, resetMainMarker } from './map.js';
import { offer } from './create-offer.js';
import { postOffer } from './data.js';

const form = document.querySelector('.ad-form');
const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');
const timeInElement = form.querySelector('#timein');
const timeOutElement = form.querySelector('#timeout');

function getFormData(dataForm) {
  const appartmentTypeElement = form.querySelector('#type');
  return {
    title: dataForm.querySelector('#title').value,
    price: dataForm.querySelector('#price').value,
    features: [
      ...dataForm.querySelectorAll('.features input:checked'),
    ].map((element) => element.value),
    address: dataForm.querySelector('#address').value,
    type:
      appartmentTypeElement.options[appartmentTypeElement.selectedIndex].text,
    description: form.querySelector('#description').value,
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


function cleanupForm(dataForm) {
  dataForm.querySelector('#title').value = '';
  dataForm.querySelector('#address').value = '';
  dataForm.querySelector('#description').value = '';
  dataForm.querySelector('#price').placeholder = 1000;
  dataForm.querySelector('#price').value = '';
  document.querySelector('#type').selectedIndex = 1;
  document.querySelector('#room_number').selectedIndex = 0;
  document.querySelector('#capacity').selectedIndex = 2;
  document.querySelector('#timein').selectedIndex = 0;
  document.querySelector('#timeout').selectedIndex = 0;
  cleanCheckBoxes();
}


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = getFormData(form);
  const offerTemplate = getOfferTemplate(formData);
  setSubmittedMapMarker(offerTemplate);
  const offerData = new FormData(form);

  postOffer(offerData, () => {
    resetMainMarker();
    cleanupForm(form);
  });
});


export { form, roomNumberElement as roomNumber, capacityElement as capacity };
