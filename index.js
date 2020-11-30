function formatTime(timestamp) {
  return `${formatHours(timestamp)}`;
}

let curTimeElement = document.querySelector("#cur-time");
let currentTime = new Date();

curTimeElement.innerHTML = formatTime(currentTime);

let curDateElement = document.querySelector("#cur-date");
let currentDate = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentDate.getMonth()];
let date = currentDate.getDate();
curDateElement.innerHTML = `Today | ${month} ${date}`;

// current temp info
function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#cur-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#highs").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lows").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#cur-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#cur-weather").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  fahrenheitTemperature = response.data.main.temp;
}
//format hours for current and hourly times
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
// hourly forecast call
function displayHourlyForecast(response) {
  let hourlyElement = document.querySelector("#hourly");
  hourlyElement.innerHTML = "";
  let hourly = null;

  for (let index = 0; index < 6; index++) {
    hourly = response.data.list[index];
    hourlyElement.innerHTML += `
    <div class="col-2">
    <span id="time"> ${formatHours(hourly.dt * 1000)}
        <br />
        <img src="http://openweathermap.org/img/wn/${
          hourly.weather[0].icon
        }@2x.png"/>
        <br />
        <small><span class="forecast-max">${Math.round(
          hourly.main.temp_max
        )}</span>º / <span class="forecast-min">${Math.round(
      hourly.main.temp_min
    )}</span>º<small>  
      </span>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "186f6315f68cbe651e86a1d50fb37cb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);

  // hourly forecast API
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayHourlyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  let curTempElement = document.querySelector("#cur-temp");
  curTempElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");
  let forecastMax = document.querySelectorAll(".forecast-max");
  let forecastMin = document.querySelectorAll(".forecast-min");

  forecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  forecastMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  celsiuslink.removeEventListener("click", displayCelsiusTemperature);
  fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let curTempElement = document.querySelector("#cur-temp");
  curTempElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitlink.classList.add("active");
  celsiuslink.classList.remove("active");

  let forecastMax = document.querySelectorAll(".forecast-max");
  let forecastMin = document.querySelectorAll(".forecast-min");

  forecastMax.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9)/ 5 + 32)
  };

  forecastMin.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32)
  };
    

  celsiuslink.addEventListener("click", displayCelsiusTemperature);
  fahrenheitlink.removeEventListener("click", displayFahrenheitTemperature);
}

let fahrenheitTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

search("New York");
