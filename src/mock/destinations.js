import { getRandomInteger } from '../utils/common';
import { TRIP_DESCRIPTION, CITIES } from '../view/const';
import { dataCopy } from '../utils/common';

const COUNT_INITIAL = 0;
const COUNT_MIN = 1;
const COUNT_MAX = 5;


const pictures = {
  src: 'src',
  description: 'description',
};

export const getDescription = (array) => {
  const data = [];
  for (let i = 0; i < getRandomInteger(COUNT_MIN, COUNT_MAX); i++) {
    data.push(array[i]);
  }
  return data;
};

//Получит картинки с описанием

export const getPictures = () => {
  const data = [];
  for (let i = 0; i < getRandomInteger(COUNT_INITIAL, COUNT_MAX); i++) {
    data.push({

      // динамически не смог получить картинку, поэтому ставлю заглушку в виде статики

      [pictures.src] : 'https://fastly.picsum.photos/id/415/248/152.jpg?hmac=XAnvJhZoHP_PMT_-Dx-dpgi5ome0sgTQE90ueZs4Vj0',
      [pictures.description] : TRIP_DESCRIPTION[getRandomInteger(COUNT_INITIAL, TRIP_DESCRIPTION.length)],
    });
  }
  return data;
};

const CopyDataCitiesPointTrip = dataCopy(CITIES);

// Описываем содержимое объекта Destinations

const createDestinations = () => {
  const name = CopyDataCitiesPointTrip.shift();
  const destination = {
    name,
    description: getDescription(TRIP_DESCRIPTION),
    pictures:  [...getPictures()],
  };
  return destination;
};

const createAllDestinations = () => new Array(CITIES.length).fill().map(() => createDestinations());

export const destinations = createAllDestinations();
