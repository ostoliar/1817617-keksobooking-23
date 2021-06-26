import { roomNumber, capacity } from './offer-template.js';


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


roomNumber.onchange =  function (evt){
  const value = evt.target.value;
  console.log(value);
  if( value === 2) {
    capacity.options[1].disabled = true;
    //capacity.disabled = true;

  }
};

export { formTitle, priceArea};

