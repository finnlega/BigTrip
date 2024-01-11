// import dayjs from 'dayjs';
import { getRandomInteger, dataCopy, shuffleArray } from '../utils/common';
import { TYPE_POINT_TRIP, TITLES } from '../view/const';

const OFFER_COUNT = 10;
const OFFER_MIN = 0;
const OFFER_MAX = 5;
const PRICE_MIN_VALUE_OFFER = 1;
const PRICE_MAX_VALUE_OFFER = 500;

// Структура данных offer

const offers = {
  title: 'title',
  price: 'price',
  isChecked: 'isChecked',
};

// Сгенерируем дополнительные опции

const getSomeOffers = () => {
  const uniqueTitles = new Set();
  const data = [];
  const indexValue = getRandomInteger(OFFER_MIN, OFFER_MAX);
  for (let i = 0; i < indexValue; i++) {
    let title = shuffleArray(TITLES);

    while (uniqueTitles.has(title)) {
      title = shuffleArray(TITLES);
    }
    uniqueTitles.add(title);
    data.push({
      [offers.title] : title,
      [offers.price] : getRandomInteger(PRICE_MIN_VALUE_OFFER, PRICE_MAX_VALUE_OFFER),
      [offers.isChecked] : getRandomInteger(0,1),
    });
  }
  return data;
};

// Копируем содержимое массива typePointTrip

const CopyDataTypePointTrip = dataCopy(TYPE_POINT_TRIP);

// Описываем содержимое объекта offer

const createOffer = () => {
  const type = CopyDataTypePointTrip.shift();
  const offer = {
    type,
    offers:  [...getSomeOffers()],
  };
  return offer;
};

// создаем дополнительные опции по типу (type)

const createAllOffers = () => new Array(OFFER_COUNT).fill().map(() => createOffer());

export const options = createAllOffers();

