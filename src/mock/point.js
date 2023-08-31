import dayjs from 'dayjs';

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

// Часть структуры данных информация о месте назначения:

const pictures = {
  src: 'src',
  description: 'description',
};

const getDescription = (array) => {
  // debugger;
  const data = [];
  for (let i = 0; i < getRandomInteger(1, 5); i++) {
    data.push(array[i]);
  }
  return data;
};

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

const getData = () => {

  // const maxDaysGap = 7;
  // const daysGap = getRandomInteger(0, 3);
  const date = dayjs().format('MMM-DD-HH-mm-ss');
  return date;
};

const getDateEnd = () => {
  const daysGap = getRandomInteger(0, 3);
  const hoursGap = getRandomInteger(0, 24);
  const dateEnd = dayjs().add(daysGap, 'day').add(hoursGap, 'hour').format('MMM-DD-HH-mm-ss');
  return dateEnd;
};


// const CompareData = (date) => {
//   const month = date;
//   console.log(month);
// }

// const dateFrom = getData();

const generate = () => {
  const dateBegin = getData();
  return ({
    basePrice: getRandomInteger(100, 500),
    dateBegin,
    dateEnd: getDateEnd(),
    destination: {description: getDescription(tripDescriptions), name: generateType(cities), pictures:[ ...getPictures()]},
    id: '0',
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getSomeOffers(),
    type: generateType(typePointsTrip),
    idOffer: null,
    idDestination: [1],
  });
};


export { generate };
