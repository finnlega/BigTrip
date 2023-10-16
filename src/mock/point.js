// import dayjs from 'dayjs';
import { getRandomInteger, generateType, сompareType, getDateBegin, getDateEnd } from '../view/utils';
import { TYPE_POINT_TRIP, TRIP_DESCRIPTION} from '../view/const';
import { options } from './offer';
import { getDescription, getPictures } from './picture';

const PRICE_MIN = 100;
const PRICE_MAX = 500;

const cities = [ 'Amsterdam', 'Chamonix', 'Geneva', 'Tokyo', 'Lisbon' ];

const generatePoint = () => {
  const dateBegin = getDateBegin();
  const dateEnd = getDateEnd(dateBegin);
  const type = generateType(TYPE_POINT_TRIP);

  return ({
    basePrice: getRandomInteger(PRICE_MIN, PRICE_MAX),
    dateBegin: dateBegin.toDate(),
    dateEnd: dateEnd.toDate(),
    destination: {description: getDescription(TRIP_DESCRIPTION), name: generateType(cities), pictures:[ ...getPictures()]},
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offer: сompareType(options, type),
  });
};

export { generatePoint };