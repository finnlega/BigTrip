import SortingView from '../view/sorting';
import ListPointsView from '../view/list-point-trip';
import NoPointTripView from '../view/list-empty';
import PointPresenter from '../presenter/point';
import PointNewPresenter from '../presenter/point-new';
import { remove, render, RenderPosition } from '../utils/render';
// import { updateItem } from '../utils/common';
import { SortType, UpdateType, UserAction, FilterType } from '../view/const';
import { compareDates, comparePrice, compareTime } from '../utils/point';
import { filter } from '../utils/filter';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel) {

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSort = SortType.DAY;
    this._sortCompanent = null;
    this._listCompanent = new ListPointsView();
    this._noPointCompanent = new NoPointTripView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleChangeTypeSort = this._handleChangeTypeSort.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(tripContainer, this._handleViewAction);
  }

  init() {
    this._renderTripBoard();
  }

  // получает данные модели, взависимости о фильтра и сортирует их
  _getPoints() {

    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filterPoints = filter[filterType](points);

    switch(this._currentSort) {
      case SortType.PRICE:
        return filterPoints.sort(comparePrice);
      case SortType.TIME:
        return filterPoints.sort(compareTime);
    }
    return filterPoints.sort(compareDates);
  }

  createPoint() {
    this._currentSort = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTripBoard();
        this._renderTripBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTripBoard();
        break;
    }
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  // _handlePointChange(updatePoint) {
  //   // Вызывает обвновление данных модели
  //   this._tripPoints = updateItem(this._tripPoints, updatePoint);
  //   this._pointPresenter[updatePoint.id].init(updatePoint);
  // }

  _handleChangeTypeSort(sortType) {
    if (this._currentSort === sortType) {
      return;
    }
    this._currentSort = sortType;
    this._clearTripBoard();
    this._renderTripBoard();
  }

  _renderSort() {
    // логика рендера сортировки точек
    if(this._sortCompanent !== null) {
      this._sortCompanent === null;
    }
    this._sortCompanent = new SortingView(this._currentSort);
    this._sortCompanent.setChangeSortHandler(this._handleChangeTypeSort);
    render(this._tripContainer, this._sortCompanent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // рендер точки маршрута

    const pointPresenter = new PointPresenter(this._listCompanent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    // логика отрисовки нескольких точек маршрута
    points.forEach((point) => this._renderPoint(point));
    console.log('после изменений', points);
  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута

    render(this._tripContainer, this._noPointCompanent, RenderPosition.BEFOREEND);
  }

  _clearTripBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortCompanent);
    remove(this._noPointCompanent);

    if(resetSortType) {
      this._currentSort = SortType.DAY;
    }
  }

  _renderTripBoard() {
    const points = this._getPoints().slice();
    const isEmpty = this._getPoints().length === 0;

    if(isEmpty) {
      this._renderSort();
      render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);
    this._renderPoints(points);
  }
}
