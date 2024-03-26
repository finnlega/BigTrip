import AbstractView from './abstract';

export const countTheTotalAmount = (array) => {
  const initialValue = 0;
  const totalCheckedOffersPrice = array.reduce((sum, item) => {
    const checkedOffers = item.offer.offers.filter((offer) => offer.isChecked === 1);
    const checkedOffersPrice = checkedOffers.reduce((offersSum, offer) => offersSum + offer.price, initialValue);
    return sum + checkedOffersPrice;
  }, initialValue);
  const totalBasePrice = array.reduce((accumulator, currentValue) => accumulator + currentValue.basePrice, initialValue);

  const totalSum = totalCheckedOffersPrice + totalBasePrice;
  return totalSum;
};

const createCostTemplate = (cost) => `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`;

export default class Cost extends AbstractView {

  constructor(cost) {
    super();
    this._cost = cost;
  }

  getTemplate() {
    return createCostTemplate(this._cost);
  }
}
