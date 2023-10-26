// import { createMenuTemplate } from './view/menu';
import MenuView  from './view/menu';
import SortingView from './view/sorting';
import ListPointsView from './view/list-point-trip';
import TripInfoView from './view/trip-info';
import CostView from './view/cost';
import FilterView from './view/filters';
import PointTripView from './view/point-trip';
import PointTripEditView from './view/edit-point';
import { generatePoint } from './mock/point';
import { generateFilter } from './mock/filter';
import { compareDates } from './view/utils';
import { countTheTotalAmount } from './view/cost';
import { getTripInfo, getDatesTrip } from './view/trip-info';
import { render, RenderPosition } from './view/utils';

const POINT_COUNT = 15;

// Сгенерируем 15 точек маршрута

const points = new Array(POINT_COUNT).fill().map(generatePoint);
// console.log(points);

const filters = generateFilter(points);
// console.log(filters);

// Сортировка массива объектов по дате

const sortedArray = () => points.sort(compareDates);

sortedArray();

const costPoints = countTheTotalAmount(points);
const infoAboutTrip = getTripInfo(points);
const infoAboutDateTrip = getDatesTrip(points);

const tripMain = document.querySelector('.trip-main');
const tripControls = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const renderPoint = (pointListElement, point) => {
  const pointCompanent = new PointTripView(point);
  const pointEditComponent = new PointTripEditView(point);

  const replaceCardToForm = () => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointCompanent.getElement());
  };

  const replaceFormToCard = () => {
    pointListElement.replaceChild(pointCompanent.getElement(), pointEditComponent.getElement());
  };

  pointCompanent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  pointEditComponent.getElement().addEventListener('submit', (evt) => {

    evt.preventDefault();
    replaceFormToCard();
  });

  render(pointListElement, pointCompanent.getElement(), RenderPosition.BEFOREEND);
};

// Рендерит информацию о маршруте и датах

render(tripMain, new TripInfoView(infoAboutTrip, infoAboutDateTrip).getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

// рендерит общую стоимость

render(tripInfo, new CostView(costPoints).getElement(), RenderPosition.BEFOREEND);

// Рендерит меню

render(tripControls, new MenuView().getElement(), RenderPosition.BEFOREEND);

// Рендерит фильтры

render(tripFilters, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

// Рендерит cортировку

render(tripEvents, new SortingView().getElement(), RenderPosition.BEFOREEND);

// Рендерит контейнер для points

render(tripEvents, new ListPointsView().getElement(), RenderPosition.BEFOREEND);

const listPoint = document.querySelector('.trip-events__list');

// отрисует все элементы
// points.forEach((element) => {
//   render(listPoint, createPointTripTemplate(element));
// });


for (let i = 0; i < POINT_COUNT; i++) {
  renderPoint(listPoint, points[i]);
}

const removeElement = () => {
  const data = document.querySelectorAll('.trip-events__item');
  const tripEditForm = document.querySelector('.event');
  tripEditForm.remove();
  for (let i = 0; i <= data.length-1; i++) {
    data[i].remove();
  }
};

const addNewPoint = () => {

  const buttonAddNewpoint  = document.querySelector('.trip-main__event-add-btn');
  buttonAddNewpoint.addEventListener('click', ()=> {
    removeElement();
    render(listPoint, new PointTripEditView().getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < POINT_COUNT; i++) {
      renderPoint(listPoint, points[i]);
    }
  });
};

addNewPoint();

