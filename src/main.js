import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createCostTemplate } from './view/cost';
import { createFilterTemplate } from './view/filters';
import { createSortingTemplate } from './view/sorting';
import { createFormAddNewPointTemplate } from './view/add-new-point';
import { editPointTripTemplate } from './view/edit-point';
import { createListPointTripTemplate } from './view/list-point-trip';
import { createPointTripTemplate } from './view/point-trip';
import { generatePoint } from './mock/point';
import { generateFilter } from './mock/filter';
// import dayjs from 'dayjs';

const POINT_COUNT = 15;

// Сгенерируем 15 точек маршрута

const points = new Array(POINT_COUNT).fill().map(generatePoint);
// console.log(points);

const filters = generateFilter(points);
// console.log(filters);

// Функция для сравнения дат
function compareDates(a, b) {
  return new Date(a.dateBegin) - new Date(b.dateBegin);
}

// Сортировка массива объектов по дате

const sortedArray = () => points.sort(compareDates);
// console.log('Сортировка по возрастанию:', sortedDates);

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
render(tripFilters, createFilterTemplate(filters));
render(tripEvents, createSortingTemplate());

render(tripEvents, editPointTripTemplate(points[0]));

render(tripEvents, createListPointTripTemplate());

const listPoint = document.querySelector('.trip-events__list');

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
    render(listPoint, createFormAddNewPointTemplate(), 'afterbegin');
    for (let i = 0; i < POINT_COUNT; i++) {
      render(listPoint, createPointTripTemplate(points[i]));
    }
  });
};

addNewPoint();
//

