import AbstractView from './abstract';

// Список офферов

const getOffer = (array) => {
  const offers = array.map((element) => {
    if(element.isChecked === 1) {
      return `<li class="event__offer">
        <span class="event__offer-title">${element.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${element.price}</span>
      </li>`;
    } return '';
  });
  return offers.join('');
};

export default class Offer extends AbstractView {
  constructor(offer) {
    super();
    this._offer = offer;
  }

  getTemplate() {
    return getOffer(this._offer);
  }
}
