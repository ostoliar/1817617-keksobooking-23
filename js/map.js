import { form } from './form.js';

const webToken =
  'pk.eyJ1IjoiZXJ0ZWthIiwiYSI6ImNrcHgydmJrMjEyaDYybm56OHkzZWg4cjEifQ.DtvAiyAnZ6L54Jt7OCE7Dg';
const latitude = 35.6795;
const longitude = 139.69171;

// L - its var of leaflet library
const myMap = L.map('mapId').setView([latitude, longitude], 13);
const leafletOptions = {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: webToken,
};

const tileLayer = L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  leafletOptions,
).addTo(myMap);

const formFilters = document.querySelector('.map__filters');

tileLayer.on('load', () => {
  form.classList.remove('ad-form--disabled');
  formFilters.classList.remove('ad-form--disabled');
});

const mainPinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainMarker = L.marker(
  {
    lat: latitude,
    lng: longitude,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(myMap);

const setMarkerCoordinates = document.querySelector('#address');
let coordinates = null;
mainMarker.on('moveend', (evt) => {
  const targetCoordinates = evt.target.getLatLng();
  const targetLatitude = targetCoordinates.lat.toFixed(5);
  const targetLongitude = targetCoordinates.lng.toFixed(5);
  coordinates = {
    lat: targetLatitude,
    lng: targetLongitude,
  };
  setMarkerCoordinates.value = `lat: ${targetLatitude}, lng: ${targetLongitude}`;
});
export function setMapMarker(location, offerTemplate) {
  L.marker(location)
    .addTo(myMap)
    .bindPopup(offerTemplate);
}

export function setSubmittedMapMarker(offerTemplate) {
  if (coordinates) {
    setMapMarker(coordinates, offerTemplate);
  }
}

export function resetMainMarker() {
  mainMarker.setLatLng({
    lat: latitude,
    lng: longitude,
  });
}


export { myMap, tileLayer };
