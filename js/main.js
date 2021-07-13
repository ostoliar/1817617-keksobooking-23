import { similarOffer} from './create-offer.js';
import {getOfferTemplate, template} from './offer-template.js';
import {tileLayer, myMap, setMapMarker} from './map.js';
import {priceArea, formTitle} from './form-validation.js';
import { getOffers } from './data.js';
import {FILE_TYPES, fileChooser, preview, previewApartmentPhotos, fileChooserApartmentPhotos} from './avatar.js';
import {initialize} from './filter.js';
import {resetAllMarkers} from './map.js';
import {getNumericValue} from './utils.js';


similarOffer;
template;
tileLayer;
myMap;
priceArea;
formTitle;
preview;
fileChooser;
FILE_TYPES;
fileChooserApartmentPhotos;
previewApartmentPhotos;

function filterOffer(offer, filterData) {
  if(filterData.type !== 'any' && filterData.type !== offer.type) {
    return false;
  }
  if(filterData.rooms !== 'any' && getNumericValue(filterData.rooms) !== offer.rooms) {
    return false;
  }
  if(filterData.guests !== 'any' && getNumericValue(filterData.guests) >= offer.guests) {
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


