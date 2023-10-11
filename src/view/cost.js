
const filterPointsOnEmptyOffers = (data) => {
  const result = data.filter((element) => element.offer.offers.length !== 0);
  return result;
};

const getSumOffers = (data) => {
  let total = 0;
  const initialValue = 0;
  const resultOffer = data.reduce((accumulator, currentValue) => accumulator + currentValue.price, initialValue);
  total += resultOffer;
  return total;
};

export const countTheTotalAmount = (array) => {
  const initialValue = 0;
  const allOffers = filterPointsOnEmptyOffers(array);

  const summaOffers = allOffers.map((element) => getSumOffers(element.offer.offers));
  const sumFirst = summaOffers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
  const sumSecond = array.reduce((accumulator, currentValue) => accumulator + currentValue.basePrice, initialValue);

  const totalSum = sumFirst + sumSecond;
  return totalSum;
};

export const createCostTemplate = (cost) => `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>`;

