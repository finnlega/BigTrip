import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart';
import { TYPE_POINT_TRIP } from './const';

const separateElements = (array) => {
  // debugger;
  // console.log('всеЭлем', points);
  const result = {};

  TYPE_POINT_TRIP.forEach((elem) => {
    const filteredPoints = array.filter((element) => element.offer && element.offer.type === elem);

    if(filteredPoints.length <= 0) {
      return;
    }
    result[elem.toUpperCase()] = filteredPoints.length;
  });
  return result;
};

const renderMoneyChart = (moneyCtx, points) => {

  const arrays = separateElements(points);
  const entries = Object.entries(arrays);
  console.log('ключ и значение', entries);

  // Отсортируем массив пар по значению (по возрастанию)
  entries.sort((a, b) => b[1] - a[1]);

  // Преобразуем отсортированный массив пар обратно в объект
  const sortedObject = Object.fromEntries(entries);
  console.log('sorted obj', sortedObject);

  // Сколько за время путешествия было в сумме потрачено?»
  // Диаграмма «Money» не учитывает дополнительные опции, только стоимость точек маршрута.

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(sortedObject),
      datasets: [{
        data: Object.values(sortedObject),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 40,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return moneyChart;
};

const renderTypeChart = (typeCtx) => {
  // const arrays = separateElements(points);
  // Диаграмма «Type» показывает статистику по типам точек маршрута.
  const typeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
      datasets: [{
        data: [4, 3, 2, 1, 10, 1],
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};

// const renderTimeSpendChart = (timeCtx, points) => {
//   // Диаграмма «Time-Spend» показывает, сколько времени было затрачено на каждый тип точки маршрута
//   // Сколько дней, часов и минут в сумме пользователь проведёт в самолёте, такси, ресторане и так далее».
//   // Формат общего времени, проведённого в точках маршрута, совпадает с форматом продолжительности нахождения в точке маршрута на главной странице.
//   const timeChart = new Chart(timeCtx, {
//     plugins: [ChartDataLabels],
//     type: 'horizontalBar',
//     data: {
//       labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
//       datasets: [{
//         data: [4, 3, 2, 1, 1, 1],
//         backgroundColor: '#ffffff',
//         hoverBackgroundColor: '#ffffff',
//         anchor: 'start',
//       }],
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 13,
//           },
//           color: '#000000',
//           anchor: 'end',
//           align: 'start',
//           formatter: (val) => '${val}x',
//         },
//       },
//       title: {
//         display: true,
//         text: 'TIME',
//         fontColor: '#000000',
//         fontSize: 23,
//         position: 'left',
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: '#000000',
//             padding: 5,
//             fontSize: 13,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false,
//           },
//           barThickness: 44,
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true,
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false,
//           },
//           minBarLength: 50,
//         }],
//       },
//       legend: {
//         display: false,
//       },
//       tooltips: {
//         enabled: false,
//       },
//     },
//   });
//   return timeChart;
// };


const createStatsTemplate = () => `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
  </div>
  </section>`;

export default class Stat extends SmartView {
  constructor(points) {
    super();
    this._points = points;
    this._moneyCtx = null;
    this._typeCtx = null;
    this._timeCtx = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  show() {
    this.getElement().classList.delete('.visually-hidden');
  }

  hide() {
    this.getElement().classList.add('.visually-hidden');
  }

  _setCharts() {
    // диаграммы
    // if(this._moneyCtx !== null || this._typeCtx !== null || this._timeCtx !== null) {
    if(this._moneyCtx !== null || this._typeCtx !== null) {
      this._moneyCtx = null;
      this._typeCtx = null;
      // this._timeCtx = null;
    }
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    // const timeCtx = this.getElement().querySelector('#time-spend');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 10;
    typeCtx.height = BAR_HEIGHT * 5;
    // timeCtx.height = BAR_HEIGHT * 5;

    console.log('точки', this._points);
    this._moneyCtx = renderMoneyChart(moneyCtx, this._points);
    this._typeCtx = renderTypeChart(typeCtx);
    // this._timeCtx = renderTimeSpendChart(timeCtx);
  }
}


// const moneyCtx = document.querySelector('.statistics__chart--money');
// const typeCtx = document.querySelector('.statistics__chart--transport');
// const timeCtx = document.querySelector('.statistics__chart--time');

// // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
// const BAR_HEIGHT = 55;
// moneyCtx.height = BAR_HEIGHT * 5;
// typeCtx.height = BAR_HEIGHT * 5;
// timeCtx.height = BAR_HEIGHT * 5;

// const moneyChart = new Chart(moneyCtx, {
//   plugins: [ChartDataLabels],
//   type: 'horizontalBar',
//   data: {
//     labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
//     datasets: [{
//       data: [400, 300, 200, 160, 150, 100],
//       backgroundColor: '#ffffff',
//       hoverBackgroundColor: '#ffffff',
//       anchor: 'start',
//     }],
//   },
//   options: {
//     plugins: {
//       datalabels: {
//         font: {
//           size: 13,
//         },
//         color: '#000000',
//         anchor: 'end',
//         align: 'start',
//         formatter: (val) => '€ ${val}',
//       },
//     },
//     title: {
//       display: true,
//       text: 'MONEY',
//       fontColor: '#000000',
//       fontSize: 23,
//       position: 'left',
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           fontColor: '#000000',
//           padding: 5,
//           fontSize: 13,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//         barThickness: 44,
//       }],
//       xAxes: [{
//         ticks: {
//           display: false,
//           beginAtZero: true,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//         minBarLength: 50,
//       }],
//     },
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       enabled: false,
//     },
//   },
// });

// const typeChart = new Chart(typeCtx, {
//   plugins: [ChartDataLabels],
//   type: 'horizontalBar',
//   data: {
//     labels: ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'TRANSPORT', 'DRIVE'],
//     datasets: [{
//       data: [4, 3, 2, 1, 1, 1],
//       backgroundColor: '#ffffff',
//       hoverBackgroundColor: '#ffffff',
//       anchor: 'start',
//     }],
//   },
//   options: {
//     plugins: {
//       datalabels: {
//         font: {
//           size: 13,
//         },
//         color: '#000000',
//         anchor: 'end',
//         align: 'start',
//         formatter: (val) => '${val}x',
//       },
//     },
//     title: {
//       display: true,
//       text: 'TYPE',
//       fontColor: '#000000',
//       fontSize: 23,
//       position: 'left',
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           fontColor: '#000000',
//           padding: 5,
//           fontSize: 13,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//         barThickness: 44,
//       }],
//       xAxes: [{
//         ticks: {
//           display: false,
//           beginAtZero: true,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//         minBarLength: 50,
//       }],
//     },
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       enabled: false,
//     },
//   },
// });
