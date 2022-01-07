
const nameCity = document.querySelector(".js-weather-current__name");
const descriptionWeather = document.querySelector(".js-weather-current__desc");
const tempCurrentWeather = document.querySelector(".js-weather-current__temp");
const feelsCurrentWeather = document.querySelector(".js-weather-current__feels");
const iconCurrentWeather = document.querySelector(".js-weather-current__icon");
const refreshCurrentWeather = document.querySelector(".js-weather-current__redo");
const getSearchInput = document.querySelector(".js-search__input");
let timeCurrentWeather = document.querySelector(".js-weather-current__time");



const api = {
  key: "2f887e5d1ea0b70b225c193184f78cd2",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const status = (response) => {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 404
  )
    return response.json();
};

const displayWeatherCurrent = (data) => {
  const { main, description, icon } = data.weather[0];
  const { temp, feels_like } = data.main;

  nameCity.innerText = `${data.name}, ${data.sys.country}`;
  descriptionWeather.innerText = description;
  tempCurrentWeather.innerText = temp;
  feelsCurrentWeather.innerText = feels_like;
  iconCurrentWeather.style.backgroundImage = `url('http://openweathermap.org/img/wn/${icon}@4x.png')`;
};


setInterval((_) => {
  let date = new Date();

  let day = `${date.getDate()}`;
  let month = `${date.getMonth()}` + 1;
  let hours = `${date.getHours()}`;
  let minutes = `0${date.getMinutes()}`;
  let seconds = `0${date.getSeconds()}`;
  timeCurrentWeather.innerText = `T6 ${day}/${month} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}, 1000);

const fetchApi = (url) => {
  fetch(`${url}`)
    .then(status)
    .then(displayWeatherCurrent)
    .catch((error) => {
      alert("Khồng tìm thấy thành phố !!!!");
    });
};

const getCurrentPosition = (position) => {
  const { latitude, longitude } = position.coords;

  fetchApi(`${api.baseUrl}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}&lang=vi`);
};

const getResults = (query) => {
  fetchApi(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}&lang=vi`);
};

export const weather = _ => {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);

  getSearchInput.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      getResults(e.target.value);
      e.target.value = "";
    }
  });

  refreshCurrentWeather.addEventListener("click", _ => {
    getResults(nameCity.innerText);
  })
};
