import dayjs from 'dayjs';

export const getTripInfo = (array) => {
  for (let i = 0; i < array.length-1; i++) {
    const result = array.length > 3 ? `${array[0].destination.name} &mdash; ... &mdash; ${array[array.length-1].destination.name}` :
      `${array[0].destination.name} &mdash; ${array[1].destination.name} &mdash; ${array[array.length-1].destination.name}`;
    return result;
  }
};

export const getDatesTrip = (array) => {
  for (let i = 0; i < array.length-1; i++) {
    const result = `${dayjs(array[0].dateBegin).format('MMM DD')} &mdash; ${dayjs(array[array.length-1].dateEnd).format('DD')}`;
    return result;
  }
};

const createTripInfoTemplate = (info, dates) =>
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${info}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>
  </section>`;

export { createTripInfoTemplate };
