import dayjs from 'dayjs';
// import { getRandomInteger } from '../utils/common';
import { replaceString, findByKeyValue } from '../utils/common';
import { TYPE_POINT_TRIP, CITIES } from './const';
import SmartView from './smart';
import { options } from '../mock/offer';
import { destinations } from '../mock/destinations';
import { changeCheckboxState } from '../utils/point';
// import { countTheTotalAmount } from '../view/cost';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
// import ListPointsView from './list-point-trip';


const BLANK_POINT = {
  basePrice : null,
  dateBegin : dayjs(),
  dateEnd : null,
  destination : '',
  offer : '',
};

const createTypePointTemplate = () =>

  TYPE_POINT_TRIP.map((type) => `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`).join('');

const createCitiesTemplate = () => CITIES.map((city) => `<option value="${city}"></option>`).join('');

const createOfferPointTemplate = (data, isData) => {
  // debugger;
  const result = isData
    ? data.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceString(offer.title)}-1" type="checkbox" name="event-offer-${replaceString(offer.title)}" ${offer.isChecked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${replaceString(offer.title)}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')
    : '';
  return result;
};

const getPictures = (data, isData) => {
  const className = data.length < 5 ? ' ' : 'event__photos-container';
  return ( `<div class="${className}">
    <div class="event__photos-tape">
      ${isData ? data.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}"></img>`).join('') : ''}
    </div>
  </div>`);
};

const editPointTripTemplate = (point) => {
  const { basePrice, destination, offer, dateBegin, dateEnd, isBasePrice, isDateBegin, isDateEnd, isOffer, isDataOffer, isDestination, isDataDestination, isOfferType, isDestinationName } = point;
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" id="edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              ${isOfferType ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${offer.type}.png" alt="Event type icon">` : ''}
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTypePointTemplate()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${isOfferType ? offer.type : ''}
            </label>
            ${isDestinationName ? `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">`
      : '<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">'}
            <datalist id="destination-list-1">
              ${createCitiesTemplate()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            ${isDateBegin ? `<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateBegin).format('DD/MM/YY')} ${dayjs(dateBegin).format('HH:mm')}">` : ''}
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            ${isDateEnd ? `<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateEnd).format('DD/MM/YY')} ${dayjs(dateEnd).format('HH:mm')}">` : ''}
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${isBasePrice ? basePrice : ''}">
          </div>
            ${!isBasePrice ? `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>` : `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${isOffer ? createOfferPointTemplate(offer.offers, isDataOffer) : ''}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${isDestination ? destination.description.join(' ') : ''}</p>

                ${isDestination ? getPictures(destination.pictures, isDataDestination) : ''}

          </section>
        </section>
      </form>
    </li>`
  );
};

export default class PointTripEdit extends SmartView {

  constructor (point = BLANK_POINT) {
    super();

    this._data = PointTripEdit.parsePointToData(point);
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._changeOfferTypeEditHandler = this._changeOfferTypeEditHandler.bind(this);
    this._basePriceEditHandler = this._basePriceEditHandler.bind(this);
    this._destinationNameEditHandler = this._destinationNameEditHandler.bind(this);
    this._clickOfferhandler = this._clickOfferhandler.bind(this);
    this._dateBeginChangeHandler = this._dateBeginChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);

    this._listOffer = this.getElement().querySelector('.event__type-list');
    this._nameTypeMarkup = this.getElement().querySelector('.event__type-output');
    this._typeIcon = this.getElement().querySelector('.event__type-icon');

