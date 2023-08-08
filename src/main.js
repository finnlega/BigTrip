import { createMenuTemplate } from './view/menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createCostTemplate } from './view/cost';
import { createFilterTemplate } from './view/filters';
import { createSortingTemplate } from './view/sorting';
import { CreateFormAddNewPointTemplate } from './view/add-new-point';
import { editPointTripTemplate } from './view/edit-point';

// Отрисовка компонента на странице

const render = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

const tripMain = document.querySelector('.trip-main');
const tripControls = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const sorting = document.querySelector('.trip-events');

render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripInfo = tripMain.querySelector('.trip-main__trip-info');

render(tripInfo, createCostTemplate(), 'beforeend');
render(tripControls, createMenuTemplate(), 'beforeend');
render(tripFilters, createFilterTemplate(), 'beforeend');
render(sorting, createSortingTemplate(), 'beforeend');
// render(sorting, CreateFormAddNewPointTemplate(), 'beforeend');
render(sorting, editPointTripTemplate(), 'beforeend');
//
