import { getOfferTemplate } from './offer-template.js';
import { setMapMarker } from './map.js';
import { intialize as intializeFormValidation } from './form-validation.js';
import { getOffers } from './data.js';
import { initialize as initializeLoadPhoto } from './load-photos.js';
import { resetAllMarkers } from './map.js';
import { getNumericValue } from './utils.js';
import { ANY_VALUE, initialize as initializeFilter, PriceOptions, disable as disableFilter } from './filter.js';

const typeMatches = (offer, filterData) => filterData.type === ANY_VALUE || filterData.type === offer.type;

const guestsMatch = (offer, filterData) => (
  filterData.guests === ANY_VALUE ||
    getNumericValue(filterData.guests) < offer.guests
);

const roomsMatch = (offer, filterData) => (
  filterData.rooms === ANY_VALUE ||
    getNumericValue(filterData.rooms) === offer.rooms
);

const featuresMatch = (offer, filterData) => {
  const offerFeatures = offer.features || [];
  return filterData.features.every((item) => offerFeatures.includes(item));
};

const priceMatches = (offer, filterData) => {
  const priceRange = PriceOptions[filterData.price];
  return (
    filterData.price === ANY_VALUE ||
    offer.price > priceRange.from ||
    offer.price < priceRange.to
  );
};

const filterOffer = (offer, filterData) => {
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
};

const loadOffers = async () => {
  let offers = [];
  try {
    offers = await getOffers();
  } catch (error) {
    disableFilter();
    throw error;
  }
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
};

intializeFormValidation();
initializeLoadPhoto();
loadOffers();
