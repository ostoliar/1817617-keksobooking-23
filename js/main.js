import {similarOffer} from './create-offer.js';
import {getOfferTemplate, template} from './offer-template.js';
import {tileLayer, myMap, setMapMarker} from './map.js';
import {priceArea, formTitle} from './form-validation.js';
import { getOffers } from './data.js';

similarOffer;
template;
tileLayer;
myMap;
priceArea;
formTitle;

async function loadOffers() {
  const offers = await getOffers();
  offers.forEach((item) => {
    const offerTemplate = getOfferTemplate(item.offer);
    setMapMarker(item.location, offerTemplate);
  });
}

loadOffers();


