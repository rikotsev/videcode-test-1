"use strict";
function getWeather(lat, lon) {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=".concat(lat, "&longitude=").concat(lon, "&current_weather=true");
    fetch(url)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
        var container = document.getElementById('weather');
        if (container && data.current_weather) {
            container.innerHTML = "\n          <h2>Current Weather</h2>\n          <p>Temperature: ".concat(data.current_weather.temperature, "&deg;C</p>\n          <p>Wind Speed: ").concat(data.current_weather.windspeed, " km/h</p>\n          <p>Time: ").concat(data.current_weather.time, "</p>\n        ");
        }
    })
        .catch(function (err) {
        var container = document.getElementById('weather');
        if (container)
            container.innerText = 'Error fetching weather data';
        console.error(err);
    });
}
function init() {
    var container = document.getElementById('weather');
    if (container)
        container.innerText = 'Fetching location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            var _a = pos.coords, latitude = _a.latitude, longitude = _a.longitude;
            if (container)
                container.innerText = 'Fetching weather...';
            getWeather(latitude, longitude);
        }, function () {
            if (container)
                container.innerText = 'Location access denied';
        });
    }
    else {
        if (container)
            container.innerText = 'Geolocation is not supported by your browser';
    }
}
document.addEventListener('DOMContentLoaded', init);
