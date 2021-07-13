import { isEscEvent } from './utils.js';

const mainBlock = document.querySelector('.notice');
const handlers = [];

function showMessage(elementSelector){
  const temlate = document.querySelector(elementSelector).content;
  const message = temlate.cloneNode(true);
  mainBlock.appendChild(message);
}

function hideMessage(elementSelector){
  const message = document.querySelector(elementSelector);
  message.classList.add('hidden');
  handlers.forEach((item) => document.removeEventListener(item.name, item.handler));
}

export function addHideMessageHandlers(elementSelector){
  handlers.push({name: 'keydown', handler: ()=> {
    if(isEscEvent){
      hideMessage(elementSelector);
    }
  }});
  handlers.push({name: 'click', handler: ()=> {
    hideMessage(elementSelector);
  }});
  handlers.forEach((item) => document.addEventListener(item.name, item.handler));
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
