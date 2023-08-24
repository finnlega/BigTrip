const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const typePointsTrip = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const cities = [ 'Amsterdam', 'Chamonix', 'Geneva' ];
const titles = ['Choose meal', 'Upgrade to comfort class', 'Book tickets', 'Lunch in city', 'Rent a car', 'Add luggage', 'Switch to comfort', 'Add breakfast' ];
const tripDescriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.' ];

const generateType = (array) => {

  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

// Структура данных offer

const offers = {
  title: 'title',
  price: 'price',
};

const getSomeOffers = () => {
  // debugger;
  const data = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    data.push({
      [offers.title] : generateType(titles),
      [offers.price] : getRandomInteger(1, 500),
    });
  }
  return data;
};

// Структура данных информация о месте назначения:

const pictures = {
  src: 'src',
  description: 'description',
};

// Сгенерируем картинки

// const getSrc = () => {
//   const data = [];
//   for (let i = 0; i < getRandomInteger(1, 3); i++) {
//     data.push(`http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`);
//   }
//   return data;
// };

const getDescription = (array) => {
  // debugger;
  const data = [];
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    data.push(array[i]);
  }
  return data;
};

console.log(getDescription(tripDescriptions));

const getPictures = () => {
  // debugger;
  const data = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    data.push({
      [pictures.src] : `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`,
      [pictures.description] : tripDescriptions[getRandomInteger(0, 10)],
    });
  }
  return data;
};

// const getPictures = () => ({
//   pictures: ({
//     [pictures.src] : `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`,
//     [pictures.description] : tripDescriptions[getRandomInteger(0, 10)],
//   }),
// });

console.log(getPictures());
// const getOffer = () => {
//   const offer = { type: generateType(typePointTrip), ...getSomeOffers()};
// console.log(offer);
// };
// const offer = { type: generateType(typePointTrip), ...getSomeOffers()};
// console.log(offer);

// const generateType = () => {

//   const typePointTrip = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

//   const randomIndex = getRandomInteger(0, typePointTrip.length - 1);

//   return typePointTrip[randomIndex];
// };

// const generateOffer = () => {

//   const titleOffer = ['Choose meal', 'Upgrade to comfort class', 'Book tickets', 'Lunch in city', 'Rent a car', 'Add luggage', 'Switch to comfort', 'Add breakfast' ];
//   // const priceOffer = getRandomInteger(1, 500);

//   // const randomIndex = getRandomInteger(0, titleOffer.length - 1);
//   for (let i = 0; i < getRandomInteger(0, titleOffer.length - 1); i++ ) {
//     return {
//       title: titleOffer[i],
//       price: getRandomInteger(1, 500),
//     };
//   }

// };

// Дополнительные опции по типу маршрута

// const offer = [
//   {
//     type: generateType(typePointTrip),
//     offers: [
//       {
//         title: generateType(OFFER.offers.title),
//         price: getRandomInteger(1, 500),
//       },
//     ],
//   },
// ];

// console.log(offer);

// const checkValueInObject = (obj, value) => {
//   const key = 'type';
//   if (key in obj){
//     if (value === obj.type) {
//       return obj;
//     }
//   }
// };

// const getObj = () => {
//   const valueArray = generateType(typePointTrip);
//   const res = offer.filter((value) => checkValueInObject(value, valueArray));
//   return res[0];
// };

// Описание маршрута

// const destination = {
//   description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
//   nameTrip: 'Chamonix',
//   pictures: [
//     {
//       src: 'http://picsum.photos/300/200?r=0.0762563005163317',
//       description: 'Chamonix parliament building',
//     },
//   ],
//   id: 1,
// };

const generate = () => ({
  basePrice: 200,
  dateFrom: null,
  dateTo: null,
  destination: {description: getDescription(tripDescriptions), name: generateType(cities), pictures:[ ...getPictures()]},
  id: '0',
  isFavorite: false,
  offers: getSomeOffers(),
  type: generateType(typePointsTrip),
  idOffer: null,
  idDestination: [1],
});

export { generate };
