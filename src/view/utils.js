import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// // Вернет случайное число

// export const getRandomInteger = (a = 0, b = 1) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.floor(lower + Math.random() * (upper - lower + 1));
//   return result;
// };

// // Вернет элемент из массива случайным образом

// export const getElementFromArray = (array) => {
//   const randomIndex = getRandomInteger(0, array.length - 1);
//   return array[randomIndex];
// };

// export const shuffleArray = (currentArray) => {
//   const array = currentArray.slice();
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
//     const initialElement = array[array.length-1];  // замену будем делать через дополнительную переменную
//     array[array.length-1] = array[j];
//     array[j] = initialElement;
//   }
//   const randomIndex = getRandomInteger(0, array.length - 1);
//   const item = array[randomIndex];
//   return item;
// };

// // Копирует массив

// export const dataCopy = (array) => {
//   const data = array.slice();
//   return data;
// };

// конвертация даты

export const convertDate = (date) => {
  const timeFromDate = dayjs(date).format('HH:mm');
  return timeFromDate;
};

// продолжительность времени в днях, часах, минутах затрачиваемых на точку маршрута

export const eventduration = (dateBegin, dateEnd) => {

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

// Выберет даты, которые находятся в прошлом периоде до текущей даты

export const isDateInPast = (date) => dayjs().isAfter(date);

// Выберет даты, которые запланированы на будущий период.

export const isDateInFuture = (date) => dayjs().isBefore(date);

// Работа со строкой

export const replaceString = (string) => {
  const index = string.lastIndexOf(' ');
  return string.slice(index + 1);
};

// Функция для сравнения дат

export const compareDates = (a, b) => new Date(a.dateBegin) - new Date(b.dateBegin);


// Найдем по ключу обьект

export const сompareType = (array, key) => {
  const matching = array.find((item) => item.type === key);
  return matching;
};

export const getDateBegin = () => {
  const daysGap = getRandomInteger(-4, 4);
  const hoursGap = getRandomInteger(0, 24);
  const minuteGap = getRandomInteger(0, 60);
  const secondGap = getRandomInteger(0, 60);
  const date = dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minuteGap, 'minute').add(secondGap, 'second');
  return date;
};

export const getDateEnd = (date) => {
  const daysGap = getRandomInteger(0, 3);
  const hoursGap = getRandomInteger(0, 24);
  const minuteGap = getRandomInteger(0, 60);
  const secondGap = getRandomInteger(0, 60);
  const dateEnd = date.add(daysGap, 'day').add(hoursGap, 'hour').add(minuteGap, 'minute').add(secondGap, 'second');
  return dateEnd;
};
