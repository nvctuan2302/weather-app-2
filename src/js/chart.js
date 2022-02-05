import Chart from "chart.js";
// import { dropRight } from "lodash";

const timeConverter = (UNIX_timestamp, timezone) => {
  let times = new Date(UNIX_timestamp * 1000);
  let timeConverter = new Date(times.toLocaleString('en-US', { timeZone: timezone }));
  let hours = timeConverter.getHours();

  return `${hours}`;
}

const timeConverter2 = (UNIX_timestamp, timezone) => {
  let times = new Date(UNIX_timestamp * 1000);
  let timeConverter2 = new Date(times.toLocaleString('en-US', { timeZone: timezone }));
  let date = timeConverter2.getDate();
  let month = timeConverter2.getMonth() + 1;

  return `${date} / ${month}`;
}

export const chart = data => {
  const ctx = document.getElementById("myChart");
  const myPositionYaxis = document.getElementById("myChart1");

  const arrTemp = data.hourly.map(item => Math.round(item.temp))
  const arrIndex = data.hourly.map((item, index) => item)

  let min = Math.min(...arrTemp)
  let max = Math.max(...arrTemp)

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: arrIndex,
      datasets: [{
        data: arrTemp,
        borderColor: 'rgb(235,110,75)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 2,
        pointBorderColor: 'rgba(0, 0, 0, 0)',
      }, {
        data: arrIndex,
        xAxisID: 'wind',
      }, {
      }, {
        data: arrIndex,
        xAxisID: 'time',
      }, {
        data: arrIndex,
        xAxisID: 'description',
      }],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      events: [], // tắt các sự kiện khi tác động vào biểu đồ

      legend: {
        display: false,
      },

      tooltips: {
        enabled: false
      },

      scales: {

        yAxes: [{
          gridLines: {
            display: false,
          },

          ticks: {
            stepSize: max - min < 5 ? 1 : (max - min < 8 ? 2 : 5),
            fontColor: 'rgba(0,0,0,0)',
            padding: -10

          }
        }],

        xAxes: [{
          gridLines: {
            display: false,
          },

          ticks: {
            fontColor: 'rgb(120,203,191)',
            fontSize: 12,
            callback: value => `${(value.pop * 100).toFixed()}%`,
            maxRotation: 0,

          }
        }, {
          id: 'description',
          type: 'category',
          position: 'bottom',

          gridLines: {
            display: true,
            drawOnChartArea: false
          },

          ticks: {
            fontSize: 10,
            callback: value => {
              let a = value.weather[0].description


              let cc = `${a.split(' ')[0]}\n${a.split(' ')[1]}  `

              return cc
            },
            maxRotation: 0,
          }
        }, {
          id: 'wind',
          type: 'category',
          position: 'bottom',

          gridLines: {
            display: false,
          },

          ticks: {
            fontSize: 10,
            callback: value => `${(value.wind_speed).toFixed(1)}m/s`,
            maxRotation: 0,
          }
        }, {
          id: 'time',
          type: 'category',
          position: 'top',

          gridLines: {
            display: false,
          },

          ticks: {
            fontSize: 12,
            callback: (value, index, arr) => {
              value.dt = `${(timeConverter(value.dt, data.timezone))}h` === '0h' ?
                `${(timeConverter2(value.dt, data.timezone))}` :
                `${(timeConverter(value.dt, data.timezone))}h`

              arr[0].dt = 'Hiện tại';

              return value.dt
            },
            maxRotation: 0,
            padding: 20
          }
        }],
      },
    },
  });

  // Fixed positioning on y-axis
  const positionYaxis = new Chart(myPositionYaxis, {
    type: "line",
    data: {
      labels: arrTemp,
      datasets: [{
        data: arrTemp,
      }],
    },

    options: {
      maintainAspectRatio: false,

      layout: {
        padding: {
          top: 50,
          bottom: 58
        }
      },

      legend: {
        display: false,
      },

      scales: {
        yAxes: [{
          ticks: {
            stepSize: max - min < 5 ? 1 : (max - min < 8 ? 2 : 5),
            callback: value => `${value}°C`,
            fontColor: 'rgb(235,110,75)',
            padding: 20
          }
        }],
      },
    },
  });
};
