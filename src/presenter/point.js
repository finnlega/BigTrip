import PointTripView from '../view/point-trip';
import PointTripEditView from '../view/edit-point';
import { replace, render, RenderPosition } from '../utils/render';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointCompanent = null;
    this._pointEditCompanent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlerOnEscKeyDown = this._handlerOnEscKeyDown.bind(this);
  }

  init(point) {

    this._point = point;

    this._pointCompanent = new PointTripView(point);
    this._pointEditCompanent = new PointTripEditView(point);

    this._pointCompanent.setEditClickHandler(this._handleEditClick);
    this._pointEditCompanent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._pointListContainer, this._pointCompanent, RenderPosition.BEFOREEND);

  }

  _replaceCardToForm () {
    replace(this._pointEditCompanent, this._pointCompanent);
    document.addEventListener('keydown', this._handlerOnEscKeyDown);
  }

  _replaceFormToCard () {
    replace(this._pointCompanent, this._pointEditCompanent);
    document.addEventListener('keydown', this._handlerOnEscKeyDown);
  }

  _handlerOnEscKeyDown (evt) {
    if(evt.key ==='ESC' || evt.key === 'Escape') {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener('keydown', this._handlerOnEscKeyDown);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
