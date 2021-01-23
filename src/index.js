function formatDate() {
  let currentDateTime = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentDateTime.getDay()];
  let hours = currentDateTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let changeDateTime = document.querySelector("h2");

changeDateTime.innerHTML = formatDate(changeDateTime);

function changeDisplayWeather(response) {
  let cityInput = document.querySelector("#city");
  let changeCity = response.data.name;
  cityInput.innerHTML = changeCity;
  let metricTemperature = Math.round(response.data.main.temp);
  let changeMetricTemp = document.querySelector("#temp-number");
  changeMetricTemp.innerHTML = metricTemperature;
  let wind = Math.round(response.data.wind.speed);
  let changeWindSpeed = document.querySelector("#wind-speed");
  changeWindSpeed.innerHTML = `${wind} m/s`;
  let humidity = Math.round(response.data.main.humidity);
  let changeHumidity = document.querySelector("#humidity");
  changeHumidity.innerHTML = `${humidity}%`;
  let description = response.data.weather[0].main;
  let changeDescription = document.querySelector("h3");
  changeDescription.innerHTML = description;
}
function findCity(cityName) {
  let apiKey = "f0229aa4803b78f326fa1951e4c8d9a5";
  let apiURLMetric = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiURLMetric).then(changeDisplayWeather);
}
function submitCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-entered").value;
  findCity(cityName);
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f0229aa4803b78f326fa1951e4c8d9a5";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(changeDisplayWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
//function switchCelsius(event) {
//event.preventDefault();
//let cityName = document.querySelector("#city-entered");
//getDataMetric(cityName.value);
//getWindSpeedMetric(cityName.value);
//}
//function switchFahrenheit(event) {
//event.preventDefault();
//let cityName = document.querySelector("#city-entered");
//getDataImp(cityName.value);
//getWindSpeedImp(cityName.value);
//}

let enterCity = document.querySelector("#city-input");
enterCity.addEventListener("submit", submitCity);

//let showCelsius = document.querySelector("#c-output");
//showCelsius.addEventListener("click", switchCelsius);
//let showFahrenheit = document.querySelector("#f-output");
//showFahrenheit.addEventListener("click", switchFahrenheit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("submit", currentLocation);

findCity("San Francisco");
