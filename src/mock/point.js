import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const typePointsTrip = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const cities = [ 'Amsterdam', 'Chamonix', 'Geneva' ];
const titles = ['Choose meal', 'Upgrade to comfort class', 'Book tickets', 'Lunch in city', 'Rent a car', 'Add luggage', 'Switch to comfort', 'Add breakfast', 'Upgrade to a business class', 'Choose the radio station' ];
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

function getElementOfArray(array) {
  debugger;
  for (const element of array) {
    return element;
  }
}


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
const createobj = () => {
  const offer = {
    type: getElementOfArray(typePointsTrip),
    offers: [...getSomeOffers()],
  };
  return offer;
};


const createAllOffers = () => {
  const items = new Array(10).fill().map(() => createobj());
  return items;
};


const options = createAllOffers();
console.log(options);


// const offer = {
//   type: generateType(typePointsTrip),
//   offers: [...getSomeOffers()],
// };

// console.log(offer);

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

const getDateBegin = () => {

  const daysGap = getRandomInteger(0, 3);
  const hoursGap = getRandomInteger(0, 24);
  const minuteGap = getRandomInteger(0, 60);
  const secondGap = getRandomInteger(0, 60);
  const date = dayjs().add(daysGap, 'day').add(hoursGap, 'hour').add(minuteGap, 'minute').add(secondGap, 'second');
  return date;
};

const getDateEnd = (date) => {
  const daysGap = getRandomInteger(0, 3);
  const hoursGap = getRandomInteger(0, 24);
  const minuteGap = getRandomInteger(0, 60);
  const secondGap = getRandomInteger(0, 60);
  const dateEnd = date.add(daysGap, 'day').add(hoursGap, 'hour').add(minuteGap, 'minute').add(secondGap, 'second');
  return dateEnd;
};

const generate = () => {
  const dateBegin = getDateBegin();
  const dateEnd = getDateEnd(dateBegin);
  const type = generateType(typePointsTrip);

  const CompareType = (array, key) => {
    const matching = array.find((item) => item.type === key);
    // if (!matching) {
    //   console.log('matching not found');
    // }
    return matching;
  };

  // const matchingOffer =
  return ({
    basePrice: getRandomInteger(100, 500),
    dateBegin: dateBegin.toDate(),
    dateEnd: dateEnd.toDate(),
    destination: {description: getDescription(tripDescriptions), name: generateType(cities), pictures:[ ...getPictures()]},
    id: 1,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: CompareType(options, type),
    // type,
    // idOffer: [1, 2, 3],
    // idDestination: [1],
  });
};


export { generate };
