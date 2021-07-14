import { getOfferTemplate } from './offer-template.js';
import { setMapMarker } from './map.js';
import { intialize as intializeFormValidation } from './form-validation.js';
import { getOffers } from './data.js';
import { initialize as initializeLoadPhoto } from './load-photos.js';
import { ANY_VALUE, initialize as initializeFilter } from './filter.js';
import { resetAllMarkers } from './map.js';
import { getNumericValue } from './utils.js';
import { PriceOptions } from './filter.js';

function typeMatches(offer, filterData) {
  return filterData.type === ANY_VALUE || filterData.type === offer.type;
}

function guestsMatch(offer, filterData) {
  return (
    filterData.guests === ANY_VALUE ||
    getNumericValue(filterData.guests) < offer.guests
  );
}

function roomsMatch(offer, filterData) {
  return (
    filterData.rooms === ANY_VALUE ||
    getNumericValue(filterData.rooms) === offer.rooms
  );
}

function featuresMatch(offer, filterData) {
  const offerFeatures = offer.features || [];
  return filterData.features.every((item) => offerFeatures.includes(item));
}

function priceMatches(offer, filterData) {
  const priceRange = PriceOptions[filterData.price];
  return (
    filterData.price === ANY_VALUE ||
    offer.price > priceRange.from ||
    offer.price < priceRange.to
  );
}

function filterOffer(offer, filterData) {
  if (
    typeMatches(offer, filterData) &&
    guestsMatch(offer, filterData) &&
    roomsMatch(offer, filterData) &&
    featuresMatch(offer, filterData) &&
    priceMatches(offer, filterData)
  ) {
    return true;
  }
  return false;
}

async function loadOffers() {
  const offers = await getOffers();
  initializeFilter((filterData) => {
    resetAllMarkers();
    offers
      .filter((item) => filterOffer(item.offer, filterData))
      .slice(0, 10)
      .forEach((item) => {
        const offerTemplate = getOfferTemplate(item.offer);
        setMapMarker(item.location, offerTemplate);
      });
  });
}

intializeFormValidation();
initializeLoadPhoto();
loadOffers();
