function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} `;
}
function setDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat"
  ];
  return days[day];
}
function showForecast(response){
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML =  `<div class="row">`;
  // forecastElement.innerHTML =
  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  forecast.forEach(function(forecastDay, index){
    if(index < 6){
    forecastHTML = forecastHTML + 
    `<div class="col-2">
      <div class="forecast-date">${setDay(forecastDay.dt)}</div>
      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="36">
      <div class="forecast-temps">
        <span class="temps-max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="temps-min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>`;
    }
  });
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "1ad7464c696ed5ee623c4381a83f9834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}

function showCondition(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${temperature}`;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed:${response.data.wind.speed}km/hr`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  getForecast(response.data.coord)
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-result").value;
  let apiKey = "1ad7464c696ed5ee623c4381a83f9834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);

  let cityElement = document.querySelector("#city");
  let searchResult = document.querySelector("#search-result");
  axios.get(`${apiUrl}`).then(showCondition);
}
function displayFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}
function displayCelsius(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round( celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);
// showForecast();