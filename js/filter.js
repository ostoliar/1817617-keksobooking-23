import { resetCheckBoxes } from './utils.js';
import { debounce } from './utils/debounce.js';

const filterForm = document.querySelector('.map__filters');
const apartmentTypeElement = filterForm.querySelector('#housing-type');
const roomNumberElement = filterForm.querySelector('#housing-rooms');
const capacityElement = filterForm.querySelector('#housing-guests');
const featureInputElements = filterForm.querySelectorAll('input.map__checkbox');
const priceElement = filterForm.querySelector('#housing-price');
let filterChangedHandler = null;

export const ANY_VALUE = 'any';
export const PriceOptions = {
  low: { from: 0, to: 10000 },
  middle: { from: 10000, to: 50000 },
  high: { from: 50000, to: Infinity },
};

export const getFilterData = () => ({
  price: priceElement.value,
  features: [
    ...filterForm.querySelectorAll('input.map__checkbox:checked'),
  ].map((element) => element.value),
  type: apartmentTypeElement.options[apartmentTypeElement.selectedIndex]
    .value,
  rooms: roomNumberElement.options[roomNumberElement.selectedIndex].value,
  guests: capacityElement.options[capacityElement.selectedIndex].value,
});

export const initialize = (filterChanged) => {
  filterChangedHandler = filterChanged;
  filterChangedHandler(getFilterData());
  const changeElements = [
    apartmentTypeElement,
    roomNumberElement,
    capacityElement,
    ...featureInputElements,
    priceElement,
  ];
  changeElements.forEach((item) => {
    item.onchange = debounce(() => filterChangedHandler(getFilterData()), 500);
  });
};

export const disable = () => {
  filterForm.style.pointerEvents = 'none';
  filterForm.style.opacity = '0.3';
};

export const reset = () => {
  const housingFeatures = document.querySelectorAll('.map__checkbox');
  apartmentTypeElement.selectedIndex = 0;
  priceElement.selectedIndex = 0;
  roomNumberElement.selectedIndex = 0;
  capacityElement.selectedIndex = 0;
  resetCheckBoxes(housingFeatures);
  filterChangedHandler(getFilterData());
};
