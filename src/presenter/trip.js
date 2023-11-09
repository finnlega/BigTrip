import SortingView from '../view/sorting';
import ListPointsView from '../view/list-point-trip';
import NoPointTripView from '../view/list-empty';
import PointPresenter from '../presenter/point';
import { render, RenderPosition } from '../utils/render';
import { updateItem } from '../utils/common';
import { sortType } from '../view/const';
// import { compareDates } from '../utils/point';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this.currentSort = sortType.DAY;

    this._sortCompanent = new SortingView();
    this._listCompanent = new ListPointsView();
    this._noPointCompanent = new NoPointTripView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleChangeTypeSort = this._handleChangeTypeSort.bind(this);

  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    // добавить сортировку по умолчанию
    // this.tripPointsSort = compareDates(this._tripPoints);
    // сохраняем исходный массив для сортировки по колонке day
    this._initSourcePointsSort = this._tripPoints.slice();

    this._renderSort();
    render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  _handlePointChange(updatePoint) {
    // Обновляет данные точки маршрута
    this._tripPoints = updateItem(this._tripPoints, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
  }

  _sortPoints() {
    // console.log(this);
  }

  _handleChangeTypeSort() {
    this._sortPoints(this);
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  }

  _renderSort() {
    // логика рендера сортировки точек
    // debugger;
    render(this._tripContainer, this._sortCompanent, RenderPosition.BEFOREEND);
    this._sortCompanent.setChangeSortHandler(this._handleChangeTypeSort);
  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута
    render(this._tripContainer, this._noPointCompanent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // рендер точки маршрута

    const pointPresenter = new PointPresenter(this._listCompanent, this._handlePointChange, this._handleModeChange);
    // console.log(this);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderPoints() {
    // логика отрисовки нескольких точек маршрута
    this._tripPoints
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderTripBoard() {
    const isEmpty = this._tripPoints.length === 0;

    if(isEmpty) {
      this._renderNoPoint();
      return;
    }
    // this._renderSort();
    this._renderPoints();
  }
}

