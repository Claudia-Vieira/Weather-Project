let currentDate = document.querySelector("#currentDate");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

let selectHour = document.getElementById("select_hour");
selectHour.innerHTML = `<label for="rangeHour">Hour</label>
              <input
                type="range"
                class="custom-range"
                value="${hour}"
                min="0"
                max="23"
                step="3"
                id="rangeHour"
                oninput="display.value=value"
                onchange="display.value=value"
              />
              <input
                type="number"
                id="display"
                value="${hour}"
                oninput="rangeHour.value=value"
                onchange="rangeHour.value=value"
              />`;

function search(event) {
  event.preventDefault();
  currentCity.innerHTML = searchCity.value;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    currentTemperature.innerHTML = temperature;
    let wind = Math.round(response.data.wind.speed * 3.6);
    currentWind.innerHTML = `${wind} km/h`;
    currentWeather.innerHTML = response.data.weather[0].main;
    let icon = response.data.weather[0].icon;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].main);
    function getCelsius(event) {
      event.preventDefault();
      celsiusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
      currentTemperature.innerHTML = temperature;
    }

    function getFahrenheit(event) {
      event.preventDefault();
      fahrenheitLink.classList.add("active");
      celsiusLink.classList.remove("active");
      currentTemperature.innerHTML = Math.round(temperature * 1.8 + 32);
    }
    let celsiusLink = document.getElementById("celsius");
    let fahrenheitLink = document.getElementById("fahrenheit");
    celsiusLink.addEventListener("click", getCelsius);
    fahrenheitLink.addEventListener("click", getFahrenheit);
  }

  function displayForecast(response) {
    let forecast = document.getElementById("forecast");
    let forecastData = null;
    forecast.innerHTML = null;

    for (let index = 0; index >= 0; index = index + 8) {
      forecastData = response.data.list[index];
      console.log(response.data);
      forecast.innerHTML += `
     <div class="row">
            <div class="col-1">
              <p id="day_one"></p>
            </div>
            <div class="col-1">
              <p>
                <i class="far fa-dot-circle" id="dot1"></i>
              </p>
            </div>
            <div class="col-3">
              <p id="temp_one">
                ${Math.round(forecastData.main.temp_max)}ºC
              </p>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col-6 weatherIconDays">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastData.weather[0].icon
                  }@2x.png" alt="" id="icon_one" />
                </div>
                <div class="col-6 weatherDays">
                  <p id="weather_one">
                  ${forecastData.weather[0].main}</p>
                </div>
              </div>
            </div>
            <div class="col-2">
              <div class="row">
                <div class="col-6 weatherIconDays">
                  <p id="icon_one"><i class="fas fa-wind currentWind"></i></p>
                </div>
                <div class="col-6 weatherDays">
                  <p id="wind_one">
                  ${Math.round(forecastData.wind.speed * 3.6)}km/h</p>
                </div>
              </div>
            </div>
          </div>`;
    }
  }

  let apiKey = `011674ac65e3e0ef6d73be0d4fdbae64`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity.value},us&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function getCurrentData() {
  function getLocal(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = `011674ac65e3e0ef6d73be0d4fdbae64`;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(getLocalTemperature);
  }
  navigator.geolocation.getCurrentPosition(getLocal);
  function getLocalTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    currentTemperature.innerHTML = temperature;
    currentCity.innerHTML = response.data.name;
    let wind = Math.round(response.data.wind.speed * 3.6);
    currentWind.innerHTML = `${wind} km/h`;
    currentWeather.innerHTML = response.data.weather[0].main;
    let icon = response.data.weather[0].icon;
    weatherIcon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    weatherIcon.setAttribute("alt", response.data.weather[0].main);

    function getCelsius(event) {
      event.preventDefault();
      celsiusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
      currentTemperature.innerHTML = temperature;
    }

    function getFahrenheit(event) {
      event.preventDefault();
      fahrenheitLink.classList.add("active");
      celsiusLink.classList.remove("active");
      currentTemperature.innerHTML = Math.round(temperature * 1.8 + 32);
    }

    let celsiusLink = document.getElementById("celsius");
    let fahrenheitLink = document.getElementById("fahrenheit");
    celsiusLink.addEventListener("click", getCelsius);
    fahrenheitLink.addEventListener("click", getFahrenheit);
  }
}
let searchCity = document.getElementById("enterCity");
let searchForm = document.getElementById("searchForm");
let currentCity = document.getElementById("currentCity");
let searchButton = document.getElementById("searchButton");
let currentLocation = document.getElementById("currentLocation");
let currentWind = document.getElementById("wind");
let currentWeather = document.getElementById("currentWeather");
let weatherIcon = document.getElementById("weatherIcon");

currentLocation.addEventListener("click", getCurrentData);
searchForm.addEventListener("submit", search);

let currentTemperature = document.getElementById("currentTemperature");
