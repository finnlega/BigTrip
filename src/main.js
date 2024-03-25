import MenuView  from './view/menu';
import TripInfoView from './view/trip-info';
import CostView from './view/cost';
import { generatePoint } from './mock/point';
import { render, RenderPosition } from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/point';
import FilterModel from './model/filter';
import OfferModel from './model/offer';
import { options } from './mock/offer';

const POINT_COUNT = 12;

const offerModel = new OfferModel();
offerModel.setOffers(options);
const offers = offerModel.getOffers();

const points = new Array(POINT_COUNT).fill().map(generatePoint);
console.log(points);


// Создает модель
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
pointsModel.setPoints(points);

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
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, offerModel);

tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  // debugger;
  tripPresenter.createPoint();
});

export { offers };
