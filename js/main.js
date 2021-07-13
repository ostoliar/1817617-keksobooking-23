import {getOfferTemplate} from './offer-template.js';
import {setMapMarker} from './map.js';
import {intialize as intializeFormValidation} from './form-validation.js';
import { getOffers } from './data.js';
import {initialize as initializeLoadPhoto} from './load-photos.js';
import {ANY_VALUE, initialize as initializeFilter} from './filter.js';
import {resetAllMarkers} from './map.js';
import {getNumericValue} from './utils.js';
import {PriceOptions} from './filter.js';

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
  const priceRange = PriceOptions[filterData.price];
  if(filterData.price !== ANY_VALUE &&  (offer.price < priceRange.from ||  offer.price > priceRange.to)) {
    return false;
  }
  return true;
}

async function loadOffers() {
  const offers = await getOffers();
  initializeFilter((filterData) => {
    resetAllMarkers();
    offers
      .filter((item) => filterOffer(item.offer, filterData))
      .slice(0,10)
      .forEach((item) => {
        const offerTemplate = getOfferTemplate(item.offer);
        setMapMarker(item.location, offerTemplate);
      });
  });
}

intializeFormValidation();
initializeLoadPhoto();
loadOffers();


