import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createCostTemplate } from './view/cost';
import { createFilterTemplate } from './view/filters';
import { createSortingTemplate } from './view/sorting';
// import { createFormAddNewPointTemplate } from './view/add-new-point';
import { editPointTripTemplate } from './view/edit-point';
import { createListPointTripTemplate } from './view/list-point-trip';
import { createPointTripTemplate } from './view/point-trip';
import { generatePoint } from './mock/point';
import { generateFilter } from './mock/filter';
import { compareDates } from './view/utils';
import { countTheTotalAmount } from './view/cost';
import { getTripInfo, getDatesTrip } from './view/trip-info';

const POINT_COUNT = 15;

// Сгенерируем 15 точек маршрута

const points = new Array(POINT_COUNT).fill().map(generatePoint);
console.log(points);

const filters = generateFilter(points);
// console.log(filters);

// Сортировка массива объектов по дате

const sortedArray = () => points.sort(compareDates);

sortedArray();

const costPoints = countTheTotalAmount(points);
const infoAboutTrip = getTripInfo(points);
const infoAboutDateTrip = getDatesTrip(points);

// Отрисовка элемента на странице

const render = (container, component, place ='beforeend') => {
  container.insertAdjacentHTML(place, component);
};

const tripMain = document.querySelector('.trip-main');
const tripControls = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripMain, createTripInfoTemplate(infoAboutTrip, infoAboutDateTrip), 'afterbegin');

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

render(tripInfo, createCostTemplate(costPoints));
render(tripControls, createMenuTemplate());
render(tripFilters, createFilterTemplate(filters));
render(tripEvents, createSortingTemplate());

render(tripEvents, editPointTripTemplate(points[0]));

render(tripEvents, createListPointTripTemplate());

const listPoint = document.querySelector('.trip-events__list');

// отрисует все элементы
// points.forEach((element, index) => {
//   render(listPoint, createPointTripTemplate(element, index === 1));
// });

for (let i = 1; i < POINT_COUNT; i++) {
  render(listPoint, createPointTripTemplate(points[i]));
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
    render(listPoint, editPointTripTemplate(), 'afterbegin');
    for (let i = 0; i < POINT_COUNT; i++) {
      render(listPoint, createPointTripTemplate(points[i]));
    }
  });
};

addNewPoint();
//

