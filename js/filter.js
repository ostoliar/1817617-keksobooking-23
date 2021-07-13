
const filterForm = document.querySelector('.map__filters');
const appartmentTypeElement = filterForm.querySelector('#housing-type');
const roomNumberElement = filterForm.querySelector('#housing-rooms');
const capacityElement = filterForm.querySelector('#housing-guests');
const featureInputElements = filterForm.querySelectorAll('input.map__checkbox');

export const ANY_VALUE = 'any';

function getFilterData() {
  return {
    price: filterForm.querySelector('#housing-price').value,
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
  const changeElements = [appartmentTypeElement, roomNumberElement, capacityElement, ...featureInputElements];
  changeElements.forEach((item) => {
    item.onchange = () => filterChanged(getFilterData());
  });
}


