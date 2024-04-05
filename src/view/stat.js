import AbstractView from './abstract';

const moneyCtx = document.querySelector('#money');
const typeCtx = document.querySelector('#type');
const timeCtx = document.querySelector('#time-spend');
const arr = document.querySelectorAll('.statistics__item');

console.log(arr);
arr.forEach((item) => console.log(item));

console.log('money', moneyCtx);
console.log('type', typeCtx);
console.log('time', timeCtx);

const createStatTemplate = () => `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <div class="statistics__chart" id="money" width="900">1</div>
    </div>

    <div class="statistics__item">
      <div class="statistics__chart" id="type" width="900">2</div>
    </div>

    <div class="statistics__item">
      <div class="statistics__chart" id="time-spend" width="900">3</div>
    </div>
  </section>`;

export default class Stat extends AbstractView {
  constructor() {
    super();
    // this._points = points;
  }

  getTemplate() {
    return createStatTemplate();
  }

  show() {
    this.getElement().classList.delete('.visually-hidden');
  }

  hide() {
    this.getElement().classList.add('.visually-hidden');
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
