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
    response.data.main.temp
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
}
//format hours for current and hourly times
function formatHours(timestamp) {
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
// hourly forecast call
function displayHourlyForecast(response) {
  let hourlyElement = document.querySelector("#hourly");
  let hourlyElement.innerHTML = null;
  let hourly = null;

  for (let index = 0; index < 6; index++) {
    hourly = response.data.list[index];
    hourlyElement.innerHTML += `
    <div class="col-2 centered">
      <span id="time"> ${formatHours(hourly.dt * 1000)}
        <br />
        <img src="http://openweathermap.org/img/wn/${
          hourly.weather[0].icon
        }@2x.png}"/>
        <br />
        <small><strong>${Math.round(
          hourly.main.temp_max
        )}º<strong> / ${Math.round(hourly.main.temp_min)}º</small>  
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("New York");
