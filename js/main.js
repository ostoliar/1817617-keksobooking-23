import {similarOffer} from './create-offer.js';
import {getOfferTemplate, template} from './offer-template.js';
import {tileLayer, myMap, setMapMarker} from './map.js';
import {priceArea, formTitle} from './form-validation.js';
import { getOffers } from './data.js';
import {FILE_TYPES, fileChooser, preview, previewApartmentPhotos, fileChooserApartmentPhotos} from './avatar.js';

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

async function loadOffers() {
  const offers = await getOffers();
  offers.forEach((item) => {
    const offerTemplate = getOfferTemplate(item.offer);
    setMapMarker(item.location, offerTemplate);
  });
}

loadOffers();


