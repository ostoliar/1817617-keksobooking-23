import { showAlert } from './utils.js';
import {
  showRequestSuccessMessage,
  addHideMessageHandlers,
  showServerErrorMessage
} from './messaging.js';

const HttpMethods = {
  Post: 'POST',
};
const ApiUrls = {
  getOffers: 'https://23.javascript.pages.academy/keksobooking/data',
  postOffer: 'https://23.javascript.pages.academy/keksobooking',
};

function showServerSubmitErrorAlert() {
  showAlert('Не удалось получить данные');
}

export async function getOffers() {
  return fetch(ApiUrls.getOffers)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      return response.json();
    })
    .catch((error) => {
      showServerSubmitErrorAlert();
      throw error;
    });
}

export function postOffer(offerData, onSuccess) {
  fetch(ApiUrls.postOffer, {
    method: HttpMethods.Post,
    body: offerData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      showRequestSuccessMessage();
      onSuccess();
      addHideMessageHandlers();
    })
    .catch((error) => {
      showServerErrorMessage();
      addHideMessageHandlers();
      throw error;
    });
}
