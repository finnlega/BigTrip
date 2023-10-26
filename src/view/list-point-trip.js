import { createElement } from './utils';
const createListPointTripTemplate = () => `<ul class="trip-events__list">
</ul>`;

export default class ListPoints {
  constructor () {
    this._element = null;
  }

  getTemplate() {
    return createListPointTripTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


