// Список офферов

export const getElement = (array) => {
  const offers = array.map((element) =>
    `<li class="event__offer">
      <span class="event__offer-title">${element.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${element.price}</span>
    </li>`);
  return offers.join('');
};
