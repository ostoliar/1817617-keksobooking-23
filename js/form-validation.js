import { roomNumber as roomNumberElement, capacity as capacityElement } from './offer-template.js';


const formTitle = document.querySelector('#title');

formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  }
  else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

const priceArea = document.querySelector('#price');

priceArea.addEventListener('input', () => {
  if(priceArea.value > 1000000) {
    priceArea.setCustomValidity('Значение должно быть не более 1000000');
  }
  if(priceArea.value <= 0) {
    priceArea.setCustomValidity('Значение должно быть больше 0');
  }
});

function getNumericValue(value){
  return Number.parseInt(value, 10);
}

function setElementDisabled(element, isDisabled){
  if(isDisabled){
    element.setAttribute('disabled', true);
  }else{
    element.removeAttribute('disabled');
  }
}

function setAvailableCapacityOptions(){
  const roomNumber = getNumericValue(roomNumberElement.value);
  for(const option of capacityElement.options){
    const capacity = getNumericValue(option.value);
    setElementDisabled(option, roomNumber === 100 ? capacity !== 0 : capacity > roomNumber || capacity === 0);
  }
}

roomNumberElement.onchange = setAvailableCapacityOptions;
document.addEventListener('DOMContentLoaded', setAvailableCapacityOptions);

export { formTitle, priceArea};

