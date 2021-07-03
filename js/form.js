import { getOfferTemplate } from './offer-template.js';
import { setMapMarkers } from './map.js';

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
    selectedFeatures: [
      ...dataForm.querySelectorAll('.features input:checked'),
    ].map((element) => element.value),
    address: dataForm.querySelector('#address').value,
    appartmentType:
      appartmentTypeElement.options[appartmentTypeElement.selectedIndex].text,
    description: form.querySelector('#description').value,
    roomNumber: roomNumberElement.options[roomNumberElement.selectedIndex].text,
    capacity: capacityElement.options[capacityElement.selectedIndex].text,
    timeIn: timeInElement.options[timeInElement.selectedIndex].text,
    timeOut: timeOutElement.options[timeOutElement.selectedIndex].text,
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
  setMapMarkers(offerTemplate);

  cleanupForm(form);
});

export { form, roomNumberElement as roomNumber, capacityElement as capacity };
