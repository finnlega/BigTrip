import SortingView from './view/sorting';
import ListPointsView from './view/list-point-trip';
import NoPointTripView from './view/list-empty';
import PointTripView from './view/point-trip';
import PointTripEditView from './view/edit-point';
import { render, RenderPosition } from './utils/render';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortCompanent = new SortingView();
    this._listCompanent = new ListPointsView();
    this._noPointCompanent = new NoPointTripView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
  }

  _renderSort() {
    // логика рендера сортировки точек
  }

  _renderList () {
    // рендер списка точек маршрута
  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута
  }

  _renderPoint() {
    // рендер точки маршрута
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}

