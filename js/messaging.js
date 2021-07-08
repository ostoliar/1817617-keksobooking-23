import { isEscEvent } from './utils.js';

const mainBlock = document.querySelector('.notice');

function showMessage(elementSelector){
  const temlate = document.querySelector(elementSelector).content;
  const message = temlate.cloneNode(true);
  mainBlock.appendChild(message);
}

function hideMessage(elementSelector){
  const message = document.querySelector(elementSelector);
  message.classList.add('hidden');
}

export function addHideMessageHandlers(elementSelector){
  document.addEventListener('keydown', ()=> {
    if(isEscEvent){
      hideMessage(elementSelector);
    }
  });
  document.addEventListener('click', ()=> {
    hideMessage(elementSelector);
  });
}

export function showServerErrorMessage(){
  showMessage('#error');
  addHideMessageHandlers('.error');
  const closeAlertButton = document.querySelector('.error__button');
  closeAlertButton.addEventListener('click', ()=> {
    hideMessage('.error');
  });
}

export function showRequestSuccessMessage() {
  showMessage('#success');
  addHideMessageHandlers('.success');
}
