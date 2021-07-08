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

function cleanupForm(dataForm) {
  dataForm.querySelector('#title').value = '';
  dataForm.querySelector('#address').value = '';
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
