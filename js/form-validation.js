import { formTitle } from './offer-template.js';
import { priceArea } from './offer-template.js';


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

priceArea.addEventListener('input', () => {
  if(priceArea.value > 1000000) {
    priceArea.setCustomValidity('Значение должно быть не более 1000000');
  }
  if(priceArea.value <= 0) {
    priceArea.setCustomValidity('Значение должно быть больше 0');
  }
});


export { formTitle, priceArea};

