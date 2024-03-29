import PointTripView from '../view/point-trip';
import PointTripEditView from '../view/edit-point';
// import OfferView from '../view/offer';
import { replace, render, RenderPosition, remove } from '../utils/render';
import { UserAction, UpdateType } from '../view/const';
import { isDatesEqual } from '../utils/point';
// import { offers } from '../main';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDITING',
};

export default class Point {
  constructor(pointListContainer, handleChangeData, changeMode, allOffers) {
    this._pointListContainer = pointListContainer;
    this._handleChangeData = handleChangeData;
    this._changeMode = changeMode;
    this._offers = allOffers;
    // console.log('Офферы POINT', this._offers);

    this._pointCompanent = null;
    this._pointEditCompanent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlerOnEscKeyDown = this._handlerOnEscKeyDown.bind(this);
    this._handleOnFavoriteClick = this._handleOnFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(point) {

    this._point = point;

    const prevPointCompanent = this._pointCompanent;
    const prevPointEditCompanent = this._pointEditCompanent;

    this._pointCompanent = new PointTripView(point);
    this._pointEditCompanent = new PointTripEditView(point,  this._offers);

    this._pointCompanent.setEditClickHandler(this._handleEditClick);
    this._pointEditCompanent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditCompanent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointCompanent.setFavoriteClickhandler(this._handleOnFavoriteClick);

    if (prevPointCompanent === null || prevPointEditCompanent === null) {
      render(this._pointListContainer, this._pointCompanent, RenderPosition.BEFOREEND);
      return;
    }

    if(this._mode === Mode.DEFAULT) {
      replace(this._pointCompanent, prevPointCompanent);
    }

    if(this._mode === Mode.EDIT) {
      replace(this._pointEditCompanent, prevPointEditCompanent);
    }

    remove(prevPointCompanent);
    remove(prevPointEditCompanent);
  }

  // очистка точек маршрута

  destroy() {
    remove(this._pointCompanent);
    remove(this._pointEditCompanent);
  }

  resetView() {
    if(this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm () {
    replace(this._pointEditCompanent, this._pointCompanent);
    document.addEventListener('keydown', this._handlerOnEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDIT;
  }

  _replaceFormToCard () {
    // debugger;
    replace(this._pointCompanent, this._pointEditCompanent);
    document.addEventListener('keydown', this._handlerOnEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _handlerOnEscKeyDown (evt) {
    if(evt.key ==='ESC' || evt.key === 'Escape') {
      evt.preventDefault();
      this._pointEditCompanent.reset(this._point);
      this._replaceFormToCard();
      document.removeEventListener('keydown', this._handlerOnEscKeyDown);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(update) {
    // debugger;
    const isMinorUpdate = !isDatesEqual(this._point.dateBegin, update.dateBegin) ||
    !isDatesEqual(this._point.dateEnd, update.dateEnd);
    this._handleChangeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      // UpdateType.MINOR,
      update,
    );
    this._replaceFormToCard();
  }

  _handleDeleteClick(point) {

    this._handleChangeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  _handleOnFavoriteClick() {
    this._handleChangeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}
