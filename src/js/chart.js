import Chart from "chart.js";
import { dropRight } from "lodash";

export const chart = data => {
  const ctx = document.getElementById("myChart");


  const arrTemp = data.hourly.map(item => Math.round(item.temp))
  const arrIndex = data.hourly.map((item, index) => item)

  console.log(arrIndex);


  let min = Math.min(...arrTemp)
  let max = Math.max(...arrTemp)
  console.log("min " + min);
  console.log("max " + max);

  console.log(max - min);

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: arrIndex,
      datasets: [
        {
          data: arrTemp,
          borderColor: 'rgb(235,110,75)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 2,
          pointBorderColor: 'rgba(0, 0, 0, 0)',
        },
        {
          data: arrIndex,
          xAxisID: 'second-y-axis',
        }
      ],
    },

    options: {
      maintainAspectRatio: false,

      events: [], // tắt các sự kiện khi tác động vào biểu đồ

      layout: {
        padding: {
          top: 100
        }
      },

      legend: {
        display: false,
      },

      tooltips: {
        enabled: false
      },


      scales: {

        yAxes:
          [
            {
              gridLines: {
                display: true,
              },
              ticks: {
                stepSize: max - min < 5 ? 1 : (max - min < 8 ? 2 : 5),
                callback: value => `${value}°C`,
                fontColor: 'rgb(235,110,75)',
                padding: 10,

              }
            }

          ],
        xAxes:
          [
            {

              gridLines: {
                display: true,

              },
              ticks: {
                fontSize: 10,
                callback: value => value.humidity,
                maxRotation: 0,

              }
            },
            {
              id: 'second-y-axis',
              type: 'category',
              position: 'top',

              ticks: {
                fontSize: 10,
                callback: value => value.pressure,
                maxRotation: 0,
              }
            }
          ],
      },
    },
  });
};
