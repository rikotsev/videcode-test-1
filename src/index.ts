interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

function getWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  fetch(url)
    .then(resp => resp.json())
    .then((data: WeatherData) => {
      const container = document.getElementById('weather');
      if (container && data.current_weather) {
        container.innerHTML = `
          <h2>Current Weather</h2>
          <p>Temperature: ${data.current_weather.temperature}&deg;C</p>
          <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
          <p>Time: ${data.current_weather.time}</p>
        `;
      }
    })
    .catch(err => {
      const container = document.getElementById('weather');
      if (container) container.innerText = 'Error fetching weather data';
      console.error(err);
    });
}

function init() {
  const container = document.getElementById('weather');
  if (container) container.innerText = 'Fetching location...';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (container) container.innerText = 'Fetching weather...';
        getWeather(latitude, longitude);
      },
      () => {
        if (container) container.innerText = 'Location access denied';
      }
    );
  } else {
    if (container) container.innerText = 'Geolocation is not supported by your browser';
  }
}

document.addEventListener('DOMContentLoaded', init);
