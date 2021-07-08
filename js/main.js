import {similarOffer} from './create-offer.js';
import {getOfferTemplate, template} from './offer-template.js';
import {tileLayer, myMap} from './map.js';
import {priceArea, formTitle} from './form-validation.js';
import {offer} from './data.js';
import {isEscEvent} from './utils.js';

export function closeSuccessAlertMessage() {
  const successMessage = document.querySelector('.success');

  document.addEventListener('keydown', ()=> {
    if(isEscEvent){
      successMessage.classList.add('hidden');
    }
  });
  document.addEventListener('click', ()=> {
    successMessage.classList.add('hidden');
  });
}

export function closeServerAlertMessage() {
  const errorMessage = document.querySelector('.error');
  const closeAlertButton = document.querySelector('.error__button');

  document.addEventListener('keydown', ()=> {
    if(isEscEvent){
      errorMessage.classList.add('hidden');
    }
  });
  document.addEventListener('click', ()=> {
    errorMessage.classList.add('hidden');
  });
  closeAlertButton.addEventListener('click', ()=> {
    errorMessage.classList.add('hidden');
  });
}


similarOffer;
template;
tileLayer;
myMap;
priceArea;
formTitle;
getOfferTemplate;
offer;


