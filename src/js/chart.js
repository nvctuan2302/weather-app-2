import { Chart } from "chart.js";
import { timeConverter } from "./time"

export const displayWeatherChart = data => {
  const chartWeather = document.getElementById("myChart");
  const myPositionYaxis = document.getElementById("positionYaxis");
  const blackColor = 'rgba(0, 0, 0, 0)'
  const arrTemp = data.hourly.map(item => Math.round(item.temp))
  const arrData = data.hourly.map(item => item)

  let stepTemp =
    Math.min(arrTemp) - Math.max(arrTemp) < 5
      ? 1 :
      Math.min(arrTemp) - Math.max(arrTemp) < 8
        ? 2 :
        5

  new Chart(chartWeather, {
    type: "line",
    data: {
      labels: arrData,
      datasets: [{
        data: arrTemp,
        borderColor: 'rgb(235,110,75)',
        borderWidth: 2,
        backgroundColor: blackColor,
        pointBorderColor: blackColor,
      }, {
        xAxisID: 'wind',
      }, {
        xAxisID: 'time',
      }, {
        xAxisID: 'descriptionTop',
      }, {
        xAxisID: 'descriptionBottom',
      }],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      events: [], // turn off events

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
            stepSize: stepTemp,
            fontColor: 'blackColor',
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
          id: 'descriptionTop',
          type: 'category',
          position: 'bottom',

          gridLines: {
            display: true,
            drawOnChartArea: false
          },

          ticks: {
            fontSize: 10,
            callback: value => {
              let descriptionTop = value.weather[0].description.split(' ')

              switch (descriptionTop.length) {
                case 3:
                  return `${descriptionTop[0]}`
                  break
                case 4:
                  return `${descriptionTop[0]} ${descriptionTop[1]}`
                  break
                default:
                  return `${descriptionTop[0]}`
              }
            },
            maxRotation: 0,
          }
        }, {
          id: 'descriptionBottom',
          type: 'category',
          position: 'bottom',

          gridLines: {
            display: false,
          },

          ticks: {
            fontSize: 10,
            callback: value => {
              let descriptionBottom = value.weather[0].description.split(' ')

              switch (descriptionBottom.length) {
                case 3:
                  return `${descriptionBottom[1]} ${descriptionBottom[2]}`
                  break
                case 4:
                  return `${descriptionBottom[2]} ${descriptionBottom[3]}`
                  break
                default:
                  return `${descriptionBottom[1]}`
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
            callback: value => `${value.wind_speed.toFixed(1)}m/s`,
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
            callback: (value, _, arr) => {
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
  new Chart(myPositionYaxis, {
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
            stepSize: stepTemp,
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
