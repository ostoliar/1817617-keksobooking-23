
const filterForm = document.querySelector('.map__filters');
const appartmentTypeElement = filterForm.querySelector('#housing-type');
const roomNumberElement = filterForm.querySelector('#housing-rooms');
const capacityElement = filterForm.querySelector('#housing-guests');

function getFilterData() {
  return {
    price: filterForm.querySelector('#housing-price').value,
    features: [
      ...filterForm.querySelectorAll('.map__feature input:checked'),
    ].map((element) => element.value),
    type:
          appartmentTypeElement.options[appartmentTypeElement.selectedIndex].value,
    rooms: roomNumberElement.options[roomNumberElement.selectedIndex].value,
    guests: capacityElement.options[capacityElement.selectedIndex].value,
  };
}


export function initialize(filterChanged) {
  const filterData = getFilterData();
  filterChanged(filterData);
  appartmentTypeElement.onchange = ()=> {
    filterChanged(getFilterData());
  };
  roomNumberElement.onchange = ()=> {
    filterChanged(getFilterData());
  };
  capacityElement.onchange = ()=> {
    filterChanged(getFilterData());
  };
}


