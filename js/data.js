import { getOfferTemplate } from './offer-template.js';
import { setMapMarker } from './map.js';
import { showAlert} from './utils.js';
import { showRequestSuccessMessage, addHideMessageHandlers, showServerErrorMessage} from './messaging.js';


function showServerSubmitErrorAlert(){
  showAlert('Не удалось получить данные');
}

const offer = fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) =>
    response.ok ? response.json() : showServerSubmitErrorAlert(),
  )
  .catch(() => {
    showServerSubmitErrorAlert();
  });

const getValue = async () => {
  const offers = await offer;
  offers.slice(0,10).forEach((item) => {

    const offerTemplate = getOfferTemplate(item.offer);
    setMapMarker(item.location, offerTemplate);
  });
};

getValue();

export function postOffer(offerData, onSuccess){
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: offerData,
    },
  )
    .then((response) => {
      if (response.ok) {
        showRequestSuccessMessage();
        onSuccess();
        addHideMessageHandlers();
      } else {
        showServerErrorMessage();
        addHideMessageHandlers();
      }
    })
    .catch(() => {
      showServerErrorMessage();
    });
}


export {offer, showAlert};
