import PointTripEditView from '../view/edit-point';
import { render, RenderPosition, remove } from '../utils/render';
import { UserAction, UpdateType } from '../view/const';
import { nanoid } from 'nanoid';

export default class PointNew {
  constructor(pointListContainer, handleChangeData) {
    this._pointListContainer = pointListContainer;
    this._handleChangeData = handleChangeData;

    this._pointEditCompanent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlerOnEscKeyDown = this._handlerOnEscKeyDown.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {

    if(this._pointEditCompanent !== null) {
      return;
    }

    this._pointEditCompanent = new PointTripEditView();

    this._pointEditCompanent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditCompanent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditCompanent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._handlerOnEscKeyDown);
  }

  destroy() {
    if(this._pointEditCompanent === null) {
      return;
    }
    remove(this._pointEditCompanent);
    this._pointEditCompanent = null;

    document.removeEventListener('keydown', this._handlerOnEscKeyDown);
  }

  _handlerOnEscKeyDown (evt) {
    if(evt.key ==='ESC' || evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleFormSubmit(point) {
    this._handleChangeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
