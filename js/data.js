import { getOfferTemplate } from './offer-template.js';
import { setMapMarker } from './map.js';
import { showAlert} from './utils.js';
import { closeSuccessAlertMessage, closeServerAlertMessage} from './main.js';

const mainBlock = document.querySelector('.notice');

function showServerErrorAlert(){
  const errorTemplate = document.querySelector('#error').content;
  const errorMessage = errorTemplate.cloneNode(true);
  mainBlock.appendChild(errorMessage);
}

function showServerSubmitErrorAlert(){
  showAlert('Не удалось получить данные');
}

function showRequestSuccessMessage() {
  const successTemplate = document.querySelector('#success').content;
  const successMessage = successTemplate.cloneNode(true);
  mainBlock.appendChild(successMessage);
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
        closeSuccessAlertMessage();
      } else {
        showServerErrorAlert();
        closeServerAlertMessage();
      }
    })
    .catch(() => {
      showServerErrorAlert();
    });
}


export {offer, showAlert};
