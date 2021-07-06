import { getOfferTemplate } from './offer-template.js';
import { setMapMarker } from './map.js';

const offer = fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json());

// const getValue = async () => {
//   const dataValue = await offer;
//   dataValue.forEach((item) => {
//     const offerTemplate = getOfferTemplate({
//       coordinates: item.location,
//     });
//     setDataMarkers(item.location, offerTemplate);
//   });
// };


const getValue = async () => {
  const offers = await offer;
  offers.forEach((item) => {

    const offerTemplate = getOfferTemplate(item.offer);
    setMapMarker(item.location, offerTemplate);
  });
};

getValue();


export {offer};
