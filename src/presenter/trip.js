import SortingView from '../view/sorting';
import ListPointsView from '../view/list-point-trip';
import NoPointTripView from '../view/list-empty';
import PointTripView from '../view/point-trip';
import PointTripEditView from '../view/edit-point';
import { render, RenderPosition, replace } from '../utils/render';


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortCompanent = new SortingView();
    this._listCompanent = new ListPointsView();
    this._noPointCompanent = new NoPointTripView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderSort();
    render(this._sortCompanent, this._listCompanent, RenderPosition.BEFOREEND);

    this._renderTripBoard();
  }

  _renderSort() {
    // логика рендера сортировки точек
    render(this._tripContainer, this._sortCompanent, RenderPosition.BEFOREEND);
  }

  _renderNoPoint() {
    // рендер заглушки если нет точек маршрута
    render(this._tripContainer, this._noPointCompanent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    // рендер точки маршрута
    const pointCompanent = new PointTripView(point);
    const pointEditComponent = new PointTripEditView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointCompanent);
    };

    const replaceFormToCard = () => {
      replace(pointCompanent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if(evt.key ==='ESC' || evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown',onEscKeyDown);
      }
    };

    pointCompanent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {

      replaceFormToCard();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(this._listCompanent, pointCompanent, RenderPosition.BEFOREEND);
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

