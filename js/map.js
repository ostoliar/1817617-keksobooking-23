import { form } from './form.js';

const webToken =
  'pk.eyJ1IjoiZXJ0ZWthIiwiYSI6ImNrcHgydmJrMjEyaDYybm56OHkzZWg4cjEifQ.DtvAiyAnZ6L54Jt7OCE7Dg';
const CITY_CENTER_LATITUDE = 35.6795;
const CITY_CENTER_LONGITUDE = 139.69171;
const markers = [];

// L - its var of leaflet library
const myMap = L.map('mapId').setView([CITY_CENTER_LATITUDE, CITY_CENTER_LONGITUDE], 13);
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
    lat: CITY_CENTER_LATITUDE,
    lng: CITY_CENTER_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setMarkerCoordinatesField = (lat, lng) => {
  const setMarkerCoordinates = document.querySelector('#address');
  setMarkerCoordinates.value = `${lat}, ${lng}`;
};

mainMarker.addTo(myMap);
setMarkerCoordinatesField(CITY_CENTER_LATITUDE, CITY_CENTER_LONGITUDE);

let coordinates = {
  lat: CITY_CENTER_LATITUDE,
  lng: CITY_CENTER_LONGITUDE,
};
mainMarker.on('moveend', (evt) => {
  const targetCoordinates = evt.target.getLatLng();
  const targetLatitude = targetCoordinates.lat.toFixed(5);
  const targetLongitude = targetCoordinates.lng.toFixed(5);
  coordinates = {
    lat: targetLatitude,
    lng: targetLongitude,
  };
  setMarkerCoordinatesField(targetLatitude, targetLongitude);
});

export const setMapMarker = (location, offerTemplate) => {
  const marker = L.marker(location)
    .addTo(myMap)
    .bindPopup(offerTemplate);
  markers.push(marker);
};

export const setSubmittedMapMarker = (offerTemplate) => {
  setMapMarker(coordinates, offerTemplate);
};

export const resetMainMarker = () => {
  mainMarker.setLatLng({
    lat: CITY_CENTER_LATITUDE,
    lng: CITY_CENTER_LONGITUDE,
  });
  setMarkerCoordinatesField(CITY_CENTER_LATITUDE, CITY_CENTER_LONGITUDE);
};

export const resetAllMarkers = () => {
  markers.forEach((item) => {
    myMap.removeLayer(item);
  });
};

export {tileLayer, myMap};