    this._setInnerHandlers();
    this._setDatepicker();

  }

  _setDatepicker() {

    if (this._datepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepicker.destroy();
      this._datepicker = null;
    }

    const compareDate = (a, b) => new Date(a) - new Date(b);

    const timeInputs = this.getElement().querySelectorAll('.event__input--time');
    timeInputs.forEach((element) => {
      this._datapicker = flatpickr(element, {
        dateFormat: 'd/m/y H:S',
        defaultDate: null,
        onChange: (selectedDate) => {
          if(element === timeInputs[0]) {
            if(compareDate(this._data.dateEnd, selectedDate) < 0) {
              element.setCustomValidity('Дата начала не может быть меншьше даты окончания поездки');
            } else {
              element.setCustomValidity('');
              this._dateBeginChangeHandler(selectedDate);
            }
          } else if(element === timeInputs[1]){
            this._dateEndChangeHandler(selectedDate);
          }
        },
      });
    });
  }

  reset(point) {
    this.updateData(
      PointTripEdit.parsePointToData(point),
    );
  }

  getTemplate () {
    return editPointTripTemplate(this._data);
  }

  _formSubmitHandler (evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointTripEdit.parseDataToPoint(this._data));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setDatepicker();
  }

  _setInnerHandlers() {
    this._types = this.getElement().querySelectorAll('.event__type-input');
    this._types.forEach((element) => {
      element.addEventListener('change', this._changeOfferTypeEditHandler);
    });
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._basePriceEditHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationNameEditHandler);

    // list offers

    this._offers = this.getElement().querySelectorAll('.event__offer-checkbox');
    this._offers.forEach((element) => {
      element.addEventListener('click', this._clickOfferhandler);
    });
  }

  _basePriceEditHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _destinationNameEditHandler(evt) {
    evt.preventDefault();
    const nameCity = evt.target.value;
    const updateDestinationName = {
      destination: Object.assign(
        {},
        this._data.destination,
        findByKeyValue(destinations, 'name', nameCity),
      ),
    };
    this.updateData(updateDestinationName, false);
  }

  _changeOfferTypeEditHandler(evt) {

    // debugger;
    evt.preventDefault();
    const nameType = evt.target.value;
    // console.log('выбранный тип', evt.target.value);
    // console.log('все офферы', options);
    const updateOfferType = {
      offer: Object.assign(
        {},
        this._data.offer,
        findByKeyValue(options, 'type', nameType),
      ),
    };
    this._listOffer.style.display = 'none';
    this._nameTypeMarkup.innerHTML = nameType;
    this._typeIcon.src = `img/icons/${nameType}.png`;

    this.updateData(updateOfferType, false);
  }

  _clickOfferhandler(evt) {
    evt.preventDefault();
    const element = evt.target;
    let checkboxValue = null;
    if(element.checked) {
      checkboxValue = true;
    } else {
      checkboxValue = false;
    }
    const updateCheckboxChecked = {
      offer: Object.assign(
        {},
        this._data.offer,
        changeCheckboxState(this._data.offer.offers, evt.target.name, checkboxValue),
      ),
    };
    this.updateData(updateCheckboxChecked, false);
  }

  _dateBeginChangeHandler([userDate]) {
    this.updateData({
      dateBegin: userDate,
    });
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      dateEnd: userDate,
    });
  }

  setFormSubmitHandler (callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('#edit').addEventListener('submit', this._formSubmitHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isBasePrice : point.basePrice !== null,
        isDateEnd : point.dateEnd !== null,
        isDateBegin: point.dateBegin !== null,
        isOffer: point.offer !== '', // посмотреть что будет при null
        isDataOffer: point.offer.offers.length !== 0,
        isDestination: point.destination !== '',
        isDataDestination: point.destination.pictures.length !== 0,
        isOfferType: point.offer.type !== undefined,
        isDestinationName: point.destination.name !== undefined,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if(!data.isBasePrice) {
      data.isBasePrice = null;
    }

    if(!data.isDateBegin) {
      data.isDateBegin = null;
    }

    if(!data.isDateEnd) {
      data.isDateEnd = null;
    }

    if(!data.isOffer) {
      data.isOffer = '';
    }

    if(!data.isDataOffer) {
      data.isDataOffer = 0;
    }

    if(!data.isDestination) {
      data.isDestination = '';
    }

    if(!data.isDataDestination) {
      data.isDataDestination = 0;
    }

    if(!data.isOfferType) {
      data.isOfferType = undefined;
    }

    if(!data.isDestinationName) {
      data.isDestinationName = undefined;
    }

    delete data.isBasePrice;
    delete data.isDateBegin;
    delete data.isDateEnd;
    delete data.isOffer;
    delete data.isDataOffer;
    delete data.isDestination;
    delete data.isDataDestination;
    delete data.isOfferType;
    delete data.isDestinationName;
    // console.log(data);
    return data;
  }
}
