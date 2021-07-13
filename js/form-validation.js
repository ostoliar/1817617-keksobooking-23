import {
  roomNumber as roomNumberElement,
  capacity as capacityElement
} from './form.js';
import {getNumericValue} from './utils.js';

const addressCoordinates = document.querySelector('#address');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const formTitle = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const appartmentType = document.querySelector('#type');

const appartmentPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

function checkAddressValidity(){
  if (addressCoordinates.validity.valueMissing) {
    addressCoordinates.setCustomValidity('Обязательное поле, перетяните главный красный маркер на карте для установки адреса');
  } else {
    addressCoordinates.setCustomValidity('');
  }
}

function reportAddressValidity() {
  checkAddressValidity();
  addressCoordinates.reportValidity();
}

function checkTitleValidity() {
  if (formTitle.validity.tooShort) {
    formTitle.setCustomValidity(
      `Имя должно состоять минимум из ${formTitle.minLength} символов. Введено ${formTitle.value.length} символов`,
    );
  } else if (formTitle.validity.tooLong) {
    formTitle.setCustomValidity(
      `Имя не должно превышать ${formTitle.maxLength} символов`,
    );
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  } else {
    formTitle.setCustomValidity('');
  }
}

function reportTitleValidity() {
  checkTitleValidity();
  formTitle.reportValidity();
}

function setElementDisabled(element, isDisabled) {
  if (isDisabled) {
    element.setAttribute('disabled', true);
  } else {
    element.removeAttribute('disabled');
  }
}

function setAvailableCapacityOptions() {
  const roomNumber = getNumericValue(roomNumberElement.value);
  for (const option of capacityElement.options) {
    const capacity = getNumericValue(option.value);
    const isBlockedOption =
      roomNumber === 100
        ? capacity !== 0
        : capacity > roomNumber || capacity === 0;
    setElementDisabled(option, isBlockedOption);
  }
  capacityElement.querySelector('option:not([disabled])').selected = true;
}

function reportPriceValidity(){
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Значение должно быть более или равно ${priceInput.min}`);
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(
      `Значение не должно превышать ${priceInput.max} символов`,
    );
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
}

function updatePriceMinValue(){
  const selectedAppartmentType = appartmentType.value;
  const minPrice = appartmentPrice[selectedAppartmentType];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
}

export function intialize(){
  checkTitleValidity();
  updatePriceMinValue();
  checkAddressValidity();
  setAvailableCapacityOptions();

  roomNumberElement.onchange = setAvailableCapacityOptions;
  addressCoordinates.addEventListener('input', reportAddressValidity);
  formTitle.addEventListener('blur', reportTitleValidity);
  formTitle.addEventListener('invalid', () => {
    formTitle.addEventListener('input', reportTitleValidity);
  });

  appartmentType.onchange = updatePriceMinValue;
  priceInput.addEventListener('blur', reportPriceValidity);
  priceInput.addEventListener('invalid', () => {
    priceInput.addEventListener('input', reportPriceValidity);
  });

  timeIn.onchange = function (evt) {
    const timeInValue = evt.target.value;
    timeOut.querySelector(`[value='${timeInValue}']`).selected = 'selected';
  };
}

