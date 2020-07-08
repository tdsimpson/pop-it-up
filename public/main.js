// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    let lat, lon, weather;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = lon.toFixed(2);
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json

      //document.getElementById('city').textContent = weather;
      document.getElementById('summary').textContent = weather.weather[0].description;
      document.getElementById('temp').textContent = Math.round(weather.main.temp - 273.15);

    } catch (error) {
      console.error(error);
    }

    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
      const shopName = document.getElementById('shopName').value;
      const eventDetails = document.getElementById('eventDetails').value;
      const data = { lat, lon, shopName, eventDetails, weather };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);
    });

  });
} else {
  console.log('geolocation not available');
}
