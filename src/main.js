// import { createMenuTemplate } from './view/menu';
import MenuView  from './view/menu';
import SortingView from './view/sorting';
import ListPointsView from './view/list-point-trip';
import TripInfoView from './view/trip-info';
import CostView from './view/cost';
import FilterView from './view/filters';
import PointTripView from './view/point-trip';
import PointTripEditView from './view/edit-point';
import NoPointTripView from './view/list-empty';
import { generatePoint } from './mock/point';
import { generateFilter } from './mock/filter';
import { compareDates } from './utils/point';
import { countTheTotalAmount } from './view/cost';
import { getTripInfo, getDatesTrip } from './view/trip-info';
import { render, RenderPosition, replace } from './utils/render';

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
    replace(pointEditComponent, pointCompanent);
  };

  const replaceFormToCard = () => {
    replace(pointCompanent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    // debugger;
    if(evt.key ==='ESC' || evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown',onEscKeyDown);
    }
  };

  pointCompanent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {

    replaceFormToCard();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(pointListElement, pointCompanent, RenderPosition.BEFOREEND);
};

// Рендерит информацию о маршруте и датах

render(tripMain, new TripInfoView(infoAboutTrip, infoAboutDateTrip), RenderPosition.AFTERBEGIN);

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

// рендерит общую стоимость

render(tripInfo, new CostView(costPoints), RenderPosition.BEFOREEND);

// Рендерит меню

render(tripControls, new MenuView(), RenderPosition.BEFOREEND);

// Рендерит фильтры

render(tripFilters, new FilterView(filters), RenderPosition.BEFOREEND);


// Рендерит маршрут с точками

const renderTripBoard = (tripContainer, tripPoints) => {

  // Рендерит cортировку
  render(tripContainer, new SortingView(), RenderPosition.BEFOREEND);

  // Рендерит контейнер list для points

  const listPoint = new ListPointsView();
  render(tripContainer, listPoint, RenderPosition.BEFOREEND);

  // рендерит заглушку если нет точек маршрута

  const EmptyData = tripPoints.every((element) => element === 0);

  if(EmptyData) {
    render(tripContainer, new NoPointTripView(), RenderPosition.BEFOREEND);
  } else {
    for (let i = 0; i <= POINT_COUNT-1; i++) {
      renderPoint(listPoint, tripPoints[i]);
    }
  }
};

renderTripBoard(tripEvents, points);

// points.forEach((element) => {
//   if(points.length === 0) {
//     render(tripEvents, new NoPointTripView().getElement(), RenderPosition.BEFOREEND);
//   } else {
//     renderPoint(listPoint, element);
//   }
// // });

// const checkPoint = (data) => {
//   const filteredData = data.every((item) => item);
//   if(filteredData) }{
//     render(tripEvents, new NoPointTripView().getElement(), RenderPosition.BEFOREEND);
//   } else {
//     renderPoint(listPoint, points[i]);
//   }

// };

// const EmptyData = points.every((element) => element === 0);

// if(EmptyData) {
//   render(tripEvents, new NoPointTripView(), RenderPosition.BEFOREEND);
// } else {
//   for (let i = 0; i <= POINT_COUNT-1; i++) {
//     renderPoint(listPoint, points[i]);
//   }
// }

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
//     removeElement();
//     render(listPoint, new PointTripEditView().getElement(), RenderPosition.AFTERBEGIN);
//     for (let i = 0; i < POINT_COUNT; i++) {
//       renderPoint(listPoint, points[i]);
//     }
//   });
// };

// addNewPoint();

