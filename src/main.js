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
import { renderElement, RenderPosition } from './view/utils';

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

// Рендерит информацию о маршруте и датах

renderElement(tripMain, new TripInfoView(infoAboutTrip, infoAboutDateTrip).getElement(), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

// рендерит общую стоимость

renderElement(tripInfo, new CostView(costPoints).getElement(), RenderPosition.BEFOREEND);

// Рендерит меню

renderElement(tripControls, new MenuView().getElement(), RenderPosition.BEFOREEND);

// Рендерит фильтры

renderElement(tripFilters, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

// Рендерит cортировку

renderElement(tripEvents, new SortingView().getElement(), RenderPosition.BEFOREEND);

// Рендерит карточку на редактирование

renderElement(tripEvents, new PointTripEditView(points[0]).getElement(), RenderPosition.BEFOREEND);

// Рендерит контейнер для points

renderElement(tripEvents, new ListPointsView().getElement(), RenderPosition.BEFOREEND);

const listPoint = document.querySelector('.trip-events__list');

// отрисует все элементы
// points.forEach((element) => {
//   render(listPoint, createPointTripTemplate(element));
// });

for (let i = 1; i < POINT_COUNT; i++) {
  renderElement(listPoint, new PointTripView(points[i]).getElement(), RenderPosition.BEFOREEND);
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
    renderElement(listPoint, new PointTripEditView().getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < POINT_COUNT; i++) {
      renderElement(listPoint, new PointTripView(points[i]).getElement(), RenderPosition.BEFOREEND);
    }
  });
};

addNewPoint();

