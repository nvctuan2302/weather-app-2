let timeNow = document.querySelector(".js-weather-current__time");

export const time = _ => {
  setInterval(_ => {
    let date = new Date();

    let day = `${date.getDate()}`;
    let month = `${date.getMonth()}` + 1;
    let hours = `${date.getHours()}`;
    let minutes = `0${date.getMinutes()}`;
    let seconds = `0${date.getSeconds()}`;
    timeNow.innerText = `T2 ${day}/${month} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  }, 1000);
}
