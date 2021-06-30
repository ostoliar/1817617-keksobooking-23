import { form } from './offer-template.js';

const webToken = 'pk.eyJ1IjoiZXJ0ZWthIiwiYSI6ImNrcHgydmJrMjEyaDYybm56OHkzZWg4cjEifQ.DtvAiyAnZ6L54Jt7OCE7Dg';
const latitude = 35.6895;
const longitude = 139.69171;

// L - its var of leaflet library
const myMap = L.map('mapId').setView([latitude, longitude], 13);
const leafletOptions = {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: webToken,
};

const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', leafletOptions).addTo(myMap);

const formFilters = document.querySelector('.map__filters');

tileLayer.on('load',() => {
  form.classList.remove('ad-form--disabled');
  formFilters.classList.remove('ad-form--disabled');
});

const mainMarker = L.marker(
  {
    lat: latitude,
    lng: longitude,
  },
  {
    draggable: true,
  },
);

mainMarker.addTo(myMap);

const SetMarkerCoordinates = document.querySelector('#address');
mainMarker.on('moveend', (evt) => {
  const targetCoordinates = evt.target.getLatLng();
  const targetLatitude = targetCoordinates.lat.toFixed(5);
  const targetLongitude = targetCoordinates.lng.toFixed(5);
  SetMarkerCoordinates.value = `lat: ${targetLatitude}, lng: ${targetLongitude}` ;
});

const submitButton = document.querySelector('.ad-form__submit');
submitButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: latitude,
    lng: longitude,
  }),
  L.marker(
    {
      lat: 35.64463,
      lng: 139.78289,
    },
  );
  addTo(myMap);
});



//console.log(targetCoordinates)
export {myMap, tileLayer};
