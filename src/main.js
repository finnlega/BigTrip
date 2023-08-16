import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createCostTemplate } from './view/cost';
import { createFilterTemplate } from './view/filters';
import { createSortingTemplate } from './view/sorting';
import { createFormAddNewPointTemplate } from './view/add-new-point';
import { editPointTripTemplate } from './view/edit-point';
import { createListPointTripTemplate } from './view/list-point-trip';
import { createPointTripTemplate } from './view/point-trip';
import { result } from './mock/point';
const POINT_COUNT = 3;

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
  render(listPoint, createPointTripTemplate());
}

console.log(result)

