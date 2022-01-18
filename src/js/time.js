let timeNow = document.querySelector(".js-weather-current__time");

// const timeConverter = (UNIX_timestamp) => {
//   var a = new Date(UNIX_timestamp * 1000);
//   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   let arrDay = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
//   var year = a.getFullYear();
//   var month = months[a.getMonth()];
//   var date = a.getDate();
//   var time = date + ' ' + month + ' ' + year ;
//   return time;
// }

const realTime = _ => {
  let d = new Date();
  let arrDay = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  let day = d.getDay();
  let date = d.getDate();
  let month = `${d.getMonth()}` + 1;
  let hours = `${d.getHours()}`;
  let minutes = `0${d.getMinutes()}`;
  let seconds = `0${d.getSeconds()}`;
  timeNow.innerText = `${arrDay[day]} ${date}/${month} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
}

export const time = _ => {
  setInterval(realTime, 1000);
}
