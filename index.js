let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function temperatureCelsiusLink(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temperature");
  let temperature = document.querySelector("#temperature");
  let temperatureConvert = temperature.innerHTML;
  celsiusTemperature.innerHTML = Math.round(
    ((temperatureConvert - 32) * 5) / 9
  );
}
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", temperatureCelsiusLink);

function temperaturefahrenheitLink(response) {
  let temperature = Math.round(response.data.main.temp);
  let fahrenheitTemperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  document.querySelector("#city").innerHTML = response.data.name;
  fahrenheitTemperature.innerHTML = temperature;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = "3121bb0c5574e7510f338b1183367079";
  let unit = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(url).then(temperaturefahrenheitLink);
}

function showCity(event) {
  event.preventDefault();
  //let h1 = document.querySelector("#city");
  //h1.innerHTML = input.value;
  //let city = input.value;
  let city = document.querySelector("#searchBar").value;
  //let apiKey = "3121bb0c5574e7510f338b1183367079";
  //let unit = "imperial";
  //let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  search(city);
  //axios.get(url).then(temperaturefahrenheitLink);
}

//function fLink(event) {
//event.preventDefault();
//getTemperature(temperaturefahrenheitLink);
//}

//let fahrenheitLink = document.querySelector("#fahrenheitLink");
//fahrenheitLink.addEventListener("click", fLink);

/*function showWeather(response) {
  //console.log(response.data.wind.speed);
  let searchCurrentCity = response.data.name;
  let currentCity = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let getTemperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  getTemperature.innerHTML = temperature;
  currentCity.innerHTML = searchCurrentCity;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].main;
} */

function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "3121bb0c5574e7510f338b1183367079";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(temperaturefahrenheitLink);
}
navigator.geolocation.getCurrentPosition(currentLocation);

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", showCity);

let currentButton = document.querySelector("#currentBtn");
currentButton.addEventListener("click", getPosition);

search("San Diego");
