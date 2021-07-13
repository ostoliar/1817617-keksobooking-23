import { similarOffer} from './create-offer.js';
import {getOfferTemplate} from './offer-template.js';
import {setMapMarker} from './map.js';
import {priceArea, formTitle} from './form-validation.js';
import { getOffers } from './data.js';
import {FILE_TYPES, fileChooser, preview, previewApartmentPhotos, fileChooserApartmentPhotos} from './avatar.js';
import {ANY_VALUE, initialize} from './filter.js';
import {resetAllMarkers} from './map.js';
import {getNumericValue} from './utils.js';

similarOffer;
priceArea;
formTitle;
preview;
fileChooser;
FILE_TYPES;
fileChooserApartmentPhotos;
previewApartmentPhotos;

function filterOffer(offer, filterData) {
  if(filterData.type !== ANY_VALUE && filterData.type !== offer.type) {
    return false;
  }
  if(filterData.rooms !== ANY_VALUE && getNumericValue(filterData.rooms) !== offer.rooms) {
    return false;
  }
  if(filterData.guests !== ANY_VALUE && getNumericValue(filterData.guests) >= offer.guests) {
    return false;
  }
  const offerFeatures = offer.features || [];
  if(!filterData.features.every((item) => offerFeatures.includes(item))){
    return false;
  }
  return true;
}

async function loadOffers() {
  const offers = await getOffers();
  initialize((filterData) => {
    resetAllMarkers();
    offers.filter((item) => filterOffer(item.offer, filterData))
      .forEach((item) => {
        const offerTemplate = getOfferTemplate(item.offer);
        setMapMarker(item.location, offerTemplate);
      });
  });
}

loadOffers();


