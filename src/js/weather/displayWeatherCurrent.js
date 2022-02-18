const descriptionWeather = document.querySelector(".js-weather-current__desc");
const tempCurrentWeather = document.querySelector(".js-weather-current__temp");
const feelsCurrentWeather = document.querySelector(".js-weather-current__feels");
const iconCurrentWeather = document.querySelector(".js-weather-current__icon");
const humidityCurrentWeather = document.querySelector(".js-expand-list__humidity");
const visibilityCurrentWeather = document.querySelector(".js-expand-list__visibility");
const pressureCurrentWeather = document.querySelector(".js-expand-list__pressure");
const windCurrentWeather = document.querySelector(".js-expand-list__wind");
const uviCurrentWeather = document.querySelector(".js-expand-list__uvi");
const dewpointCurrentWeather = document.querySelector(".js-expand-list__dewpoint");

export const displayWeatherCurrent = data => {
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
