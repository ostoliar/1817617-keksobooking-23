import {
  roomNumber as roomNumberElement,
  capacity as capacityElement
} from './form.js';
import { getNumericValue } from './utils.js';

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const formTitle = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const apartmentType = document.querySelector('#type');

const apartmentPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};


const checkTitleValidity = () => {
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
};

const reportTitleValidity = () => {
  checkTitleValidity();
  formTitle.reportValidity();
};

const setElementDisabled = (element, isDisabled) => {
  if (isDisabled) {
    element.setAttribute('disabled', true);
  } else {
    element.removeAttribute('disabled');
  }
};

const setAvailableCapacityOptions = () => {
  const roomNumber = getNumericValue(roomNumberElement.value);
  for (const option of capacityElement.options) {
    const capacity = getNumericValue(option.value);
    const isBlockedOption = roomNumber === 100
      ? capacity !== 0
      : capacity > roomNumber || capacity === 0;
    setElementDisabled(option, isBlockedOption);
  }
  capacityElement.querySelector('option:not([disabled])').selected = true;
};

const reportPriceValidity = () => {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(
      `Значение должно быть более или равно ${priceInput.min}`,
    );
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
};

const updatePriceMinValue = () => {
  const selectedApartmentType = apartmentType.value;
  const minPrice = apartmentPrice[selectedApartmentType];
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};

export const intialize = () => {
  checkTitleValidity();
  updatePriceMinValue();
  setAvailableCapacityOptions();

  roomNumberElement.onchange = setAvailableCapacityOptions;
  formTitle.addEventListener('blur', reportTitleValidity);
  formTitle.addEventListener('invalid', () => {
    formTitle.addEventListener('input', reportTitleValidity);
  });

  apartmentType.onchange = updatePriceMinValue;
  priceInput.addEventListener('blur', reportPriceValidity);
  priceInput.addEventListener('invalid', () => {
    priceInput.addEventListener('input', reportPriceValidity);
  });

  timeIn.onchange = (evt) => {
    const timeInValue = evt.target.value;
    timeOut.querySelector(`[value='${timeInValue}']`).selected = 'selected';
  };

  timeOut.onchange = (evt) => {
    const timeOutValue = evt.target.value;
    timeIn.querySelector(`[value='${timeOutValue}']`).selected = 'selected';
  };
};
