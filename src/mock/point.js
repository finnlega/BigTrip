const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const typePointTrip = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, typePointTrip.length - 1);

  return typePointTrip[randomIndex];
};


const destination = [ 'Amsterdam', 'Chamonix', 'Geneva' ];
// Дополнительные опции по типу маршрута

const offer = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Choose meal',
        price: 180,
      },
      {
        title: 'Upgrade to comfort class',
        price: 50,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Choose meal',
        price: 200,
      },
      {
        title: 'Upgrade to comfort class',
        price: 60,
      },
    ],
  },
];

console.log(offer);

const getkey = () => {
  const key = generateType();
  if(key in offer) {
    return offer.entries;
  }
  return NaN;
};

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

const generate = () => {
  return {
    price: 200,
    dateFrom: null,
    dateTo: null,
    destination: destination,
    isFavorite: false,
    offer: offer[getkey()],   // type: offer.typePointTrip,
    // idOffer: offer.id,
    // idDestination: [1],
  };
};

export const result = generate();
