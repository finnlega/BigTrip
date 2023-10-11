// import dayjs from 'dayjs';
import { getRandomInteger, dataCopy, generateType } from '../view/utils';
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
};

// Сгенерируем дополнительные опции

const getSomeOffers = () => {

  const data = [];
  for (let i = 0; i < getRandomInteger(OFFER_MIN, OFFER_MAX); i++) {
    data.push({
      [offers.title] : generateType(TITLES),
      [offers.price] : getRandomInteger(PRICE_MIN_VALUE_OFFER, PRICE_MAX_VALUE_OFFER),
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
    offers: [...getSomeOffers()],
  };
  return offer;
};

// создаем дополнительные опции по типу (type)

const createAllOffers = () => new Array(OFFER_COUNT).fill().map(() => createOffer());

export const options = createAllOffers();
