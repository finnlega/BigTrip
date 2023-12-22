import AbstractView from './abstract';

// const filterPointsOnEmptyOffers = (data) => {

//   const result = data.filter((element) => element.offer.offers !== 0);
//   return result;
// };

// const getSumOffers = (data) => {
//   let total = 0;
//   const initialValue = 0;
//   const resultOffer = data.reduce((accumulator, currentValue) => accumulator + currentValue.price, initialValue);
//   total += resultOffer;
//   return total;
// };

export const countTheTotalAmount = (array) => {
  const initialValue = 0;
  const totalCheckedOffersPrice = array.reduce((sum, item) => {
    const checkedOffers = item.offer.offers.filter((offer) => offer.isChecked === 1);
    const checkedOffersPrice = checkedOffers.reduce((offersSum, offer) => offersSum + offer.price, initialValue);
    return sum + checkedOffersPrice;
  }, initialValue);
  // const summaOffers = allOffers.map((element) => getSumOffers(element.offer.offers));
  // const sumFirst = summaOffers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
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

// const arr = [
//   { baseprice: 15, offer: { offers: [{ price: 10, isChecked: 1 }, { price: 20, isChecked: 0 }, { price: 30, isChecked: 1 }] } },
//   { baseprice: 35, offer: { offers: [{ price: 15, isChecked: 0 }, { price: 15, isChecked: 0 }, { price: 15, isChecked: 1 }] } },
// ];

// // Сложение baseprice всех объектов
// const totalBasePrice = arr.reduce((sum, item) => sum + item.baseprice, 0);

// // Сложение offers.price где isChecked === 1
// const totalCheckedOffersPrice = arr.reduce((sum, item) => {
//   const checkedOffers = item.offer.offers.filter((offer) => offer.isChecked === 1);
//   const checkedOffersPrice = checkedOffers.reduce((offersSum, offer) => offersSum + offer.price, 0);
//   return sum + checkedOffersPrice;
// }, 0);

// console.log('Total Base Price:', totalBasePrice);
// console.log('Total Checked Offers Price:', totalCheckedOffersPrice);
