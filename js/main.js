import {similarOffer} from './create-offer.js';
import {getOfferTemplate, template} from './offer-template.js';
import {tileLayer, myMap} from './map.js';
import {priceArea, formTitle} from './form-validation.js';
import {offer} from './data.js';
import { isEscEvent} from './utils.js';


document.addEventListener('keydown', ()=> {
  const userModalElement = document.querySelector('.success');
  if(isEscEvent){
    userModalElement.classList.add('hidden');
  }
});

document.addEventListener('click', ()=> {
  const userModalElement = document.querySelector('.success');
  userModalElement.classList.add('hidden');
});

similarOffer;
template;
tileLayer;
myMap;
priceArea;
formTitle;
getOfferTemplate;
offer;


