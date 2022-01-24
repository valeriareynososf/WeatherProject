  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours >= 12) {
    hours = hours - 12;
  } else if (hours === 0) {
    hours = 12;
  }

  let minutes = now.getMinutes();
  if (minutes < 10 && hours < 12) {
    minutes = `0${minutes}AM`;
 } else if (minutes > 11 && hours >= 12) {
    minutes = `0${minutes}PM`;
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



function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

function temperaturefahrenheitLink(response) {
  let temperature = Math.round(response.data.main.temp);
  fahrenheitTempLink = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#weatherIcon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
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
  let city = document.querySelector("#searchBar").value;
  search(city);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "3121bb0c5574e7510f338b1183367079";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(temperaturefahrenheitLink);
}


function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function displayForecast (response) {
    let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
if (index < 6) {
  forecastHTML = forecastHTML + `
  <div class="col-2">
  ${formatDay(forecastDay.dt)}
    <br />
    <img
    src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="80px"
  />
    <br />
    <span class="forecastMax"> ${Math.round(forecastDay.temp.max)}° </span>
<span class="forecastMin"> ${Math.round(forecastDay.temp.min)}° </span>
  </div>
  `;
}
  });
  forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "3121bb0c5574e7510f338b1183367079";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayForecast);
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
