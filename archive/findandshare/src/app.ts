import './styles/app.scss';
import axios from 'axios';
const gapiScript = document.createElement('script');
gapiScript.setAttribute('defer', '');
gapiScript.setAttribute('async', '');
gapiScript.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`
);
document.head.appendChild(gapiScript);

const form = document.querySelector('form');
const addressInput = document.getElementById('address') as HTMLInputElement;
form!.addEventListener('submit', searchAddressHandler);

const GAPI_KEY = process.env.GOOGLE_API_KEY;

type GoogleGeoCodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event!.preventDefault();
    const enteredAddress = addressInput.value;

    axios
        .get<GoogleGeoCodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                enteredAddress
            )}&key=${GAPI_KEY}`
        )
        .then(res => {
            if (res.data.status !== 'OK') {
                throw new Error('Could not fetch location.');
            }
            const coordinates = res.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 16,
            });

            new google.maps.Marker({ position: coordinates, map });
        })
        .catch(err => {
            alert(err.message);
            console.log(err.message);
        });
}
