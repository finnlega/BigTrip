import dayjs from 'dayjs';
import { getRandomInteger } from './common';
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

// Функция для сравнения дат

export const compareDates = (a, b) => new Date(a.dateBegin) - new Date(b.dateBegin);