import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address') as HTMLInputElement;

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error("Missing 'VITE_GOOGLE_API_KEY' environment variable!");
}

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`,
    )
    .then(async (response) => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location!');
      }
      const coordinates = response.data.results[0].geometry.location;
      const { Map } = (await google.maps.importLibrary(
        'maps',
      )) as google.maps.MapsLibrary;
      const map = new Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        mapId: 'ts-map-demo',
      });

      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker',
      )) as google.maps.MarkerLibrary;
      new AdvancedMarkerElement({
        map: map,
        position: coordinates,
      });
      map.setCenter(coordinates);
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
