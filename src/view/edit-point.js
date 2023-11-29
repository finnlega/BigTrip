import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';
import { replaceString } from '../utils/common';
import { TYPE_POINT_TRIP } from './const';
import AbstractView from './abstract';

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

const createCitiesTemplate = () => {
  const cities = [ 'Amsterdam', 'Chamonix', 'Geneva', 'Tokyo', 'Lisbon' ];
  return cities.map((city) => `<option value="${city}"></option>`).join('');
};

const createOfferPointTemplate = (data, isData) => {
  // debugger;
  const result = isData
    ? data.map((offer) => `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceString(offer.title)}-1" type="checkbox" name="event-offer-${replaceString(offer.title)}" ${getRandomInteger(0,1) ? 'checked' : ''}>
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
  const { basePrice, destination, offer, dateBegin, dateEnd, isBasePrice, isDateBegin, isDateEnd, isOffer, isDataOffer, isDestination, isDataDestination } = point;
  console.log(offer);
  // debugger;
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" id="edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              ${offer.type !== undefined ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${offer.type}.png" alt="Event type icon">` : ''}
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
              ${offer.type !== undefined ? offer.type : ''}
            </label>
            ${destination.name !== undefined ? `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">`
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
            <p class="event__destination-description">${isDestination ? destination.description.join() : ''}</p>

                ${isDestination ? getPictures(destination.pictures, isDataDestination) : ''}

          </section>
        </section>
      </form>
    </li>`
  );
};

export default class PointTripEdit extends AbstractView {

  constructor (point = BLANK_POINT) {
    super();

    this._data = PointTripEdit.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);

  }

  getTemplate () {
    return editPointTripTemplate(this._data);
  }

  _formSubmitHandler (evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointTripEdit.parseDataToPoint(this._data));
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
        // point: console.log(point),
        isOffer: point.offer !== '', // посмотреть что будет при null
        isDataOffer: point.offer.offers.length !== 0,
        isDestination: point.destination !== '',
        isDataDestination: point.destination.pictures.length !== 0,
        // isDueDate: task.dueDate !== null,
        // isRepeating: isTaskRepeating(task.repeating),
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
    // if (!data.isDueDate) {
    //   data.dueDate = null;
    // }

    // if (!data.isRepeating) {
    //   data.repeating = {
    //     mo: false,
    //     tu: false,
    //     we: false,
    //     th: false,
    //     fr: false,
    //     sa: false,
    //     su: false,
    //   };
    // }

    delete data.isBasePrice;
    delete data.isDateBegin;
    delete data.isDateEnd;
    delete data.isOffer;
    delete data.isDataOffer;
    delete data.isDestination;
    delete data.isDataDestination;
    return data;
  }
}
