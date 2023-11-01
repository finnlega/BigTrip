import AbstractView from './abstract';

const createListPointTripTemplate = () => `<ul class="trip-events__list">
</ul>`;

export default class ListPoints extends AbstractView {

  getTemplate() {
    return createListPointTripTemplate();
  }
}


