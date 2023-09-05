import dayjs from 'dayjs';

const getElement = (array) => {
  const offers = array.map((element) =>
    `<li class="event__offer">
      <span class="event__offer-title">${element.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${element.price}</span>
    </li>`);
  return offers.join('');
};

const convertDate = (date) => {
  const timeFromDate = dayjs(date).format('HH:mm');
  return timeFromDate;
};

const eventduration = (dateBegin, dateEnd) => {

  // Преобразуем даты в объекты dayjs
  const startDate = dayjs(dateBegin);
  const endDate = dayjs(dateEnd);

  // Рассчитываем разницу в минутах между датами
  const minutesDiff = endDate.diff(startDate, 'minute');

  // Разбиваем разницу на дни, часы и минуты
  const days = Math.floor(minutesDiff / 1440);
  const remainingMinutes = minutesDiff % 1440;
  const hours = Math.floor(remainingMinutes / 60);
  const minutes = remainingMinutes % 60;

  // Форматируем результат в зависимости от условий
  if (days === 0) {
    if (hours === 0) {
      if (minutes < 10) {
        return `0${minutes}M`;
      }
      return `${minutes}M`;
    } else {
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}H ${formattedMinutes}M`;
    }
  } else {
    const formattedDays = days < 10 ? `0${days}` : days;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    if (hours === 0 && minutes === 0) {
      return `${formattedDays}D`;
    } else {
      return `${formattedDays}D ${formattedHours}H ${formattedMinutes}M`;
    }
  }
};

const createPointTripTemplate = (point) => {
  // debugger;
  const { basePrice, type, destination, offers, dateBegin, dateEnd } = point;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${dayjs(dateEnd).format('MMM DD')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${convertDate(dateBegin)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${convertDate(dateEnd)}</time>
          </p>
          <p class="event__duration">${eventduration(dateBegin, dateEnd)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getElement(offers)}
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export { createPointTripTemplate };
//
