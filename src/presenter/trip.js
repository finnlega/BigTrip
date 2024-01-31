import SortingView from '../view/sorting';
import ListPointsView from '../view/list-point-trip';
import NoPointTripView from '../view/list-empty';
import PointPresenter from '../presenter/point';
import { render, RenderPosition } from '../utils/render';
import { updateItem } from '../utils/common';
import { SortType } from '../view/const';
import { compareDates, comparePrice, compareTime } from '../utils/point';

export default class Trip {
  constructor(tripContainer, pointsModel) {

    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSort = SortType.DAY;

    this._sortCompanent = new SortingView();
    this._listCompanent = new ListPointsView();
    this._noPointCompanent = new NoPointTripView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleChangeTypeSort = this._handleChangeTypeSort.bind(this);

  }

  init() {
    this._renderSort();
    render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  // получает данные модели и сортирует их
  _getPoints() {
    switch(this._currentSort) {
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(comparePrice);
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(compareTime);
    }

    return this._pointsModel.getPoints().slice().sort(compareDates);
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatePoint) {
    // Вызывает обвновление данных модели
    this._tripPoints = updateItem(this._tripPoints, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
  }

  _handleChangeTypeSort(sortType) {
    // debugger;
    if (this._currentSort === sortType) {
      return;
    }
    this._currentSort = sortType;
    this._clearPointList();
    this._renderTripBoard();
  }

  _renderSort() {
    // логика рендера сортировки точек
    // debugger;
    render(this._tripContainer, this._sortCompanent, RenderPosition.BEFOREEND);
    this._sortCompanent.setChangeSortHandler(this._handleChangeTypeSort);
  }

  _renderPoint(point) {
    // рендер точки маршрута

    const pointPresenter = new PointPresenter(this._listCompanent, this._handlePointChange, this._handleModeChange);
    // console.log(this);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    // логика отрисовки нескольких точек маршрута
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута
    render(this._tripContainer, this._noPointCompanent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderTripBoard() {
    const isEmpty = this._getPoints().length === 0;

    if(isEmpty) {
      this._renderNoPoint();
      return;
    }
    const points = this._getPoints().slice();
    // this._renderSort();

    // console.log('точки маршрута', points);
    // this._renderSort();

    this._renderPoints(points);
  }
}
