import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart';
import { TYPE_POINT_TRIP } from './const';
import { getTimeInMinute } from '../utils/point';
import { transformTime, sortValues } from '../utils/common';

const countElementsByParameter = (array, param) => {
  const result = {};
  const initialValue = 0;
  TYPE_POINT_TRIP.forEach((elem) => {
    const filteredPoints = array.filter((element) => element.offer && element.offer.type === elem);
    if(filteredPoints.length <= 0) {
      return;
    }
    switch (param) {
      case 'type':
        result[elem.toUpperCase()] = filteredPoints.length;
        break;
      case 'money':
        result[elem.toUpperCase()] = filteredPoints.reduce((accumulator, element) => accumulator + element.basePrice, initialValue);
        break;
      case 'time':
        result[elem.toUpperCase()] = filteredPoints.reduce((accumulator, element) => accumulator + getTimeInMinute(element), initialValue);
        break;
    }
  });
  return result;
};

const renderMoneyChart = (moneyCtx, points) => {

  const arrays = countElementsByParameter(points, 'money');
  const sortData = sortValues(arrays);

  // Сколько за время путешествия было в сумме потрачено?»
  // Диаграмма «Money» не учитывает дополнительные опции, только стоимость точек маршрута.

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(sortData),
      datasets: [{
        data: Object.values(sortData),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
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
          formatter: (val) => `€ ${val}`,
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

const renderTypeChart = (typeCtx, points) => {

  const arrays = countElementsByParameter(points, 'type');
  const sortData = sortValues(arrays);

  // Диаграмма «Type» показывает статистику по типам точек маршрута.
  const typeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(sortData),
      datasets: [{
        data: Object.values(sortData),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
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
  return typeChart;
};

const renderTimeSpendChart = (timeCtx, points) => {

  const arrays = countElementsByParameter(points, 'time');
  const sortData = sortValues(arrays);

  // Диаграмма «Time-Spend» показывает, сколько времени было затрачено на каждый тип точки маршрута
  // Сколько дней, часов и минут в сумме пользователь проведёт в самолёте, такси, ресторане и так далее».
  // Формат общего времени, проведённого в точках маршрута, совпадает с форматом продолжительности нахождения в точке маршрута на главной странице.

  const timeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Object.keys(sortData),
      datasets: [{
        data: Object.values(sortData),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
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
          formatter: (val) => `${transformTime(val)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
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
  return timeChart;
};


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
    if(this._moneyCtx !== null || this._typeCtx !== null || this._timeCtx !== null) {
      this._moneyCtx = null;
      this._typeCtx = null;
      this._timeCtx = null;
    }
    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 8;
    typeCtx.height = BAR_HEIGHT * 8;
    timeCtx.height = BAR_HEIGHT * 8;

    this._moneyCtx = renderMoneyChart(moneyCtx, this._points);
    this._typeCtx = renderTypeChart(typeCtx, this._points);
    this._timeCtx = renderTimeSpendChart(timeCtx, this._points);
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
