import MenuView  from './view/menu';
import TripInfoView from './view/trip-info';
import CostView from './view/cost';
// import FilterView from './view/filters';
import { generatePoint } from './mock/point';
// import { generateFilter } from './mock/filter';
// import { compareDates } from './utils/point';
import { countTheTotalAmount } from './view/cost';
import { getTripInfo, getDatesTrip } from './view/trip-info';
import { render, RenderPosition } from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/point';
import FilterModel from './model/filter';
// import Point from './presenter/point';

const POINT_COUNT = 4;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
console.log(points);

// const filters = generateFilter(points);
// const filters = [
//   {
//     type: 'everything',
//     name: 'EVERYTHING',
//     count: 0,
//   },
// ];

// Создает модель
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.setPoints(points);
console.log(filterModel);


// console.log(filters);

// Сортировка массива объектов по дате

// const sortedArray = () => points.sort(compareDates);

// sortedArray();

const costPoints = countTheTotalAmount(points);
const infoAboutTrip = getTripInfo(points);
const infoAboutDateTrip = getDatesTrip(points);
const tripMain = document.querySelector('.trip-main');
const tripControls = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

// Рендерит информацию о маршруте и датах

render(tripMain, new TripInfoView(infoAboutTrip, infoAboutDateTrip), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

// рендерит общую стоимость

render(tripInfo, new CostView(costPoints), RenderPosition.BEFOREEND);

// Рендерит меню

render(tripControls, new MenuView(), RenderPosition.BEFOREEND);

// Рендерит фильтры

// render(tripFilters, new FilterView(filters, 'everything'), RenderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter(tripFilters, pointsModel, filterModel);
filterPresenter.init();

// Рендерит точки маршрута
const tripPresenter = new TripPresenter(tripEvents, pointsModel);

tripPresenter.init();


// Закомментировал для проверки на значения по умолчанию при создания новой карточки

// const removeElement = () => {
//   const data = document.querySelectorAll('.trip-events__item');
//   const tripEditForm = document.querySelector('.event');
//   tripEditForm.remove();
//   for (let i = 0; i <= data.length-1; i++) {
//     data[i].remove();
//   }
// };

// const addNewPoint = () => {

//   const buttonAddNewpoint  = document.querySelector('.trip-main__event-add-btn');
//   buttonAddNewpoint.addEventListener('click', ()=> {
//     debugger;
//     removeElement();
//     render(tripEvents, new Point, RenderPosition.AFTERBEGIN);
//     tripPresenter.init()
//     // tripPresenter.init(points);
//     // for (let i = 0; i < POINT_COUNT; i++) {
//     //   renderPoint(listPoint, points[i]);
//     // }
//   });
// };

// addNewPoint();

