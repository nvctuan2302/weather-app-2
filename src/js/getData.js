import { displayWeatherChart } from './chart';
import { displayWeatherMap } from './map'
import { displayWeatherCurrent } from './weather/displayWeatherCurrent'
import { displayDailyForecast } from './weather/displayDailyForecast'

const nameCity = document.querySelector(".js-weather-current__name");
const refreshCurrentWeather = document.querySelector(".js-weather-current__redo");
const getSearchInput = document.querySelector(".js-search__input");
const getSearchBtn = document.querySelector(".js-search__btn");

const api = {
  key: "2f887e5d1ea0b70b225c193184f78cd2",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const status = response => {
  if ((response.status >= 200 && response.status < 300) || response.status === 404) {
    return response.json();
  }
};

const error = error => {
  alert(`Không tìm thấy thành phố !!!!`);
}

const getUrl = url => {
  fetch(`${url}`)
    .then(status)
    .then(data => {
      nameCity.innerText = `${data.name},  ${data.sys.country}`;

      fetch(`${api.baseUrl}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,alerts&units=metric&appid=${api.key}&lang=vi`)
        .then(status)
        .then(displayWeatherCurrent)
        .then(displayDailyForecast)
        .then(displayWeatherChart)
        .then(displayWeatherMap)
    }).catch(error)
}

const getCurrentPosition = (position) => {
  const { latitude, longitude } = position.coords;

  getUrl(`${api.baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}&lang=vi`);
};

const getResults = (query) => {
  getUrl(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}&lang=vi`);
};

export const displayContent = _ => {
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
