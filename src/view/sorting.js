import AbstractView from './abstract';
import { sortType } from './const';

const createSortingTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event data-sort-type="${sortType.DAY}">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${sortType.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${sortType.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
`;

export default class Sorting extends AbstractView {
  constructor () {
    super();
    this._sortChangeTypeHandler = this._sortChangeTypeHandler.bind(this);
  }

  getTemplate () {
    return createSortingTemplate();
  }

  _sortChangeTypeHandler(evt) {
    // console.dir(evt.target);
    if(evt.target.className !== 'trip-sort__btn'){
      return;
    }

    evt.preventDefault();
    this._callback.sortChange(evt.target.dataset.sortType);
  }

  setChangeSortHandler(callback) {
    this._callback.sortChange = callback;
    this.getElement().addEventListener('click', this._sortChangeTypeHandler);
  }
}
