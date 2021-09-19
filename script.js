let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${month} ${date} ${hours}:${minutes} ${year}`;

function showCondition(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${temperature} °C`;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity:${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind Speed:${response.data.wind.speed}km/hr`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-result").value;
  let apiKey = "1ad7464c696ed5ee623c4381a83f9834";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  let cityElement = document.querySelector("#city");
  let searchResult = document.querySelector("#search-result");
  axios.get(`${apiUrl}`).then(showCondition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// function showTemperature(response){
//   let temperature = Math.round(response.data.main.temp);
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = `${temperature}°C`;
//   let description = document.querySelector("#temperature-description");
//   description.innerHTML = response.data.weather[0].description;
//   console.log(apiUrl);

// }
// let h1 = document.querySelector("#city");
// h1.innerHTML = city;
// axios.get(`${apiUrl}`).then(showTemperature);

// function showPosition(position) {
//   let h1 = document.querySelector("#location");
//   h1.innerHTML = `Your Latitude is ${position.coords.latitude} and longitude is ${position.coords.longitude}`;
// }

// function getCurrentPosition() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }
// let button = document.querySelector("#location");
// button.addEventListener("click", getCurrentPosition);
