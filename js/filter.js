
const filterForm = document.querySelector('.map__filters');
const appartmentTypeElement = filterForm.querySelector('#housing-type');
const roomNumberElement = filterForm.querySelector('#housing-rooms');
const capacityElement = filterForm.querySelector('#housing-guests');
const featureInputElements = filterForm.querySelectorAll('input.map__checkbox');
const priceElement = filterForm.querySelector('#housing-price');

export const ANY_VALUE = 'any';
export const priceOptions = {
  low: {from: 0, to: 10000},
  middle: {from: 10000, to: 50000},
  high: {from: 50000, to: Infinity},
};

function getFilterData() {
  return {
    price: priceElement.value,
    features: [
      ...filterForm.querySelectorAll('input.map__checkbox:checked'),
    ].map((element) => element.value),
    type:
          appartmentTypeElement.options[appartmentTypeElement.selectedIndex].value,
    rooms: roomNumberElement.options[roomNumberElement.selectedIndex].value,
    guests: capacityElement.options[capacityElement.selectedIndex].value,
  };
}

export function initialize(filterChanged) {
  filterChanged(getFilterData());
  const changeElements = [appartmentTypeElement, roomNumberElement, capacityElement, ...featureInputElements, priceElement];
  changeElements.forEach((item) => {
    item.onchange = () => filterChanged(getFilterData());
  });
}


