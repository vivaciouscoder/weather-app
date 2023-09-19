let apiKey = "3237e1f70a20942621db32502334f8f7";

let unit = "metric";

function showCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;

  function showCurrentTemp(response) {
    currentTemp = Math.round(response.data.main.temp);
    let temperature = document.querySelector(".baseTemp");
    temperature.innerHTML = `${currentTemp}°C`;
  }

  axios.get(apiUrl).then(showCurrentTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", showCurrentCity);

let now = new Date();

function showFormatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDate = document.querySelector("#cityInfo");
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}
showFormatDate();

function showMyLocation(response) {
  let h1 = document.querySelector("h1");
  currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector(".baseTemp");

  temperature.innerHTML = `${currentTemp}°C`;
  h1.innerHTML = response.data.name;
}
function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  console.log(position);

  axios.get(apiUrl2).then(showMyLocation);
}

let button = document.querySelector("#current");
button.addEventListener("click", showMyLocation);

navigator.geolocation.getCurrentPosition(showCurrentLocation);
