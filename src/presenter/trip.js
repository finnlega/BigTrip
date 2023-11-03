import SortingView from './view/sorting';
import ListPointsView from './view/list-point-trip';
import NoPointTripView from './view/list-empty';
import PointTripView from './view/point-trip';
import PointTripEditView from './view/edit-point';
import { render, RenderPosition } from './utils/render';


export default class Trip {
  constructor(tripContainer, _countPoints) {
    this._tripContainer = tripContainer;
    this._countPoints = _countPoints;

    this._sortCompanent = new SortingView();
    this._listCompanent = new ListPointsView();
    this._noPointCompanent = new NoPointTripView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    render(this._tripContainer, this._sortCompanent, RenderPosition.BEFOREEND);
    render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  _renderSort() {
    // логика рендера сортировки точек
  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута
  }

  _renderPoint() {
    // рендер точки маршрута
  }

  _renderPoints() {
    // логика отрисовки нескольких точек маршрута
  }

  _renderTripBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    const isEmpty = this._tripPoints.every((element) => element === 0);

    if(isEmpty) {
      // render(this._tripContainer, this._renderNoPoint(), RenderPosition.BEFOREEND);
      this._renderNoPoint();
      return;
    }
    this._renderSort();
    this._renderPoints(this._countPoint);
    // for (let i = 0; i <= this._countPoint-1; i++) {
    //   this._renderPoint(this._listCompanent, this._tripPoints[i]);

    // for (let i = 0; i <= this._tripPoints-1; i++) {
    //   this._renderPoint(this._listCompanent, this._tripPoints[i]);
    // }
    // this._tripPoints.forEach((element) => {
    //   this._renderPoint(this._listCompanent, element);
    // });
  }
}

