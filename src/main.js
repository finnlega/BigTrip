import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createCostTemplate } from './view/cost';
import { createFilterTemplate } from './view/filters';
import { createSortingTemplate } from './view/sorting';
import { createFormAddNewPointTemplate } from './view/add-new-point';
import { editPointTripTemplate } from './view/edit-point';
import { createListPointTripTemplate } from './view/list-point-trip';
import { createPointTripTemplate } from './view/point-trip';
import { generate } from './mock/point';

const POINT_COUNT = 15;

// Сгенерируем 15 точек маршрута

const points = new Array(POINT_COUNT).fill().map(generate);
console.log(points);

// Функция для сравнения дат
function compareDates(a, b) {
  return new Date(a.dateBegin) - new Date(b.dateBegin);
}

// Сортировка массива объектов по дате

const sortedArray = () => {
  const sortedDates = points.sort(compareDates);
  console.log('Сортировка по возрастанию:', sortedDates);
};

sortedArray();


// Отрисовка элемента на странице

const render = (container, component, place ='beforeend') => {
  container.insertAdjacentHTML(place, component);
};

const tripMain = document.querySelector('.trip-main');
const tripControls = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

render(tripInfo, createCostTemplate());
render(tripControls, createMenuTemplate());
render(tripFilters, createFilterTemplate());
render(tripEvents, createSortingTemplate());
render(tripEvents, editPointTripTemplate());
render(tripEvents, createFormAddNewPointTemplate());
render(tripEvents, createListPointTripTemplate());

const listPoint = document.querySelector('.trip-events__list');

for (let i = 0; i < POINT_COUNT; i++) {
  render(listPoint, createPointTripTemplate(points[i]));
}
