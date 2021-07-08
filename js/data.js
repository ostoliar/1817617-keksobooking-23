import { getOfferTemplate } from './offer-template.js';
import { setMapMarker } from './map.js';
import { showAlert, showSuccessMessage } from './utils.js';

function showServerErrorAlert(){
  showAlert('Не удалось отправить форму. Попробуйте ещё раз');
}

function showServerSubmitErrorAlert(){
  showAlert('Не удалось получить данные');
}

function showRequestSuccessMessage() {
  showSuccessMessage('Данные отправлены успешно');
}

// rename getOffers()
const offer = fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) =>
    response.ok ? response.json() : showServerSubmitErrorAlert(),
  )
  .catch(() => {
    showServerSubmitErrorAlert();
  });

// move to main
const getValue = async () => {
  const offers = await offer;
  offers.forEach((item) => {

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
      } else {
        showServerErrorAlert();
      }
    })
    .catch(() => {
      showServerErrorAlert();
    });
}


export {offer, showAlert};
