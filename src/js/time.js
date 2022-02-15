const arrDay = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const timeNow = document.querySelector(".js-weather-current__time")

const realTime = _ => {
  let time = new Date()
  let day = time.getDay()
  let date = time.getDate()
  let month = time.getMonth() + 1
  let hours = time.getHours()
  let minutes = `0${time.getMinutes()}`
  let seconds = `0${time.getSeconds()}`
  timeNow.innerText = `${arrDay[day]} ${date}/${month} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}

export const timeConverter = (UNIX_timestamp, timezone, option) => {
  let times = new Date(UNIX_timestamp * 1000)
  let timeConverter = new Date(times.toLocaleString('en-US', { timeZone: timezone }))
  let month = timeConverter.getMonth() + 1
  let date = timeConverter.getDate()
  let day = timeConverter.getDay();
  let hours = timeConverter.getHours()
  let min = timeConverter.getMinutes();

  switch (option) {
    case 'hours':
      return `${hours}`
      break
    case 'dateMonth':
      return `${date} / ${month}`;
      break
    case 'hoursMin':
      return `${hours}:${min}`;
      break
    default:
      return `${arrDay[day]} ${date} / ${month}`
  }
}

export const time = _ => {
  setInterval(realTime, 1000)
}
