// import dayjs from 'dayjs';
import { сompareType, getDateBegin, getDateEnd } from '../view/utils';
import { getRandomInteger, getElementFromArray } from '../utils/common';
import { TYPE_POINT_TRIP, TRIP_DESCRIPTION} from '../view/const';
import { options } from './offer';
import { getDescription, getPictures } from './picture';

const PRICE_MIN = 100;
const PRICE_MAX = 500;

const cities = [ 'Amsterdam', 'Chamonix', 'Geneva', 'Tokyo', 'Lisbon' ];

const generatePoint = () => {
  const dateBegin = getDateBegin();
  const dateEnd = getDateEnd(dateBegin);
  const type = getElementFromArray(TYPE_POINT_TRIP);

  return ({
    basePrice: getRandomInteger(PRICE_MIN, PRICE_MAX),
    dateBegin: dateBegin.toDate(),
    dateEnd: dateEnd.toDate(),
    destination: {description: getDescription(TRIP_DESCRIPTION), name: getElementFromArray(cities), pictures:[ ...getPictures()]},
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offer: сompareType(options, type),
  });
};

export { generatePoint };
