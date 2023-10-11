// import dayjs from 'dayjs';
import { getRandomInteger, generateType, сompareType, getDateBegin, getDateEnd } from '../view/utils';
import { TYPE_POINT_TRIP, TRIP_DESCRIPTION} from '../view/const';
import { options } from './offer';
import { getDescription, getPictures } from './picture';

const PRICE_MIN = 100;
const PRICE_MAX = 500;

const cities = [ 'Amsterdam', 'Chamonix', 'Geneva', 'Tokyo', 'Lisbon' ];
// const titles = ['Choose meal', 'Upgrade to comfort class', 'Book tickets', 'Lunch in city', 'Rent a car', 'Add luggage', 'Switch to comfort', 'Add breakfast', 'Upgrade to a business class', 'Choose the radio station' ];
// const tripDescriptions = [
//   'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   'Cras aliquet varius magna, non porta ligula feugiat eget.',
//   'Fusce tristique felis at fermentum pharetra.',
//   'Aliquam id orci ut lectus varius viverra.',
//   'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
//   'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
//   'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
//   'Sed sed nisi sed augue convallis suscipit in sed felis.',
//   'Aliquam erat volutpat.',
//   'Nunc fermentum tortor ac porta dapibus.',
//   'In rutrum ac purus sit amet tempus.' ];

// // Структура данных offer

// const offers = {
//   title: 'title',
//   price: 'price',
// };

// // Сгенерируем дополнительные опции

// const getSomeOffers = () => {

//   const data = [];
//   for (let i = 0; i < getRandomInteger(0, 5); i++) {
//     data.push({
//       [offers.title] : generateType(TITLES),
//       [offers.price] : getRandomInteger(1, 500),
//     });
//   }
//   return data;
// };

// // Копируем содержимое массива typePointTrip

// const CopyDataTypePointTrip = dataCopy(TYPE_POINT_TRIP);

// // Описываем содержимое объекта offer

// const createOffer = () => {
//   const type = CopyDataTypePointTrip.shift();
//   const offer = {
//     type,
//     offers: [...getSomeOffers()],
//   };
//   return offer;
// };

// // создаем дополнительные опции по типу (type)

// const createAllOffers = () => new Array(10).fill().map(() => createOffer());

// const options = createAllOffers();

// Часть структуры данных информация о месте назначения:

// const pictures = {
//   src: 'src',
//   description: 'description',
// };

// const getDescription = (array) => {
//   const data = [];
//   for (let i = 0; i < getRandomInteger(1, 5); i++) {
//     data.push(array[i]);
//   }
//   return data;
// };

// //Получит картинки с описанием

// const getPictures = () => {
//   const data = [];
//   for (let i = 0; i < getRandomInteger(0, 5); i++) {
//     data.push({

//       // динамически не смог получить картинку, поэтому ставлю заглушку в виде статики

//       [pictures.src] : 'https://fastly.picsum.photos/id/415/248/152.jpg?hmac=XAnvJhZoHP_PMT_-Dx-dpgi5ome0sgTQE90ueZs4Vj0',
//       [pictures.description] : tripDescriptions[getRandomInteger(0, 10)],
//     });
//   }
//   return data;
// };

// const getDateBegin = () => {
//   const daysGap = getRandomInteger(-4, 4);
//   const hoursGap = getRandomInteger(0, 24);
//   const minuteGap = getRandomInteger(0, 60);
//   const secondGap = getRandomInteger(0, 60);
//   const date = dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minuteGap, 'minute').add(secondGap, 'second');
//   return date;
// };

// const getDateEnd = (date) => {
//   const daysGap = getRandomInteger(0, 3);
//   const hoursGap = getRandomInteger(0, 24);
//   const minuteGap = getRandomInteger(0, 60);
//   const secondGap = getRandomInteger(0, 60);
//   const dateEnd = date.add(daysGap, 'day').add(hoursGap, 'hour').add(minuteGap, 'minute').add(secondGap, 'second');
//   return dateEnd;
// };

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
