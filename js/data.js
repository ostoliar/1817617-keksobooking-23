import { showAlert} from './utils.js';
import { showRequestSuccessMessage, addHideMessageHandlers, showServerErrorMessage} from './messaging.js';

function showServerSubmitErrorAlert(){
  showAlert('Не удалось получить данные');
}

export async function getOffers(){
  return fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) =>{
      if(!response.ok){
        throw new Error('Failed to load data');
      }
      return response.json();
    })
    .catch((error) => {
      showServerSubmitErrorAlert();
      throw error;
    });
}


export function postOffer(offerData, onSuccess){
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: offerData,
    },
  )
    .then((response) => {
      if(!response.ok){
        throw new Error('Failed to load data');
      }
      showRequestSuccessMessage();
      onSuccess();
      addHideMessageHandlers();

      // if (response.ok) {
      //   showRequestSuccessMessage();
      //   onSuccess();
      //   addHideMessageHandlers();
      // } else {
      //   showServerErrorMessage();
      //   addHideMessageHandlers();
      // }
    })
    .catch((error) => {
      showServerErrorMessage();
      addHideMessageHandlers();
      throw error;
    });
}

