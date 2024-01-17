// import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { getDateBegin, getDateEnd } from '../utils/point';
import { getRandomInteger, getElementFromArray, findByKeyValue } from '../utils/common';
import { TYPE_POINT_TRIP, CITIES} from '../view/const';
import { options } from './offer';
import { destinations } from './destinations';

const PRICE_MIN = 100;
const PRICE_MAX = 500;

// console.log(destinations);

const generatePoint = () => {
  const dateBegin = getDateBegin();
  const dateEnd = getDateEnd(dateBegin);
  const type = getElementFromArray(TYPE_POINT_TRIP);
  const nameCity = getElementFromArray(CITIES);

  return ({
    id: nanoid(),
    basePrice: getRandomInteger(PRICE_MIN, PRICE_MAX),
    dateBegin: dateBegin.toDate(),
    dateEnd: dateEnd.toDate(),
    destination: findByKeyValue(destinations, 'name', nameCity),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offer: findByKeyValue(options, 'type', type),
  });
};

export { generatePoint };
