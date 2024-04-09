import MenuView  from './view/menu';
import TripInfoView from './view/trip-info';
import CostView from './view/cost';
import StatView from './view/stat';
import { generatePoint } from './mock/point';
import { render, RenderPosition } from './utils/render';
import { MenuItem } from './view/const';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/point';
import FilterModel from './model/filter';
import OfferModel from './model/offer';
import { options } from './mock/offer';

const POINT_COUNT = 22;

// debugger;
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
const menuCompanent = new MenuView();
render(tripControls, menuCompanent, RenderPosition.BEFOREEND);

// Рендерит фильтры

const filterPresenter = new FilterPresenter(tripFilters, pointsModel, filterModel);
filterPresenter.init();

// Рендерит точки маршрута
const tripPresenter = new TripPresenter(tripEvents, pointsModel, filterModel, offerModel);

// tripPresenter.init();
render(tripEvents, new StatView(pointsModel.getPoints()), RenderPosition.BEFOREEND);

const buttonAddNewPoint = document.querySelector('.trip-main__event-add-btn');

const handlePointNewFormClose = () => {
  buttonAddNewPoint.disabled = false;
  menuCompanent.setMenuItem(MenuItem.TABLE);
};

const handleMenuClick = (menuItem) => {

  switch (menuItem) {
    case MenuItem.TABLE:

      // Скрыть Статистику
      menuCompanent.setMenuItem(MenuItem.TABLE);
      tripPresenter.init(); // показать доску

      break;

    case MenuItem.STATS:
      menuCompanent.setMenuItem(MenuItem.STATS);
      tripPresenter.destroy(); // скрыть доску

      // render(tripEvents, new StatView(pointsModel.getPoints()), RenderPosition.BEFOREEND);
      break;
  }
};

menuCompanent.setMenuClickHandler(handleMenuClick);

const addNewPoint = () => {
  buttonAddNewPoint.addEventListener('click', (evt) => {

    evt.preventDefault();
    const activeMenuItem = document.querySelector('.trip-tabs__btn--active').textContent;

    if (activeMenuItem === MenuItem.STATS) {
      handleMenuClick(MenuItem.TABLE);
      tripPresenter.createPoint(handlePointNewFormClose);
      buttonAddNewPoint.disabled = true;
    } else {
      tripPresenter.createPoint(handlePointNewFormClose);
      buttonAddNewPoint.disabled = true;
    }
  });

};

addNewPoint();

export { offers };
