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

// display daily forecast
const arrDescDailyForecast = [...document.querySelectorAll(".js-daily-list__desc")];
const arrIconDailyForecast = [...document.querySelectorAll(".js-daily-list__icon")];
const arrTempDailyForecast = [...document.querySelectorAll(".js-daily-list__temp")];
const arrTimeDailyForecast = [...document.querySelectorAll(".js-daily-list__time")];


const api = {
  key: "2f887e5d1ea0b70b225c193184f78cd2",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

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

  return data;
};


function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let arrDay = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  let day = a.getDay();
  let month = a.getMonth() + 1;
  let date = a.getDate();
  let time = arrDay[day]+ ' ' + date + ' / ' + month ;

  return time
}

const displayDailyForecast = data => {
  for (let index = 0; index < data.daily.length; index++) {
    const { description, icon } = data.daily[index].weather[0];
    const { min,
            max } = data.daily[index].temp;

    arrDescDailyForecast[index].innerText = description; // get description
    arrIconDailyForecast[index].style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`; // get icon
    arrTempDailyForecast[index].innerText = `${Math.round(min)} / ${Math.round(max)}`;
    arrTimeDailyForecast[index].innerText = (timeConverter(data.daily[index].dt))
  }


}

const status = response => {
  // if ((response.status >= 200 && response.status < 300) || response.status === 404) {
  return response.json();
  // }
};

const error = error => {
  alert(`Không tìm thấy thành phố !!!!`);
}

const getData = url => {
  fetch(`${url}`)
    .then(status)
    .then(data => {
      nameCity.innerText = `${data.name},  ${data.sys.country}`;

      fetch(`${api.baseUrl}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,alerts&units=metric&appid=${api.key}&lang=vi`)
        .then(status)
        .then(displayWeatherCurrent)
        .then(displayDailyForecast)
    }).catch(error)
}

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
