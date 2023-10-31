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

const createOfferPointTemplate = (data) =>
  data.length !== 0 ? data.map((offer) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${replaceString(offer.title)}-1" type="checkbox" name="event-offer-${replaceString(offer.title)}" ${getRandomInteger(0,1) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${replaceString(offer.title)}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`).join('') : '';

const getPictures = (data) => {
  const className = data.length < 5 ? ' ' : 'event__photos-container';
  return ( `<div class="${className}">
    <div class="event__photos-tape">
      ${data.length !== 0 ? data.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}"></img>`).join('') : ''}
    </div>
  </div>`);
};

const editPointTripTemplate = (point) => {
  const { basePrice, destination, offer, dateBegin, dateEnd } = point;

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
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateBegin).format('DD/MM/YY')} ${dayjs(dateBegin).format('HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            ${dateEnd === null ? '' : `<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateEnd).format('DD/MM/YY')} ${dayjs(dateEnd).format('HH:mm')}">`}
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice !== null ? basePrice : ''}">
          </div>
            ${basePrice === null ? `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
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
              ${offer !== '' ? createOfferPointTemplate(offer.offers) : ''}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination !== '' ? destination.description.join() : ''}</p>

                ${destination !== '' ? getPictures(destination.pictures) : ''}

          </section>
        </section>
      </form>
    </li>`
  );
};

export default class PointTripEdit extends AbstractView {

  constructor (point = BLANK_POINT) {
    super();

    this._point = point;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);

  }

  getTemplate () {
    return editPointTripTemplate(this._point);
  }

  _formSubmitHandler (evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler (callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('#edit').addEventListener('submit', this._formSubmitHandler);
  }
}
