import { Chart } from "chart.js";
import { timeConverter } from "./time"

export const displayWeatherChart = data => {
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
        data: arrIndex,
        xAxisID: 'time',
      }, {
        data: arrIndex,
        xAxisID: 'description01',
      }, {
        data: arrIndex,
        xAxisID: 'description02',
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
          id: 'description01',
          type: 'category',
          position: 'bottom',

          gridLines: {
            display: true,
            drawOnChartArea: false
          },

          ticks: {
            fontSize: 10,
            callback: value => {
              let getvalue = value.weather[0].description.split(' ')
              if (getvalue.length === 3) {
                return `${getvalue[0]}`
              }
              else if (getvalue.length === 4) {
                return `${getvalue[0]} ${getvalue[1]}`
              }
              else {
                return `${getvalue[0]}`
              }
            },
            maxRotation: 0,
          }
        }, {
          id: 'description02',
          type: 'category',
          position: 'bottom',

          gridLines: {
            display: false,
          },

          ticks: {
            fontSize: 10,
            callback: value => {
              let getvalue = value.weather[0].description.split(' ')
              console.log(getvalue.length);

              if (getvalue.length === 3) {
                return `${getvalue[1]} ${getvalue[2]}`
              }
              else if (getvalue.length === 4) {
                return `${getvalue[2]} ${getvalue[3]}`
              }
              else {
                return `${getvalue[1]}`
              }
            },
            maxRotation: 0,
            padding: -16
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
            padding: -8
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
              value.dt = `${(timeConverter(value.dt, data.timezone, 'hours'))}h` === '0h' ?
                `${(timeConverter(value.dt, data.timezone, 'dateMonth'))}` :
                `${(timeConverter(value.dt, data.timezone, 'hours'))}h`

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

  return data
};
