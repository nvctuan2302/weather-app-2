import { data } from "browserslist";

const nameCity = document.querySelector(".js-weather-current__name");
const descriptionWeather = document.querySelector(".js-weather-current__desc");
const tempCurrentWeather = document.querySelector(".js-weather-current__temp");
const feelsCurrentWeather = document.querySelector(".js-weather-current__feels");
const iconCurrentWeather = document.querySelector(".js-weather-current__icon");
const refreshCurrentWeather = document.querySelector(".js-weather-current__redo");
const getSearchInput = document.querySelector(".js-search__input");
const getSearchBtn = document.querySelector(".js-search__btn");
const humidityCurrentWeather = document.querySelector(".js-expand-list__humidity");
const visibilityCurrentWeather = document.querySelector(".js-expand-list__visibility");
const pressureCurrentWeather = document.querySelector(".js-expand-list__pressure");
const windCurrentWeather = document.querySelector(".js-expand-list__wind");
const uviCurrentWeather = document.querySelector(".js-expand-list__uvi");
const dewpointCurrentWeather = document.querySelector(".js-expand-list__dewpoint");
const api = {
  key: "2f887e5d1ea0b70b225c193184f78cd2",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
let timeCurrentWeather = document.querySelector(".js-weather-current__time");


const displayWeatherCurrent = data => {
  const { description, icon } = data.current.weather[0];
  const { temp,
    feels_like,
    humidity,
    pressure,
    wind_speed,
    visibility,
    uvi,
    dew_point } = data.current;

  descriptionWeather.innerText = description;
  tempCurrentWeather.innerText = Math.round(temp);
  uviCurrentWeather.innerText = uvi;
  feelsCurrentWeather.innerText = Math.round(feels_like);
  humidityCurrentWeather.innerText = humidity;
  dewpointCurrentWeather.innerText = dew_point;
  pressureCurrentWeather.innerText = pressure;
  windCurrentWeather.innerText = wind_speed;
  visibilityCurrentWeather.innerText = (visibility / 1000);
  iconCurrentWeather.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`;
};

const status = (response) => {
  if ((response.status >= 200 && response.status < 300) || response.status === 404) {
    return response.json();
  }
};

const error = error => {
  alert(`Không tìm thấy thành phố !!!!`, error);
}


const getData = url => {
  fetch(`${url}`)
    .then(status)
    .then(data => {
      nameCity.innerText = `${data.name},${data.sys.country}`;

      fetch(`${api.baseUrl}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,alerts&units=metric&appid=${api.key}&lang=vi`)
        .then(status)
        .then(displayWeatherCurrent)
    }).catch(error)


}

setInterval((_) => {
  let date = new Date();

  let day = `${date.getDate()}`;
  let month = `${date.getMonth()}` + 1;
  let hours = `${date.getHours()}`;
  let minutes = `0${date.getMinutes()}`;
  let seconds = `0${date.getSeconds()}`;
  timeCurrentWeather.innerText = `T2 ${day}/${month} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}, 1000);


const getCurrentPosition = (position) => {
  const { latitude, longitude } = position.coords;

  getData(`${api.baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}&lang=vi`);
};

const getResults = (query) => {
  getData(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}&lang=vi`);
};
export const weather = _ => {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);

  getSearchInput.addEventListener("keypress", e => {
    if (e.keyCode === 13 && e.target.value !== "") {
      getResults(e.target.value);
      e.target.value = "";
    };
  });

  getSearchBtn.addEventListener("click", e => {
    if (getSearchInput.value !== "") {
      getResults(getSearchInput.value)
      getSearchInput.value = "";
    };
  });

  refreshCurrentWeather.addEventListener("click", _ => {
    getResults(nameCity.innerText);
  });
};
