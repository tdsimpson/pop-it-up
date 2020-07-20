const mymap = L.map('checkinMap').setView([0, 0], 2);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

let blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  console.log(data);

  for (item of data) {
    const marker = L.marker([item.lat, item.lon], { icon: blackIcon }).addTo(mymap);

    let txt = `${item.shopName}.<br> 
    ${item.eventDetails} <br>
    ${item.weather.name} is ${Math.round(item.weather.main.temp - 273.15)}&deg;C. 
    with ${item.weather.weather[0].description} <br>
    Updated at ${item.timestamp}`;

    marker.bindPopup(txt);
  }
  console.log(data);
}