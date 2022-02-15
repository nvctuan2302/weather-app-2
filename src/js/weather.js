import * as util from './util'
import { displayWeatherChart } from './chart';
import { displayWeatherMap } from './map'
import { timeConverter } from './time';

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

const arrDailyForecast = [...document.querySelectorAll(".wrap-list .js-daily-list__item")];

const dewpointDailyDetail = document.querySelector(".daily-detail__body .js-expand-list__dewpoint");
const uviDailyDetail = document.querySelector(".daily-detail__body .js-expand-list__uvi");
const windDailyDetail = document.querySelector(".daily-detail__body .js-expand-list__wind");
const pressureDailyDetail = document.querySelector(".daily-detail__body .js-expand-list__pressure");
const humidityDailyDetail = document.querySelector(".daily-detail__body .js-expand-list__humidity");

const arrTimeDetailMain = [...document.querySelectorAll(".js-daily-detail__header .js-daily-list__item")];

const descDetailMain = document.querySelector(".js-detail-main__desc");
const minDetailMain = document.querySelector(".js-detail-main__min");
const maxDetailMain = document.querySelector(".js-detail-main__max");
const iconDetailMain = document.querySelector(".js-detail-main__icon");
const mornDetailMain = document.querySelector(".js-detail-temp__morn");
const mornfeelDetailMain = document.querySelector(".js-detail-temp__morn-feel");
const dayDetailMain = document.querySelector(".js-detail-temp__day");
const dayfeelDetailMain = document.querySelector(".js-detail-temp__day-feel");
const eveDetailMain = document.querySelector(".js-detail-temp__eve");
const evefeelDetailMain = document.querySelector(".js-detail-temp__eve-feel");
const nightDetailMain = document.querySelector(".js-detail-temp__night");
const nightfeelDetailMain = document.querySelector(".js-detail-temp__night-feel");
const sunsetDetailMain = document.querySelector(".js-detail-suntime__sunset");
const sunriseDetailMain = document.querySelector(".js-detail-suntime__sunrise");


const api = {
  key: "2f887e5d1ea0b70b225c193184f78cd2",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const displayWeatherCurrent = data => {
  const { description, icon } = data.current.weather[0];
  const {
    temp,
    feels_like,
    humidity,
    pressure,
    wind_speed,
    visibility,
    uvi,
    dew_point
  } = data.current;

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

const displayDailyForecast = data => {

  const arrDaily = data.daily.map((data, index) => {
    arrDescDailyForecast[index].innerText = data.weather[0].description;
    arrIconDailyForecast[index].style.backgroundImage =
      `url('http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png')`;
    arrTempDailyForecast[index].innerText = `${Math.round(data.temp.min)} / ${Math.round(data.temp.max)}`;
    arrTimeDailyForecast[index].innerText = (timeConverter(data.dt, data.timezone, ''));
    arrTimeDetailMain[index].innerText = (timeConverter(data.dt, data.timezone, ''));

    return data;
  });

  const displayDailyDetai = index => {
    const { description, icon } = arrDaily[index].weather[0];

    const {
      humidity,
      pressure,
      wind_speed,
      uvi,
      dew_point,
      sunrise,
      sunset
    } = arrDaily[index];

    const {
      min,
      max,
      day,
      eve,
      morn,
      night
    } = arrDaily[index].temp;

    const tempFeels = arrDaily[index].feels_like;

    descDetailMain.innerText = description;
    iconDetailMain.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`;
    windDailyDetail.innerText = wind_speed;
    dewpointDailyDetail.innerText = Math.round(dew_point);
    uviDailyDetail.innerText = uvi;
    pressureDailyDetail.innerText = pressure;
    humidityDailyDetail.innerText = humidity;
    minDetailMain.innerText = Math.round(min);
    maxDetailMain.innerText = Math.round(max);

    mornfeelDetailMain.innerText = `${Math.round(tempFeels.morn)}°C`;
    mornDetailMain.innerText = `${Math.round(morn)}°C`;

    dayfeelDetailMain.innerText = `${Math.round(tempFeels.day)}°C`;
    dayDetailMain.innerText = `${Math.round(day)}°C`;

    evefeelDetailMain.innerText = `${Math.round(tempFeels.eve)}°C`;
    eveDetailMain.innerText = `${Math.round(eve)}°C`;

    nightfeelDetailMain.innerText = `${Math.round(tempFeels.day)}°C`;
    nightDetailMain.innerText = `${Math.round(night)}°C`;

    sunriseDetailMain.innerText = timeConverter(sunrise, data.timezone, 'hoursMin')
    sunsetDetailMain.innerText = timeConverter(sunset, data.timezone, 'hoursMin')
  }

  arrDailyForecast.map((element, index) => {
    element.addEventListener('click', _ => {
      displayDailyDetai(index)
      arrTimeDetailMain[index].classList.add('is-active')
      util.getSiblings(arrTimeDetailMain[index]).map(getSIb => getSIb.classList.remove('is-active'))
      document.querySelector(".js-daily-detail").classList.add('is-active')
    })
  });

  arrTimeDetailMain.map((element, index) => {
    element.addEventListener('click', _ => {
      displayDailyDetai(index)
      element.classList.add('is-active')
      util.getSiblings(element).map(getSIb => getSIb.classList.remove('is-active'))
    })
  });

  document.querySelector('.js-close').addEventListener('click', _ => {
    document.querySelector(".js-daily-detail").classList.remove('is-active')
  })

  return data;
}

const status = response => {
  if ((response.status >= 200 && response.status < 300) || response.status === 404) {
    return response.json();
  }
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
        .then(displayWeatherChart)
        .then(displayWeatherMap)
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
