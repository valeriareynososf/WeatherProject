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


function temperaturefahrenheitLink(response) {
  let temperature = Math.round(response.data.main.temp);
  let fahrenheitTemperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let weatherIcon = document.querySelector("#weatherIcon");

  fahrenheitTempLink = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  fahrenheitTemperature.innerHTML = temperature;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].main;
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function temperatureCelsiusLink(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureConvert = (fahrenheitTempLink - 32) * 5/9;
  celsiusTemperature.innerHTML = Math.round(temperatureConvert);
}

function temperatureFLink(event) {
event.preventDefault();
fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
let Temperature = document.querySelector("#temperature");
Temperature.innerHTML = Math.round(fahrenheitTempLink);
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

function displayForecast () {
let forecastElement = document.querySelector("#forecast");
let days = ["Thu", "Fri", "Sat", "Sun"];
let forecastHTML = `<div class="row">`;
days.forEach(function (day) {
forecastHTML = forecastHTML + `

  <div class="col-2">
    Friday
    <br />
    <img src="images/partly_cloudy.png"></a>
    <br />
    <span class="forecastMax"> 56° </span>
<span class="forecastMin"> 14° </span>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
let fahrenheitTempLink = null;

let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", showCity);

let currentButton = document.querySelector("#currentBtn");
currentButton.addEventListener("click", getPosition);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", temperatureCelsiusLink);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", temperatureFLink);

search("San Diego");
displayForecast ();
