import AbstractView from './abstract';

const createNoPointTripTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPointTrip extends AbstractView {

  getTemplate() {
    return createNoPointTripTemplate();
  }
}

