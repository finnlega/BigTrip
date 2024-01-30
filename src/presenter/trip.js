import SortingView from '../view/sorting';
import ListPointsView from '../view/list-point-trip';
import NoPointTripView from '../view/list-empty';
import PointPresenter from '../presenter/point';
import { render, RenderPosition, remove } from '../utils/render';
// import { updateItem } from '../utils/common';
import { SortType, UserAction, UpdateType } from '../view/const';
import { compareDates, comparePrice, compareTime } from '../utils/point';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._pointPresenter = {};
    this._currentSort = SortType.DAY;

    this._sortCompanent = null;

    // this._sortCompanent = new SortingView();
    this._listCompanent = new ListPointsView();

    this._noPointCompanent = new NoPointTripView();

    // this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleChangeTypeSort = this._handleChangeTypeSort.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);

  }

  // init(tripPoints) {
  //   this._tripPoints = tripPoints
  //     .slice()
  //     .sort(compareDates);

  //   this._sourcedTripPoints = this._tripPoints.slice();

  //   this._renderSort();
  //   render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);

  //   this._renderTripBoard();
  // }

  init() {
    this._pointsModel.getPoints().sort(compareDates);
    this._renderSort();
    // render(this._tripContainer, this._listCompanent, RenderPosition.BEFOREEND);
    render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  _getPoints() {
    switch (this._currentSort) {
      case SortType.PRICE:
        this._pointsModel.getPoints().slice().sort(comparePrice);
        // console.log('отсортированный исходный массив по PRICE', this._tripPoints);
        break;
      case SortType.TIME:
        this._pointsModel.getPoints().slice().sort(compareTime);
        // console.log('отсортированный исходный массив по TIME', this._tripPoints);
        break;
    }
    return this._pointsModel.getPoints();
  }

  // _handlePointChange(updatePoint) {
  //   // Обновляет данные точки маршрута
  //   // this._tripPoints = updateItem(this._tripPoints, updatePoint);
  //   this._pointPresenter[updatePoint.id].init(updatePoint);
  // }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
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
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // this.parent = document.querySelector('.trip-events__list');
        // console.log('parent', this.parent);
        this._clearTripBoard();
        this._renderTripBoard();
        // this._pointPresenter[data.id].init(data);


        // this._pointPresenter[point.id] = pointPresenter;

        break;
        // - обновить список (например, когда задача ушла в избранное)
        // this._clearPointList();
        // this._renderPoints();
        // break;
      case UpdateType.MAJOR:
        this._clearTripBoard({resetSortType: true});
        this._renderTripBoard();
        // - обновить весь список точек маршрута (например, при переключении фильтра)
        break;
    }
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  // _sortPoints(sortType) {
  //   // console.log('значение сортировки', sortType);
  //   switch (sortType) {
  //     case SortType.PRICE:
  //       this._tripPoints.sort(comparePrice);
  //       // console.log('отсортированный исходный массив по PRICE', this._tripPoints);
  //       break;
  //     case SortType.TIME:
  //       this._tripPoints.sort(compareTime);
  //       // console.log('отсортированный исходный массив по TIME', this._tripPoints);
  //       break;
  //     default:
  //       this._tripPoints = this._sourcedTripPoints.slice();
  //       // console.log('исходный масссив по DAY', this._tripPoints);
  //       break;
  //   }

  //   this._currentSort = sortType;
  // }

  _handleChangeTypeSort(sortType) {
    // console.log('обработчик', this);
    if (this._currentSort === sortType) {
      return;
    }

    // this._sortPoints(sortType);
    this._currentSort = sortType;

    this._clearTripBoard();
    this._renderTripBoard();
  }


  _renderSort() {
    // логика рендера сортировки точек
    if (this._sortCompanent !== null) {
      this._sortCompanent = null;
    }

    this._sortCompanent = new SortingView(this._currentSort);
    this._sortCompanent.setChangeSortHandler(this._handleChangeTypeSort);
    render(this._tripContainer, this._sortCompanent, RenderPosition.BEFOREEND);

  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута
    render(this._tripContainer, this._noPointCompanent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // рендер точки маршрута

    // const pointPresenter = new PointPresenter(this._listCompanent, this._handlePointChange, this._handleModeChange);
    const pointPresenter = new PointPresenter(this._listCompanent, this._handleViewAction, this._handleModeChange);
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
    // this._tripPoints
    //   .forEach((tripPoint) => this._renderPoint(tripPoint));
    this._getPoints()
      .forEach((point) => this._renderPoint(point));
  }

  _clearTripBoard({resetSortType = false} = {}) {

    // const taskCount = this._getTasks().length;

    // Object
    //   .values(this._pointPresenter)
    //   .forEach((presenter) => presenter.destroy());
    // this._pointPresenter = {};
    this._clearPointList();

    remove(this._sortCompanent);
    remove(this._noPointCompanent);

    // if (resetRenderedTaskCount) {
    //   this._renderedTaskCount = TASK_COUNT_PER_STEP;
    // } else {
    //   // На случай, если перерисовка доски вызвана
    //   // уменьшением количества задач (например, удаление или перенос в архив)
    //   // нужно скорректировать число показанных задач
    //   this._renderedTaskCount = Math.min(taskCount, this._renderedTaskCount);
    // }

    if (resetSortType) {
      this._currentSort = SortType.DAY;
    }
  }

  _renderTripBoard() {
    const isEmpty = this._getPoints().length === 0;

    if(isEmpty) {
      this._renderNoPoint();
      return;
    }
    // this._renderSort();

    this._renderPoints();
  }
}
