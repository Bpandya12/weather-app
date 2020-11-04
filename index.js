let curTimeElement = document.querySelector("#cur-time");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

curTimeElement.innerHTML = `${hours}:${minutes}`;

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
    `http://openweathermap.org/img/wn/01n@2x.png`
  );
}

function search(city) {
  let apiKey = "186f6315f68cbe651e86a1d50fb37cb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

search("New York");
