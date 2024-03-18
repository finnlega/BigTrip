import MenuView  from './view/menu';
import TripInfoView from './view/trip-info';
import CostView from './view/cost';
// import FilterView from './view/filters';
import { generatePoint } from './mock/point';
// import { generateFilter } from './mock/filter';
// import { compareDates } from './utils/point';
// import { countTheTotalAmount } from './view/cost';
// import { getTripInfo, getDatesTrip } from './view/trip-info';
import { render, RenderPosition } from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/point';
import FilterModel from './model/filter';
// import Point from './presenter/point';

const POINT_COUNT = 12;

const points = new Array(POINT_COUNT).fill().map(generatePoint);
console.log(points);


// Создает модель
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.setPoints(points);

// const infoAboutTrip = getTripInfo(points);
// const infoAboutDateTrip = getDatesTrip(points);
const tripMain = document.querySelector('.trip-main');
const tripControls = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

// Рендерит информацию о маршруте и датах

// render(tripMain, new TripInfoView(infoAboutTrip, infoAboutDateTrip), RenderPosition.AFTERBEGIN);
render(tripMain, new TripInfoView(), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

// рендерит общую стоимость

render(tripInfo, new CostView(), RenderPosition.BEFOREEND);

// Рендерит меню

render(tripControls, new MenuView(), RenderPosition.BEFOREEND);

// Рендерит фильтры

const filterPresenter = new FilterPresenter(tripFilters, pointsModel, filterModel);
filterPresenter.init();

// Рендерит точки маршрута
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel);

tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  // debugger;
  tripPresenter.createPoint();
});
